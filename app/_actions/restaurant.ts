"use server"
import db from "@/app/_libs/prisma"

export const toggleFavoriteRestaurant = async (
  userId: string,
  restaurantId: string
) => {
  const isFavorite = await db.userFavoriteRestaurant.findFirst({
    where: {
      userId,
      restaurantId
    }
  })

  if (isFavorite) {
    await db.userFavoriteRestaurant.delete({
      where: {
        userId_restaurantId: {
          userId,
          restaurantId
        }
      }
    })
  } else {
    await db.userFavoriteRestaurant.create({
      data: {
        userId,
        restaurantId
      }
    })
  }
}
