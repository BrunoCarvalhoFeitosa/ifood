"use client"
import { Prisma } from "@prisma/client"

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: true
    }
  }>
}

export const RestaurantCategories = ({
  restaurant
}: RestaurantCategoriesProps) => {
  return (
    <div className="flex items-center gap-3 pt-3">
      {restaurant.categories.map((category) => (
        <div
          key={category.id}
          className="rounded-full bg-gray-100 p-2 text-sm text-muted-foreground"
        >
          {category.name}
        </div>
      ))}
    </div>
  )
}
