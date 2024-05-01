"use client"
import { Restaurant } from "@prisma/client"
import { RestaurantListItemImage } from "./restaurant-list-item-image"
import { RestaurantListItemContent } from "./restaurant-list-item-content"

interface RestaurantListItemProps {
  restaurant: Restaurant
}

export const RestaurantListItem = ({ restaurant }: RestaurantListItemProps) => {
  return (
    <div className="box-border">
      <RestaurantListItemImage restaurant={restaurant} />
      <RestaurantListItemContent restaurant={restaurant} />
    </div>
  )
}
