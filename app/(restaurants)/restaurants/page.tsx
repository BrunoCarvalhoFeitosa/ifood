import { db } from "@/app/_lib/prisma"
import { Header } from "@/app/_components/common/header"
import { RestaurantsList } from "./_components/restaurants-list"

const RestaurantsPage = async () => {
  const [categories, restaurants] = await Promise.all([
    db.category.findMany({}),
    db.restaurant.findMany({})
  ])

  return (
    <div>
      <Header categories={categories} restaurants={restaurants} />
      <main>
        <RestaurantsList />
      </main>
    </div>
  )
}

export default RestaurantsPage
