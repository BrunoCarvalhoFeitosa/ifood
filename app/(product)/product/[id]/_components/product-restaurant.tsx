"use client"
import { Prisma } from "@prisma/client"
import Image from "next/image"

interface ProductRestaurantProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
          imageUrl: true
        }
      }
    }
  }>
}

export const ProductRestaurant = ({ product }: ProductRestaurantProps) => {
  return (
    <div className="mb-1 flex items-center gap-2">
      <div className="h-[50px] w-[50px]">
        <Image
          src={product.restaurant.imageUrl}
          width={50}
          height={50}
          quality={100}
          alt={product.restaurant.name}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="text-sm text-muted-foreground">
        {product.restaurant.name}
      </div>
    </div>
  )
}
