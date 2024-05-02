"use client"
import { Prisma } from "@prisma/client"
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
}

export const ProductContent = ({ product }: ProductContentProps) => {
  return (
    <div className="flex w-full flex-col gap-4 px-0 xl:flex-row xl:px-5 xl:py-6">
      <ProductImage product={product} />
      <ProductInfo product={product} />
    </div>
  )
}
