"use client"
import { useState } from "react"
import { SafeUser } from "@/app/_types/SafeUser"
import { Testimonials } from "@prisma/client"
import { TestimonialsListItem } from "./testimonials-list-item"
import { Button } from "@/app/_components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink
} from "@/app/_components/ui/pagination"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/app/_libs/utils"

interface TestimonialsListProps {
  currentUser: SafeUser | null
  testimonials: Testimonials[]
}

export const TestimonialsList = ({
  currentUser,
  testimonials
}: TestimonialsListProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const testimonialsPerPage = 4
  const indexOfLastTestimonial = currentPage * testimonialsPerPage
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage
  const currentTestimonials = testimonials.slice(
    indexOfFirstTestimonial,
    indexOfLastTestimonial
  )
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const renderPaginationItems = () => {
    const items = []

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      items.push(
        <PaginationItem key={pageNumber}>
          <PaginationLink
            isActive={currentPage === pageNumber}
            onClick={() => paginate(pageNumber)}
            className={cn(
              "cursor-pointer border-gray-200 bg-primary text-base text-white opacity-20 hover:bg-primary hover:text-white hover:opacity-90",
              currentPage === pageNumber && "opacity-100"
            )}
          >
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }

  return (
    <section className={`relative ${currentUser ? "mt-16" : "mt-6"} w-full`}>
      <div className="flex flex-col">
        {currentTestimonials.map((testimonial) => (
          <TestimonialsListItem
            key={testimonial.id}
            testimonial={testimonial}
          />
        ))}
      </div>
      <div className="mt-5">
        <Pagination className="justify-start">
          <PaginationContent>
            <PaginationItem>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => paginate(currentPage - 1)}
                className="p-0"
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon />
              </Button>
            </PaginationItem>
            {renderPaginationItems()}
            <PaginationItem>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => paginate(currentPage + 1)}
                className="p-0"
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  )
}
