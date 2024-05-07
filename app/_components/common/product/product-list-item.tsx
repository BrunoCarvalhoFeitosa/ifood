"use client"
import { Prisma } from "@prisma/client"
import Link from "next/link"
import { ProductListItemImage } from "./product-list-item-image"
import { ProductListItemContent } from "./product-list-item-content"

interface ProductListItemProps {
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

export const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <Link href={`/product/${product.id}`}>
      <ProductListItemImage product={product} />
      <ProductListItemContent product={product} />
    </Link>
  )
}
