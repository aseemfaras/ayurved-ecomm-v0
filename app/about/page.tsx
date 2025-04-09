import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "About Us | Ayurveda",
  description: "Learn about our mission to provide authentic Ayurvedic products for natural healing and wellness",
}

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">About Us</h1>

        <div className="relative h-80 w-full mb-8 overflow-hidden rounded-lg">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Ayurvedic herbs and ingredients"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Our Story</h2>
          <p>
            Founded in 2010, Ayurveda is dedicated to bringing the ancient wisdom of Ayurvedic medicine to the modern
            world. Our journey began with a simple mission: to provide authentic, high-quality Ayurvedic products that
            promote natural healing and wellness.
          </p>

          <p>
            With roots deeply embedded in traditional Ayurvedic practices that date back thousands of years, we combine
            ancient knowledge with modern scientific research to create products that are both effective and safe.
          </p>

          <h2>Our Philosophy</h2>
          <p>
            We believe in the holistic approach of Ayurveda, which considers the mind, body, and spirit as
            interconnected elements of human health. Our products are designed to restore balance and harmony to these
            elements, promoting overall wellbeing rather than simply treating symptoms.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Authenticity</h3>
                <p className="text-muted-foreground">
                  We source our ingredients directly from trusted farmers and suppliers who follow traditional
                  cultivation methods.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  Every product undergoes rigorous testing to ensure it meets our high standards for purity and
                  efficacy.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Sustainability</h3>
                <p className="text-muted-foreground">
                  We are committed to environmentally responsible practices in all aspects of our business.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2>Our Commitment</h2>
          <p>
            We are committed to preserving and promoting the rich heritage of Ayurveda while making it accessible to
            people around the world. Our team of Ayurvedic practitioners, herbalists, and scientists work together to
            create formulations that honor traditional principles while meeting modern standards of quality and safety.
          </p>

          <p>
            Thank you for joining us on this journey toward natural health and wellness. We invite you to explore our
            range of products and discover the transformative power of Ayurveda.
          </p>
        </div>
      </div>
    </div>
  )
}
