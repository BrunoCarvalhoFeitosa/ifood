"use server"
import db from "@/app/_libs/prisma"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import { redirect } from "next/navigation"
import { AccountFavoriteRestaurants } from "./_components/account-favorite-restaurants"

const AccountFavoriteRestaurantPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return redirect("/")
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: currentUser.id
    },
    include: {
      restaurant: true
    }
  })

  return (
    <div className="overflow-hidden">
      <AccountFavoriteRestaurants
        currentUser={currentUser}
        userFavoriteRestaurants={userFavoriteRestaurants}
      />
    </div>
  )
}

export default AccountFavoriteRestaurantPage
