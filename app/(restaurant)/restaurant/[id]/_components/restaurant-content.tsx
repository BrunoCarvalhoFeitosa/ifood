"use client"
import { Prisma } from "@prisma/client"
import { RestaurantImage } from "./restaurant-image"
import { RestaurantInfo } from "./restaurant-info"

interface RestaurantContentProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: true
    }
  }>
}

export const RestaurantContent = ({ restaurant }: RestaurantContentProps) => {
  return (
    <div className="flex w-full flex-col gap-4 px-0 xl:flex-row xl:px-5 xl:py-6">
      <RestaurantImage restaurant={restaurant} />
      <RestaurantInfo restaurant={restaurant} />
    </div>
  )
}
