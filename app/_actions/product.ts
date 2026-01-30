export const dynamic = "force-dynamic"
import db from "@/app/_libs/prisma"
import { revalidatePath } from "next/cache"

export const toggleFavoriteProduct = async (
  userId: string,
  productId: string
) => {
  const isFavorite = await db.userFavoriteProduct.findFirst({
    where: {
      userId,
      productId
    }
  })

  if (isFavorite) {
    await db.userFavoriteProduct.delete({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    })

    revalidatePath("/")
    return
  }

  await db.userFavoriteProduct.create({
    data: {
      userId,
      productId
    }
  })

  revalidatePath("/")
}
