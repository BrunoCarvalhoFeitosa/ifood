export const dynamic = "force-dynamic"
import db from "@/app/_libs/prisma"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import { AccountFavoriteRestaurants } from "./_components/account-favorite-restaurants"

const AccountFavoriteRestaurantPage = async () => {
  const currentUser = await getCurrentUser()

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: currentUser?.id
    },
    include: {
      restaurant: true
    }
  })

  return (
    <AccountFavoriteRestaurants
      currentUser={currentUser}
      userFavoriteRestaurants={userFavoriteRestaurants}
    />
  )
}

export default AccountFavoriteRestaurantPage
