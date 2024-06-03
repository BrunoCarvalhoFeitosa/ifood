"use client"
import { SafeUser } from "@/app/_types/SafeUser"
import { TestimonialsTitle } from "./testimonials-title"
import { Testimonials } from "@prisma/client"
import { TestimonialsList } from "./testimonials-list"

interface TestimonialsProps {
  currentUser: SafeUser | null
  testimonials: Testimonials[]
}

export const TestimonialsComments = ({
  currentUser,
  testimonials
}: TestimonialsProps) => {
  return (
    <section className="px-5 pb-8">
      <TestimonialsTitle currentUser={currentUser} />
      <TestimonialsList currentUser={currentUser} testimonials={testimonials} />
    </section>
  )
}
