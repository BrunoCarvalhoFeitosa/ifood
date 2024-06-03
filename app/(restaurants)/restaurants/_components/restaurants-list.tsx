"use client"
import { useEffect, useState } from "react"
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
import { searchRestaurants } from "@/app/_actions/search"
import { RestaurantListItem } from "@/app/_components/common/restaurant/restaurant-list-item"
import { Search } from "@/app/_components/common/search"
import { Loader2Icon } from "lucide-react"

interface RestaurantsListProps {
  term: string
  currentUser: SafeUser | null
  userFavoriteRestaurants: UserFavoriteRestaurant[]
}

const RestaurantsList = ({
  term,
  currentUser,
  userFavoriteRestaurants
}: RestaurantsListProps) => {
  const [restaurantsList, setRestaurantsList] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getRestaurants = async () => {
      if (!term) return

      const foundedRestaurants = await searchRestaurants(term)
      setRestaurantsList(foundedRestaurants)
      setLoading(false)
    }

    getRestaurants()
  }, [term])

  if (!term) {
    return null
  }

  if (loading) {
    return (
      <div className="flex h-[calc(100dvh-200px)] w-full animate-spin items-center justify-center">
        <Loader2Icon size={30} className="text-primary" />
      </div>
    )
  }

  return (
    <section className="w-full px-5 py-6">
      <Search defaultValues={{ term }} />
      <div className="mt-14">
        <h1 className="text-xl font-extrabold lg:text-2xl">
          {restaurantsList.length === 1 ? (
            <>
              <span className="mr-1">
                ({restaurantsList.length}) resultado encontrado para
              </span>
              <strong className="text-red-500">&quot;{term}&quot;</strong>
            </>
          ) : (
            <>
              <span className="mr-1">
                ({restaurantsList.length}) resultados encontrados para
              </span>
              <strong className="text-red-500">&quot;{term}&quot;</strong>
            </>
          )}
        </h1>
      </div>
      <div className="mt-5 flex flex-col flex-wrap items-center gap-4 xl:flex-row">
        {restaurantsList.map((restaurant) => (
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

export default RestaurantsList
