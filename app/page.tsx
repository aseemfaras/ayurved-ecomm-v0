import Hero from "@/components/home/Hero"
import FeaturedProducts from "@/components/home/FeaturedProducts"
import CategoryShowcase from "@/components/home/CategoryShowcase"
import Testimonials from "@/components/home/Testimonials"
import Newsletter from "@/components/home/Newsletter"
import { getFeaturedProducts } from "@/lib/supabase/products"

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="space-y-16 pb-16">
      <Hero />
      <FeaturedProducts products={featuredProducts} />
      <CategoryShowcase />
      <Testimonials />
      <Newsletter />
    </div>
  )
}
