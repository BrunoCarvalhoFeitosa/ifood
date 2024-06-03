"use client"
import { drinks } from "@/app/_types/Drinks"

export const RestaurantCategories = () => {
  return (
    <div className="my-7 xl:my-0 xl:pb-2">
      <div className="pb-2 xl:pt-4">
        <h3 className="text-lg font-extrabold">Bebidas</h3>
      </div>
      <div className="custom-scrollbar flex w-full items-center gap-3 overflow-x-auto pb-3">
        <div className="flex items-center gap-3">
          {drinks.map((drink) => (
            <div
              key={drink.name}
              className="min-w-fit bg-gray-100 p-2 px-5 text-sm text-muted-foreground"
            >
              {drink.name} {drink.size}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
