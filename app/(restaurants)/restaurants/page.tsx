import { redirect } from "next/navigation"
import RestaurantsList from "./_components/restaurants-list"

interface RestaurantPageProps {
  searchParams: {
    search?: string
  }
}

const RestaurantsPage = ({ searchParams }: RestaurantPageProps) => {
  if (!searchParams.search) {
    return redirect("/")
  }

  return (
    <main>
      <RestaurantsList term={searchParams.search} />
    </main>
  )
}

export default RestaurantsPage
