export const dynamic = "force-dynamic"
import { AccountFavoriteRestaurants } from "./_components/account-favorite-restaurants"

const AccountFavoriteRestaurantPage = async () => {
  const db = (await import("@/app/_libs/prisma")).default
  const getCurrentUser = (await import("@/app/_actions/getCurrentUser")).default
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
