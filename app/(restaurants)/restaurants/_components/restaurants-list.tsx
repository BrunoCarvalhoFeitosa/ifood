"use client"
import { useEffect, useState } from "react"
import { Restaurant } from "@prisma/client"
import { useSearchParams } from "next/navigation"
import { searchRestaurants } from "@/app/_actions/search"
import { RestaurantListItem } from "@/app/_components/common/restaurant/restaurant-list-item"
import { Search } from "@/app/_components/common/search/search"

export const RestaurantsList = () => {
  const [restaurantsList, setRestaurantsList] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const params = useSearchParams()
  const term = params.get("search")

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
      <div className="flex h-full w-full items-center justify-center">
        Carregando...
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
          <RestaurantListItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </section>
  )
}
