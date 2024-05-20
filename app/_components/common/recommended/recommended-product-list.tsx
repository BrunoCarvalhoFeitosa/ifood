"use server"
import db from "@/app/_libs/prisma"
import { RecommendedProductListContent } from "./recommended-product-list-content"

interface RecommendedProductListProps {
  title: string
  productName?: string
  categoryId: string
}

export const RecommendedProductList = async ({
  title,
  productName,
  categoryId
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
    />
  )
}
