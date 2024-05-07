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
    <div className="relative w-[210px] overflow-hidden md:w-[210px] lg:w-[340px]">
      <div className="h-[150px] w-full lg:h-[240px]">
        <Image
          fill
          src={product.imageUrl}
          alt={product.name}
          quality={100}
          className="cursor-zoom-in object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="absolute left-3 top-3 z-10">
        <ProductDiscountBadge product={product} />
      </div>
    </div>
  )
}
