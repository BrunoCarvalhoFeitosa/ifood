"use client"
import { Restaurant } from "@prisma/client"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/app/_components/ui/accordion"

interface HeaderRestaurantListDropdownProps {
  restaurants: Restaurant[]
}

export const HeaderRestaurantListDropdown = ({
  restaurants
}: HeaderRestaurantListDropdownProps) => {
  return (
    <Accordion
      type="single"
      defaultValue="item-1"
      collapsible
      className="mt-6 flex w-full flex-col gap-2"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Restaurantes</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          {restaurants.map((restaurant) => (
            <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
              {restaurant.name}
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
