"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import type { Product } from "@/lib/types"
import { useCart } from "@/context/CartContext"
import { useToast } from "@/components/ui/use-toast"
import { Heart, Minus, Plus, Share2, Star, Truck } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(product.image_url || "/placeholder.svg?height=600&width=600")

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity}) has been added to your cart.`,
    })
  }

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value))
  }

  // Mock additional images
  const additionalImages = [
    product.image_url || "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ]

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-lg border">
          <Image
            src={selectedImage || "/placeholder.svg"}
            alt={product.name}
            width={600}
            height={600}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {additionalImages.map((image, index) => (
            <button key={index} className="overflow-hidden rounded-md border" onClick={() => setSelectedImage(image)}>
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.name} - Image ${index + 1}`}
                width={150}
                height={150}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <div className="mt-4 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < 4 ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-muted-foreground">(24 reviews)</span>
        </div>

        <div className="mt-4">
          <span className="text-3xl font-bold">{formatCurrency(product.price)}</span>
          {product.compare_at_price && (
            <span className="ml-2 text-lg text-muted-foreground line-through">
              {formatCurrency(product.compare_at_price)}
            </span>
          )}
        </div>

        <div className="mt-6 space-y-6">
          <p className="text-muted-foreground">{product.description}</p>

          <div className="flex items-center text-sm text-muted-foreground">
            <Truck className="h-4 w-4 mr-2" />
            Free shipping on orders over ₹500
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Quantity</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <div className="h-8 w-12 flex items-center justify-center border-y">{quantity}</div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1" size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </Button>
            <Button variant="outline" size="icon" className="h-11 w-11">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 mt-8">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>
                This premium Ayurvedic product is crafted using traditional methods passed down through generations.
                Each ingredient is carefully selected for its purity and potency, ensuring maximum effectiveness.
              </p>
              <h3>Benefits</h3>
              <ul>
                <li>Promotes natural healing and wellness</li>
                <li>Helps restore balance to mind and body</li>
                <li>Made with 100% natural ingredients</li>
                <li>Free from harmful chemicals and additives</li>
              </ul>
              <h3>How to Use</h3>
              <p>
                For best results, use as directed by your Ayurvedic practitioner. Generally, this product can be taken
                daily as part of your wellness routine.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="ingredients" className="mt-6">
            <div className="prose max-w-none">
              <p>
                Our products contain only the finest natural ingredients, sourced from trusted suppliers who follow
                sustainable and ethical practices.
              </p>
              <ul>
                <li>
                  <strong>Ashwagandha:</strong> Known for its adaptogenic properties that help the body manage stress
                </li>
                <li>
                  <strong>Turmeric:</strong> A powerful anti-inflammatory and antioxidant
                </li>
                <li>
                  <strong>Amla:</strong> Rich in Vitamin C and supports immune function
                </li>
                <li>
                  <strong>Brahmi:</strong> Supports cognitive function and mental clarity
                </li>
                <li>
                  <strong>Neem:</strong> Known for its purifying and detoxifying properties
                </li>
              </ul>
              <p>All ingredients are tested for purity and potency before being used in our formulations.</p>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>

              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border-b pb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className={`h-4 w-4 ${j < 4 ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                        <h4 className="font-medium mt-1">Great product!</h4>
                      </div>
                      <span className="text-sm text-muted-foreground">2 months ago</span>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      I've been using this product for a month now and have noticed significant improvements in my
                      overall wellbeing. Would definitely recommend!
                    </p>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">John D.</span> - Verified Buyer
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
