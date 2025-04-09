"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"
import { getOrderById } from "@/lib/actions/order"
import { CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const unwrappedParams = use(params)
  const orderId = unwrappedParams.id

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getOrderById(orderId)
        if (!orderData) {
          setError("Order not found")
          return
        }
        setOrder(orderData)
      } catch (err) {
        setError("Failed to load order details")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  if (loading) {
    return (
      <div className="container px-4 py-16 sm:px-6 lg:px-8 flex justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-4">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Order Not Found</h1>
        <div className="max-w-md mx-auto p-8 border rounded-lg shadow-sm">
          <p className="mb-6">{error}</p>
          <Button onClick={() => router.push("/products")}>Continue Shopping</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Order Confirmed!</h1>
          <p className="text-muted-foreground mt-2">Thank you for your purchase. Your order has been received.</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order #{orderId}</CardTitle>
            <CardDescription>Placed on {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Shipping Address</h3>
                <p className="text-muted-foreground">
                  {order?.customer_info?.firstName || order?.customer?.firstName || 'Customer'} {order?.customer_info?.lastName || order?.customer?.lastName || ''}
                  <br />
                  {order?.customer_info?.address || order?.customer?.address || 'Address'}
                  <br />
                  {order?.customer_info?.city || order?.customer?.city || 'City'}, {order?.customer_info?.state || order?.customer?.state || 'State'} {order?.customer_info?.postalCode || order?.customer?.postalCode || 'Postal Code'}
                  <br />
                  {order?.customer_info?.country || order?.customer?.country || 'Country'}
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Payment Method</h3>
                <p className="text-muted-foreground capitalize">
                  {order?.payment_method === "razorpay" ? "Online Payment (Razorpay)" : "Cash on Delivery"}
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Order Summary</h3>
                <div className="space-y-4">
                  {(order?.items || []).length > 0 ? (
                    order.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-muted-foreground"> × {item.quantity}</span>
                        </div>
                        <span>{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">Your order is being processed</span>
                      </div>
                      <span></span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(order?.subtotal || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{formatCurrency(order?.shipping || 0)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(order?.total || 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full flex flex-col sm:flex-row justify-between gap-4">
              <Link href="/products">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
              <Button variant="outline">Track Order</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
