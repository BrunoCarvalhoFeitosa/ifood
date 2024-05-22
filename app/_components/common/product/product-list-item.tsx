"use client"
import { Prisma, UserFavoriteProduct } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
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
  currentUser: SafeUser | null
  userFavoriteProducts: UserFavoriteProduct[]
}

export const ProductListItem = ({
  product,
  currentUser,
  userFavoriteProducts
}: ProductListItemProps) => {
  return (
    <Link href={`/product/${product.id}`}>
      <ProductListItemImage product={product} />
      <ProductListItemContent
        product={product}
        currentUser={currentUser}
        userFavoriteProducts={userFavoriteProducts}
      />
    </Link>
  )
}
