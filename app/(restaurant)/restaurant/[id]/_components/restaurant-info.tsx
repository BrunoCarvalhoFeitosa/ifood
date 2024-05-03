"use client"
import { Prisma } from "@prisma/client"
import { RestaurantDelivery } from "./restaurant-delivery"
import { RestaurantResume } from "./restaurant-resume"
import { RestaurantCategories } from "./restaurant-categories"

interface RestaurantInfoProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: true
    }
  }>
}

export const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  return (
    <div className="relative z-20 -mt-10 flex flex-1 flex-col rounded-tl-[40px] rounded-tr-[40px] bg-white px-5 py-6 transition-all duration-500 md:-mt-14 md:rounded-tl-[60px] md:rounded-tr-[60px] xl:mt-0 xl:rounded-none xl:py-0">
      <RestaurantResume restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
      <RestaurantDelivery restaurant={restaurant} />
    </div>
  )
}
