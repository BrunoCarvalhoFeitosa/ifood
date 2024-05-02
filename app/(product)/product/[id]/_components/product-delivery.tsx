"use client"
import { Prisma } from "@prisma/client"
import { formatCurrency } from "@/app/_helpers/price"
import { BikeIcon, TimerIcon } from "lucide-react"

interface ProductDeliveryProps {
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

export const ProductDelivery = ({ product }: ProductDeliveryProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <div className="text-primary">
          <BikeIcon size={24} />
        </div>
        <div className="text-sm text-muted-foreground">
          Preço de entrega{" "}
          {Number(product.restaurant.deliveryFee) === 0
            ? "Entrega Grátis"
            : formatCurrency(Number(product.restaurant.deliveryFee))}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div className="text-primary">
          <TimerIcon size={24} />
        </div>
        <div className="text-sm text-muted-foreground">
          Tempo de entrega {product.restaurant.deliveryTimeMinutes} min
        </div>
      </div>
    </div>
  )
}
