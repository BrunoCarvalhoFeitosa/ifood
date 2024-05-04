"use client"
import { Prisma } from "@prisma/client"
import { useProductSlideButton } from "@/app/_contexts/ProductSlideButtonContext"
import { ProductName } from "./product-name"
import { ProductPriceWrapper } from "./product-price-wrapper"
import { ProductDescription } from "./product-description"
import { ProductDelivery } from "./product-delivery"
import { ProductSlideButton } from "./product-slide-button"
import { cn } from "@/app/_lib/utils"

interface ProductInfoProps {
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

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const { isOpen } = useProductSlideButton()

  return (
    <div
      className={cn(
        "relative z-20 -mt-10 flex flex-1 flex-col rounded-tl-[40px] rounded-tr-[40px] bg-white px-5 py-6 transition-all duration-500 md:-mt-14 md:rounded-tl-[60px] md:rounded-tr-[60px] xl:mt-0 xl:rounded-none xl:py-0",
        `${isOpen ? "-mt-48 md:-mt-72 lg:-mt-96" : "-mt-10 xl:mt-0"}`
      )}
    >
      <ProductSlideButton />
      <ProductName product={product} />
      <ProductPriceWrapper product={product} />
      <ProductDescription product={product} />
      <ProductDelivery product={product} />
    </div>
  )
}
