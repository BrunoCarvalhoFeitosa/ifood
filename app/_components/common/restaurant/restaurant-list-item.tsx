"use client"
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
import Link from "next/link"
import { RestaurantListItemImage } from "./restaurant-list-item-image"
import { RestaurantListItemContent } from "./restaurant-list-item-content"

interface RestaurantListItemProps {
  restaurant: Restaurant
  currentUser: SafeUser | null
  userFavoriteRestaurants: UserFavoriteRestaurant[]
}

export const RestaurantListItem = ({
  restaurant,
  currentUser,
  userFavoriteRestaurants
}: RestaurantListItemProps) => {
  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <RestaurantListItemImage restaurant={restaurant} />
      <RestaurantListItemContent
        restaurant={restaurant}
        currentUser={currentUser}
        userFavoriteRestaurants={userFavoriteRestaurants}
      />
    </Link>
  )
}
