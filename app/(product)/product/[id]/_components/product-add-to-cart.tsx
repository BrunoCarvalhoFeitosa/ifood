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
    <div className="fixed bottom-5 left-[50%] mx-auto w-[95%] translate-x-[-50%] pt-6 lg:relative lg:bottom-0 lg:left-0 lg:mx-0 lg:w-full lg:translate-x-0">
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
