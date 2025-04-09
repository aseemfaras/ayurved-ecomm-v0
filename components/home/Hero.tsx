import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block">Ancient Wisdom for</span>
              <span className="block text-primary">Modern Wellness</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Discover authentic Ayurvedic products crafted with traditional methods and premium ingredients to restore
              balance and promote natural healing.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg">Shop Now</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 mix-blend-multiply" />
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/placeholder.svg?height=600&width=800')" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
