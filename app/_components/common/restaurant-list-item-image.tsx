"use client"
import { Restaurant } from "@prisma/client"
import Image from "next/image"
import { Badge } from "@/app/_components/ui/badge"
import { StarIcon } from "lucide-react"

interface RestaurantListItemImageProps {
  restaurant: Restaurant
}

export const RestaurantListItemImage = ({
  restaurant
}: RestaurantListItemImageProps) => {
  return (
    <div className="relative w-[200px] overflow-hidden md:w-[210px] lg:w-[220px]">
      <div className="h-[150px] w-full md:h-[180px]">
        <Image
          fill
          src={restaurant.imageUrl}
          alt={restaurant.name}
          quality={100}
          className="cursor-zoom-in object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="absolute left-3 top-3 z-10">
        <Badge
          variant="default"
          className="flex items-center gap-1 px-2 py-[2px]"
        >
          <div>
            <StarIcon size={18} className="fill-yellow-500 text-yellow-500" />
          </div>
          <div className="text-base">
            <span>5.0</span>
          </div>
        </Badge>
      </div>
    </div>
  )
}
