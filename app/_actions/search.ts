"use server"
import { db } from "@/app/_libs/prisma"

export const searchRestaurants = async (search: string) => {
  const restaurants = await db.restaurant.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive"
      }
    }
  })

  return restaurants
}
