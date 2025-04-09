"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { createOrder } from "@/lib/actions/order"
import { loadRazorpay } from "@/lib/razorpay"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("razorpay")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 100 : 0
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add products to your cart before checkout",
        variant: "destructive",
      })
      router.push("/products")
      return
    }

    try {
      setIsLoading(true)

      // Validate form data
      const requiredFields = [
        "firstName", "lastName", "email", "phone", 
        "address", "city", "state", "postalCode"
      ];
      
      const missingFields = requiredFields.filter(field => !formData[field]);
      if (missingFields.length > 0) {
        toast({
          title: "Missing information",
          description: `Please fill in all required fields: ${missingFields.join(", ")}`,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Create order in database
      const orderData = {
        customer: formData,
        items: cart,
        subtotal,
        shipping,
        total,
        payment_method: paymentMethod,
        status: "pending",
      }

      // Try to create the order
      let orderResult;
      try {
        orderResult = await createOrder(orderData);
      } catch (orderError) {
        console.error("Order creation error:", orderError);
        toast({
          title: "Order creation failed",
          description: "There was an issue creating your order. Please try again later.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const { orderId } = orderResult;
      
      if (!orderId) {
        throw new Error("Failed to get order ID");
      }

      if (paymentMethod === "razorpay") {
        try {
          // Load Razorpay
          const razorpay = await loadRazorpay()
          
          console.log("Razorpay loading result:", razorpay);

          if (!razorpay) {
            toast({
              title: "Payment failed",
              description: "Failed to load payment gateway. Please try again.",
              variant: "destructive",
            })
            setIsLoading(false)
            return
          }

          // Create Razorpay options
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_mock_key_for_testing", 
            amount: total * 100, // Amount in paise
            currency: "INR",
            name: "Ayurveda Store",
            description: `Order #${orderId}`,
            order_id: orderId,
            handler: function(response: any) {
              console.log("Payment successful:", response);
              // Handle successful payment
              toast({
                title: "Payment successful",
                description: "Your order has been placed successfully!",
              });
              clearCart();
              router.push(`/order-confirmation/${orderId}`);
            },
            prefill: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              contact: formData.phone,
            },
            theme: {
              color: "#10b981",
            },
            modal: {
              ondismiss: function() {
                console.log("Payment dismissed");
                setIsLoading(false);
              }
            }
          };

          console.log("Creating Razorpay payment with options:", options);
          
          // Create Razorpay instance and open payment
          const paymentObject = new (window as any).Razorpay(options);
          paymentObject.open();
          
        } catch (paymentError) {
          console.error("Razorpay payment error:", paymentError);
          toast({
            title: "Payment failed",
            description: "There was an error processing your payment. Redirecting to confirmation page.",
            variant: "destructive",
          });
          
          // For testing purposes, still allow the order to go through
          clearCart();
          router.push(`/order-confirmation/${orderId}`);
        }
      } else if (paymentMethod === "cod") {
        // Handle Cash on Delivery
        toast({
          title: "Order placed",
          description: "Your order has been placed successfully with Cash on Delivery!",
        })
        clearCart()
        router.push(`/order-confirmation/${orderId}`)
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Checkout</h1>
        <div className="max-w-md mx-auto p-8 border rounded-lg shadow-sm">
          <p className="mb-6">Your cart is empty</p>
          <Button onClick={() => router.push("/products")}>Continue Shopping</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="space-y-8">
              <div className="border rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" required value={formData.phone} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" name="address" required value={formData.address} onChange={handleChange} />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" required value={formData.city} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" name="state" required value={formData.state} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="razorpay" id="razorpay" />
                    <Label htmlFor="razorpay">Razorpay (Credit/Debit Card, UPI, Netbanking)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">Cash on Delivery</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>

                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-muted-foreground"> × {item.quantity}</span>
                        </div>
                        <span>{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}

                    <Separator />

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{formatCurrency(shipping)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay ${formatCurrency(total)}`
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
