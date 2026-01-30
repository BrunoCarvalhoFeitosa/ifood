export const dynamic = "force-dynamic"
import db from "@/app/_libs/prisma"
import { UserFavoriteProduct } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
import { RecommendedProductListContent } from "./recommended-product-list-content"

interface RecommendedProductListProps {
  title: string
  productName?: string
  categoryId: string
  currentUser: SafeUser | null
  userFavoriteProducts: UserFavoriteProduct[]
}

export const RecommendedProductList = async ({
  title,
  productName,
  categoryId,
  currentUser,
  userFavoriteProducts
}: RecommendedProductListProps) => {
  const recommendedProducts = await db.product.findMany({
    where: {
      categoryId
    },
    include: {
      restaurant: true
    }
  })

  return (
    <RecommendedProductListContent
      title={title}
      productName={productName}
      recommendedProducts={recommendedProducts}
      currentUser={currentUser}
      userFavoriteProducts={userFavoriteProducts}
    />
  )
}
