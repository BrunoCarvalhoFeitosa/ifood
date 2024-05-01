"use client"
import { Prisma } from "@prisma/client"
import { ProductListItemImage } from "./product-list-item-image"
import { ProductListItemContent } from "./product-list-item-content"

interface ProductListItemProps {
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

export const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <div className="box-border">
      <ProductListItemImage product={product} />
      <ProductListItemContent product={product} />
    </div>
  )
}
