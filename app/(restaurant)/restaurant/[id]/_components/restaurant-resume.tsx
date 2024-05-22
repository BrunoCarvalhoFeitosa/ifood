"use client"
import { Restaurant } from "@prisma/client"
import { Badge } from "@/app/_components/ui/badge"
import { StarIcon } from "lucide-react"

interface RestaurantResumeProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl">
}

export const RestaurantResume = ({ restaurant }: RestaurantResumeProps) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 xl:justify-start">
        <div>
          <h1 className="text-2xl font-semibold">{restaurant.name}</h1>
        </div>
        <div>
          <Badge
            variant="outline"
            className="flex items-center gap-1 bg-zinc-800 px-2 py-[2px]"
          >
            <div>
              <StarIcon size={18} className="fill-yellow-500 text-yellow-500" />
            </div>
            <div className="text-base text-white">
              <span>5.0</span>
            </div>
          </Badge>
        </div>
      </div>
      <div className="mt-2">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis nisi
          aliquam perspiciatis eos quidem! Excepturi expedita praesentium illo
          cupiditate tempora voluptas dolore illum esse maiores officia
          accusantium, in repellat facere?
        </p>
      </div>
    </div>
  )
}
