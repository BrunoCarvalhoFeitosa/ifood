"use client"
import { Restaurant } from "@prisma/client"
import { formatCurrency } from "@/app/_helpers/price"
import { BikeIcon, TimerIcon } from "lucide-react"

interface RestaurantDeliveryProps {
  restaurant: Restaurant
}

export const RestaurantDelivery = ({ restaurant }: RestaurantDeliveryProps) => {
  return (
    <div className="my-4 flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <div className="text-primary">
          <BikeIcon size={24} />
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>Preço de entrega</span>
          <span>
            {Number(restaurant.deliveryFee) === 0
              ? "Entrega Grátis"
              : formatCurrency(Number(restaurant.deliveryFee))}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div className="text-primary">
          <TimerIcon size={24} />
        </div>
        <div className="text-sm text-muted-foreground">
          Tempo de entrega {restaurant.deliveryTimeMinutes} min
        </div>
      </div>
    </div>
  )
}
