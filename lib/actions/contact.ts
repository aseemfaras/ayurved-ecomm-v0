"use server"

import { supabase } from "@/lib/supabase/client"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    const { error } = await supabase.from("contact_messages").insert({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      status: "new",
    })

    if (error) {
      console.error("Error submitting contact form:", error)
      throw new Error("Failed to submit contact form")
    }

    return { success: true }
  } catch (error) {
    console.error("Contact form submission error:", error)
    throw new Error("Failed to submit contact form")
  }
}
