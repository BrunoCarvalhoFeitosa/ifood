"use client"
import { Prisma } from "@prisma/client"
import { RestaurantListItem } from "@/app/_components/common/restaurant/restaurant-list-item"

interface CategoryRestaurantListProps {
  restaurants: Prisma.RestaurantGetPayload<{
    select: {
      id: true
      name: true
      imageUrl: true
      deliveryFee: true
      deliveryTimeMinutes: true
    }
  }>[]
}

export const CategoryRestaurantList = ({
  restaurants
}: CategoryRestaurantListProps) => {
  return (
    <section className="px-5 py-6">
      <div className="mb-5">
        <h3 className="text-2xl font-extrabold">Restaurantes</h3>
      </div>
      <div className="custom-scrollbar flex items-center gap-4 overflow-x-auto">
        {restaurants.map((restaurant) => (
          <RestaurantListItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </section>
  )
}
