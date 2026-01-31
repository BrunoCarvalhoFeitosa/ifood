"use server"

export const searchRestaurants = async (search: string) => {
  const db = (await import("@/app/_libs/prisma")).default

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
