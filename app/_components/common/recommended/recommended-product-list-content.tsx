"use client"
import { Prisma, UserFavoriteProduct } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
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
  currentUser: SafeUser | null
  userFavoriteProducts: UserFavoriteProduct[]
}

export const RecommendedProductListContent = ({
  title,
  productName,
  recommendedProducts,
  currentUser,
  userFavoriteProducts
}: RecommendedProductListContentProps) => {
  return (
    <section className="w-full px-5 pt-8 transition-all duration-500 xl:pt-10">
      <div>
        <h2 className="text-lg font-extrabold leading-none md:text-2xl">
          {title} {productName}
        </h2>
      </div>
      <div className="custom-scrollbar flex items-center gap-5 overflow-x-auto py-3">
        {recommendedProducts.slice(0, 6).map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            currentUser={currentUser}
            userFavoriteProducts={userFavoriteProducts}
          />
        ))}
      </div>
    </section>
  )
}
