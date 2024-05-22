"use server"
import db from "@/app/_libs/prisma"
import { revalidatePath } from "next/cache"

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

    revalidatePath("/")
    revalidatePath("/product/*")
    revalidatePath("/account/favorite-restaurants")
    return
  }

  await db.userFavoriteRestaurant.create({
    data: {
      userId,
      restaurantId
    }
  })

  revalidatePath("/")
  revalidatePath("/product/*")
  revalidatePath("/account/favorite-restaurants")
}