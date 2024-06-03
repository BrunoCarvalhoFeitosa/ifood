import db from "@/app/_libs/prisma"
import getCurrentUser from "@/app/_actions/getCurrentUser"
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

  const currentUser = await getCurrentUser()

  const [categories, restaurants, userFavoriteRestaurants] = await Promise.all([
    db.category.findMany({}),

    db.restaurant.findMany({}),

    db.userFavoriteRestaurant.findMany({
      where: {
        userId: currentUser?.id
      },
      include: {
        restaurant: true
      }
    })
  ])

  if (!currentUser || !categories || !restaurants) {
    return notFound()
  }

  return (
    <div>
      <Header categories={categories} restaurants={restaurants} />
      <main>
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
