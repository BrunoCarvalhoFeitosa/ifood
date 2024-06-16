"use client"
import { SafeUser } from "@/app/_types/SafeUser"
import { Testimonials } from "@prisma/client"
import { TestimonialsList } from "./testimonials-list"
import { TestimonialsResume } from "./testimonials-resume"
import { TestimonialsAction } from "./testimonials-action"

interface TestimonialsProps {
  currentUser: SafeUser | null
  testimonials: Testimonials[]
}

export const TestimonialsComments = ({
  currentUser,
  testimonials
}: TestimonialsProps) => {
  return (
    <section className="w-full px-5 pb-8 xl:w-2/4">
      <TestimonialsResume />
      <TestimonialsList currentUser={currentUser} testimonials={testimonials} />
      <TestimonialsAction currentUser={currentUser} />
    </section>
  )
}
