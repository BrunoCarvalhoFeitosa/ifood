"use server"
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client"
import { Button } from "@/app/_components/ui/button"
import { RestaurantListItem } from "./restaurant-list-item"
import { ChevronRightIcon } from "lucide-react"
import { SafeUser } from "@/app/_types/SafeUser"

interface RestaurantListProps {
  title: string
  restaurants: Restaurant[]
  currentUser: SafeUser | null
  userFavoriteRestaurants: UserFavoriteRestaurant[]
}

export const RestaurantList = ({
  title,
  restaurants,
  currentUser,
  userFavoriteRestaurants
}: RestaurantListProps) => {
  return (
    <section className="w-full px-5 py-8 lg:py-12">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h2 className="text-base font-semibold md:text-xl">{title}</h2>
        </div>
        <div>
          <Button
            type="button"
            variant="ghost"
            size="default"
            className="rounded-full p-0 text-sm font-semibold text-primary hover:text-primary md:text-base"
          >
            <span>Ver todos</span>
            <span>
              <ChevronRightIcon />
            </span>
          </Button>
        </div>
      </div>
      <div className="custom-scrollbar flex items-center gap-5 overflow-x-auto py-3">
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
