"use client"
import { Product } from "@prisma/client"
import Image from "next/image"
import { ProductDiscountBadge } from "./product-discount-badge"

interface ProductListItemImageProps {
  product: Product
}

export const ProductListItemImage = ({
  product
}: ProductListItemImageProps) => {
  return (
    <div className="relative w-full min-w-[275px] overflow-hidden md:min-w-[325px] lg:w-[calc((100dvw/4)-25px)]">
      <div className="h-[220px] w-full bg-gray-100 md:h-[250px] lg:h-[300px]">
        <Image
          fill
          src={product.imageUrl}
          alt={product.name}
          quality={100}
          className="cursor-zoom-in object-cover object-center transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="absolute left-3 top-3 z-10">
        <ProductDiscountBadge product={product} />
      </div>
    </div>
  )
}
