"use client"
import { Restaurant } from "@prisma/client"
import { formatCurrency } from "@/app/_helpers/price"
import { Button } from "@/app/_components/ui/button"
import { BikeIcon, HeartIcon, TimerIcon } from "lucide-react"

interface RestaurantListItemContentProps {
  restaurant: Restaurant
}

export const RestaurantListItemContent = ({
  restaurant
}: RestaurantListItemContentProps) => {
  return (
    <div>
      <div className="my-3">
        <h3 className="text-base font-semibold">{restaurant.name}</h3>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-primary">
          <Button
            type="button"
            variant="ghost"
            className="rounded-full p-0 hover:bg-transparent hover:fill-primary hover:text-primary"
          >
            <HeartIcon size={20} />
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <div className="text-primary">
            <BikeIcon size={20} />
          </div>
          <div className="text-sm text-muted-foreground">
            {Number(restaurant.deliveryFee) === 0
              ? "Entrega Grátis"
              : formatCurrency(Number(restaurant.deliveryFee))}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="text-primary">
            <TimerIcon size={20} />
          </div>
          <div className="text-sm text-muted-foreground">
            {restaurant.deliveryTimeMinutes} min
          </div>
        </div>
      </div>
    </div>
  )
}
