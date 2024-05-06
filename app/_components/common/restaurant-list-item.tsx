"use client"
import { Restaurant } from "@prisma/client"
import Link from "next/link"
import { RestaurantListItemImage } from "./restaurant-list-item-image"
import { RestaurantListItemContent } from "./restaurant-list-item-content"

interface RestaurantListItemProps {
  restaurant: Restaurant
}

export const RestaurantListItem = ({ restaurant }: RestaurantListItemProps) => {
  return (
    <Link href={`/restaurant/${restaurant.id}`} className="w-full xl:w-fit">
      <RestaurantListItemImage restaurant={restaurant} />
      <RestaurantListItemContent restaurant={restaurant} />
    </Link>
  )
}
