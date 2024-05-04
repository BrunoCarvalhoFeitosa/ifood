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
    <div className="custom-scrollbar flex flex-row-reverse items-center justify-end gap-3 overflow-x-auto py-4 pb-3">
      {restaurant.categories.map((category) => (
        <div
          key={category.id}
          className="min-w-fit bg-gray-100 p-2 px-5 text-sm text-muted-foreground"
        >
          {category.name}
        </div>
      ))}
    </div>
  )
}
