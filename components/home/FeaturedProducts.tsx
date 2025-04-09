import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import type { Product } from "@/lib/types"

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="container px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured Products</h2>
        <Link href="/products">
          <Button variant="outline">View All</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <Link href={`/products/${product.slug}`} className="block overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <Image
                  src={product.image_url || "/placeholder.svg?height=300&width=300"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </Link>
            <CardContent className="p-4">
              <Link href={`/products/${product.slug}`} className="block">
                <h3 className="font-medium line-clamp-1">{product.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              </Link>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center justify-between">
              <span className="font-medium">{formatCurrency(product.price)}</span>
              <Button size="sm">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
