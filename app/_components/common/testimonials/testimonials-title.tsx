"use client"
import { useState } from "react"
import { SafeUser } from "@/app/_types/SafeUser"
import { useRouter } from "next/navigation"
import { Button } from "@/app/_components/ui/button"
import { TestimonialsDialogModal } from "./testimonials-dialog-modal"

interface TestimonialsTitleProps {
  currentUser: SafeUser | null
}

export const TestimonialsTitle = ({ currentUser }: TestimonialsTitleProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false)
  const router = useRouter()

  const handleTestimonialsActionClick = () => {
    if (currentUser) {
      setIsConfirmDialogOpen(true)
    } else {
      router.push("/sign-in")
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-3 lg:items-start">
        <div className="mb-2 text-center lg:text-left">
          <h3 className="text-base font-extrabold md:text-xl">
            O que os nossos clientes dizem sobre nós
          </h3>
          <p className="text-sm">
            Veja os comentários a respeito dos serviços que oferecemos.
          </p>
        </div>
        {currentUser && (
          <div>
            <Button
              type="button"
              variant="default"
              className="h-14 px-6 text-base"
              onClick={handleTestimonialsActionClick}
            >
              Avalie os nossos serviços agora mesmo
            </Button>
          </div>
        )}
      </div>
      <div>
        <TestimonialsDialogModal
          setIsConfirmDialogOpen={setIsConfirmDialogOpen}
          isConfirmDialogOpen={isConfirmDialogOpen}
          currentUser={currentUser}
        />
      </div>
    </div>
  )
}
