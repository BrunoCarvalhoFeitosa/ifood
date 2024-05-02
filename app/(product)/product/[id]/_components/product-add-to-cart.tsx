"use client"
import { Prisma } from "@prisma/client"
import { Button } from "@/app/_components/ui/button"

interface ProductAddToCartProps {
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

export const ProductAddToCart = ({ product }: ProductAddToCartProps) => {
  return (
    <div className="w-full pt-6">
      <Button
        type="button"
        variant="default"
        className="shadow-button h-[55px] w-full rounded-none text-xl"
      >
        Comprar {product.name}
      </Button>
    </div>
  )
}
