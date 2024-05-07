import { redirect } from "next/navigation"
import { db } from "@/app/_lib/prisma"
import { Header } from "@/app/_components/common/header/header"
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

  const [categories, restaurants] = await Promise.all([
    db.category.findMany({}),
    db.restaurant.findMany({})
  ])

  return (
    <div>
      <Header categories={categories} restaurants={restaurants} />
      <main>
        <RestaurantsList term={searchParams.search} />
      </main>
    </div>
  )
}

export default RestaurantsPage
