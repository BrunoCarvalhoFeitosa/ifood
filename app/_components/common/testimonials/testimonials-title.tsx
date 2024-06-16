"use client"
import { useState } from "react"
import { SafeUser } from "@/app/_types/SafeUser"
import { useRouter } from "next/navigation"
import { Button } from "@/app/_components/ui/button"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { Skeleton } from "@/app/_components/ui/skeleton"
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
    <div className="pt-14">
      <div className="flex flex-col items-center gap-3 lg:items-start">
        <div className="text-center lg:text-left">
          <h3 className="text-base font-extrabold md:text-xl">
            {currentUser ? (
              <div>
                {currentUser?.name?.split(" ")[0]}, conte sua experiência
                utilizando os nossos serviços
              </div>
            ) : (
              <div>Avalie os nossos serviços</div>
            )}
          </h3>
        </div>
        <div>
          <div>
            {currentUser ? (
              <div className="mb-6 flex items-center space-x-4">
                <div>
                  <Avatar>
                    <AvatarImage
                      src={currentUser?.image as string}
                      alt={currentUser?.name as string}
                      title={currentUser?.name as string}
                      className="bg-gray-100 object-cover grayscale"
                    />
                  </Avatar>
                </div>
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-full rounded-none md:w-[300px]" />
                  <Skeleton className="h-3 w-2/3 rounded-none md:w-[250px]" />
                  <Skeleton className="h-3 w-2/4 rounded-none md:w-[200px]" />
                </div>
              </div>
            ) : (
              <div className="mb-6 flex items-center space-x-4">
                <div>
                  <Skeleton className="h-[60px] w-[60px] rounded-full" />
                </div>
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-full rounded-none md:w-[300px]" />
                  <Skeleton className="h-3 w-2/3 rounded-none md:w-[250px]" />
                  <Skeleton className="h-3 w-2/4 rounded-none md:w-[200px]" />
                </div>
              </div>
            )}
          </div>
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
        </div>
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
