"use server"

export const toggleFavoriteRestaurant = async (
  userId: string,
  restaurantId: string
) => {
  const db = (await import("@/app/_libs/prisma")).default

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
