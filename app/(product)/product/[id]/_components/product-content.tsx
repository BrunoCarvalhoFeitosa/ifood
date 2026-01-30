"use client"
import { Prisma, UserFavoriteProduct } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
import { ProductImage } from "./product-image"
import { ProductInfo } from "./product-info"

interface ProductContentProps {
  product: Prisma.ProductGetPayload<{
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
  }>
  currentUser: SafeUser | null
  userFavoriteProducts: UserFavoriteProduct[]
}

export const ProductContent = ({
  product,
  currentUser,
  userFavoriteProducts
}: ProductContentProps) => {
  return (
    <div className="flex w-full flex-col gap-4 px-0 xl:flex-row xl:px-5 xl:py-6">
      <ProductImage
        product={product}
        currentUser={currentUser}
        userFavoriteProducts={userFavoriteProducts}
      />
      <ProductInfo product={product} />
    </div>
  )
}
