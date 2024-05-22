"use client"
import { Prisma, UserFavoriteRestaurant } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
import { RestaurantImage } from "./restaurant-image"
import { RestaurantInfo } from "./restaurant-info"

interface RestaurantContentProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: true
    }
  }>
  currentUser: SafeUser | null
  userFavoriteRestaurants: UserFavoriteRestaurant[]
}

export const RestaurantContent = ({
  restaurant,
  currentUser,
  userFavoriteRestaurants
}: RestaurantContentProps) => {
  return (
    <div className="flex w-full flex-col gap-4 px-0 xl:flex-row xl:px-5 xl:py-6">
      <RestaurantImage
        restaurant={restaurant}
        currentUser={currentUser}
        userFavoriteRestaurants={userFavoriteRestaurants}
      />
      <RestaurantInfo restaurant={restaurant} />
    </div>
  )
}
