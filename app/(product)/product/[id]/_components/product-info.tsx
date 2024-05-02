"use client"
import { Prisma } from "@prisma/client"
import { ProductRestaurant } from "./product-restaurant"
import { ProductName } from "./product-name"
import { ProductPriceWrapper } from "./product-price-wrapper"
import { ProductDescription } from "./product-description"
import { ProductDelivery } from "./product-delivery"
import { ProductAddToCart } from "./product-add-to-cart"

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
  return (
    <div className="relative z-20 -mt-10 flex flex-1 flex-col justify-between rounded-tl-[40px] rounded-tr-[40px] bg-white px-5 py-6 md:-mt-14 md:rounded-tl-[60px] md:rounded-tr-[60px] xl:mt-0 xl:rounded-none xl:py-0">
      <div>
        <ProductRestaurant product={product} />
        <ProductName product={product} />
        <ProductPriceWrapper product={product} />
      </div>
      <ProductDescription product={product} />
      <ProductDelivery product={product} />
      <ProductAddToCart product={product} />
    </div>
  )
}
