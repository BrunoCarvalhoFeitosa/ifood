"use client"
import { Prisma, UserFavoriteRestaurant } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
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
  currentUser: SafeUser | null
  userFavoriteRestaurants: UserFavoriteRestaurant[]
}

export const CategoryRestaurantList = ({
  restaurants,
  currentUser,
  userFavoriteRestaurants
}: CategoryRestaurantListProps) => {
  return (
    <section className="px-5 py-6">
      <div className="mb-3">
        <h3 className="text-lg font-extrabold md:text-xl">Restaurantes</h3>
      </div>
      <div className="custom-scrollbar flex items-center gap-4 overflow-x-auto">
        {restaurants.map((restaurant) => (
          <RestaurantListItem
            key={restaurant.id}
            restaurant={restaurant}
            currentUser={currentUser}
            userFavoriteRestaurants={userFavoriteRestaurants}
          />
        ))}
      </div>
    </section>
  )
}
