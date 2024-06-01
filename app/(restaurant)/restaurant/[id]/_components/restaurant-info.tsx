"use client"
import { Prisma } from "@prisma/client"
import { cn } from "@/app/_libs/utils"
import { useSlideButton } from "@/app/_contexts/SlideButtonContext"
import { RestaurantSlideButton } from "./restaurant-slide-button"
import { RestaurantResume } from "./restaurant-resume"
import { RestaurantCategories } from "./restaurant-categories"
import { RestaurantDelivery } from "./restaurant-delivery"

interface RestaurantInfoProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: true
    }
  }>
}

export const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  const { isOpen } = useSlideButton()

  return (
    <div
      className={cn(
        "relative z-20 -mt-10 flex w-full flex-col rounded-tl-[40px] rounded-tr-[40px] bg-white px-5 py-6 transition-all duration-500 md:-mt-14 md:rounded-tl-[60px] md:rounded-tr-[60px] xl:mt-0 xl:w-2/4 xl:rounded-none xl:py-0",
        `${isOpen ? "-mt-48 md:-mt-72 lg:-mt-96" : "-mt-10 xl:mt-0"}`
      )}
    >
      <RestaurantSlideButton />
      <RestaurantResume restaurant={restaurant} />
      <RestaurantCategories />
      <RestaurantDelivery restaurant={restaurant} />
    </div>
  )
}
