export const dynamic = "force-dynamic"
import { notFound, redirect } from "next/navigation"
import { Header } from "@/app/_components/common/header"
import RestaurantsList from "./_components/restaurants-list"

interface RestaurantPageProps {
  searchParams: {
    search?: string
  }
}

const RestaurantsPage = async ({ searchParams }: RestaurantPageProps) => {
  if (!searchParams.search) {
    return redirect("/")
  }

  const db = (await import("@/app/_libs/prisma")).default
  const getCurrentUser = (await import("@/app/_actions/getCurrentUser")).default
  const currentUser = await getCurrentUser()
  const categories = await db.category.findMany({})
  const restaurants = await db.restaurant.findMany({})

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: currentUser?.id
    },
    include: {
      restaurant: true
    }
  })

  if (!categories || !restaurants) {
    return notFound()
  }

  return (
    <div>
      <Header categories={categories} restaurants={restaurants} />
      <main className="pb-10">
        <RestaurantsList
          term={searchParams.search}
          currentUser={currentUser}
          userFavoriteRestaurants={userFavoriteRestaurants}
        />
      </main>
    </div>
  )
}

export default RestaurantsPage
