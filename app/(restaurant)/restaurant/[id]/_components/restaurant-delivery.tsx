"use client"
import { Restaurant } from "@prisma/client"
import { formatCurrency } from "@/app/_helpers/price"
import { BikeIcon, FlameIcon, ShieldCheckIcon, TimerIcon } from "lucide-react"

interface RestaurantDeliveryProps {
  restaurant: Restaurant
}

export const RestaurantDelivery = ({ restaurant }: RestaurantDeliveryProps) => {
  return (
    <div className="my-4 flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <div className="text-primary">
          <FlameIcon size={24} />
        </div>
        <div className="text-sm text-muted-foreground">
          Pedidos entregue hoje 192
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div className="text-primary">
          <BikeIcon size={24} />
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          {Number(restaurant.deliveryFee) === 0 ? (
            <div>
              <span>Entrega grátis</span>
            </div>
          ) : (
            <div>
              <span>Preço de entrega</span>
              <span>
                {Number(restaurant.deliveryFee) === 0
                  ? "grátis"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>
          )}
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
      <div className="flex items-center gap-1">
        <div className="text-primary">
          <ShieldCheckIcon size={24} />
        </div>
        <div className="text-sm text-muted-foreground">
          Receba outro pedido em casos de má entrega.
        </div>
      </div>
    </div>
  )
}
