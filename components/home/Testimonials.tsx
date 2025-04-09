import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    content:
      "I've been using Ayurveda's products for over a year now, and the difference in my overall wellbeing is remarkable. Their Ashwagandha supplement has helped me manage stress like nothing else.",
    author: "Priya Sharma",
    role: "Yoga Instructor",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    content:
      "The quality of these Ayurvedic products is exceptional. I particularly love their essential oils - pure, potent, and exactly as described. The customer service is also outstanding.",
    author: "Rajesh Kumar",
    role: "Wellness Coach",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    content:
      "After trying numerous products for my skin condition, I finally found relief with Ayurveda's herbal formulations. Their commitment to authenticity and quality is evident in every product.",
    author: "Anita Desai",
    role: "Healthcare Professional",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-muted/30 py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">What Our Customers Say</h2>
          <p className="mt-4 text-muted-foreground">
            Discover how our authentic Ayurvedic products have transformed lives
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="flex-1 text-muted-foreground mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
