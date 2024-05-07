"use client"
import { Prisma } from "@prisma/client"
import { ProductListItem } from "@/app/_components/common/product/product-list-item"

interface RecommendedProductListContentProps {
  title: string
  productName?: string
  recommendedProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
          imageUrl: true
          deliveryFee: true
          deliveryTimeMinutes: true
        }
      }
    }
  }>[]
}

export const RecommendedProductListContent = ({
  title,
  productName,
  recommendedProducts
}: RecommendedProductListContentProps) => {
  return (
    <section className="w-full px-5 pt-10 transition-all duration-500">
      <div>
        <h2 className="w-4/5 text-xl font-extrabold md:text-2xl">
          {title} {productName}
        </h2>
      </div>
      <div className="custom-scrollbar flex items-center gap-5 overflow-x-auto py-3">
        {recommendedProducts.slice(0, 6).map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
