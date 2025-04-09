"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function Newsletter() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Thank you for subscribing!",
      description: "You've been added to our newsletter list.",
    })

    setEmail("")
    setIsSubmitting(false)
  }

  return (
    <section className="container px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-muted/50 px-6 py-12 md:py-16 md:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Stay Updated with Ayurvedic Wisdom</h2>
          <p className="mt-4 text-muted-foreground">
            Subscribe to our newsletter for exclusive offers, Ayurvedic tips, and new product announcements.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 sm:flex sm:max-w-md sm:mx-auto">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto" disabled={isSubmitting}>
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          <p className="mt-3 text-sm text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}
