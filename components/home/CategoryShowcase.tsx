import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const categories = [
  {
    name: "Herbs & Supplements",
    description: "Traditional herbs and supplements for daily wellness",
    image: "/placeholder.svg?height=400&width=600",
    slug: "herbs",
  },
  {
    name: "Essential Oils",
    description: "Pure essential oils for aromatherapy and healing",
    image: "/placeholder.svg?height=400&width=600",
    slug: "oils",
  },
  {
    name: "Skincare",
    description: "Natural skincare products for radiant skin",
    image: "/placeholder.svg?height=400&width=600",
    slug: "skincare",
  },
]

export default function CategoryShowcase() {
  return (
    <section className="container px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-8">Shop by Category</h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {categories.map((category) => (
          <div key={category.name} className="group relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10" />
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              width={600}
              height={400}
              className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
              <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
              <p className="text-white/90 mb-4">{category.description}</p>
              <Link href={`/products?category=${category.slug}`}>
                <Button variant="secondary">Explore</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
