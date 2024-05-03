"use client"
import { Category, Restaurant } from "@prisma/client"
import Link from "next/link"
import { Button } from "@/app/_components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/app/_components/ui/sheet"
import { HeaderMenuListDropdown } from "./header-menu-list-dropdown"
import { HeaderRestaurantListDropdown } from "./header-restaurant-list-dropdown"
import { MenuIcon } from "lucide-react"

interface HeaderProps {
  categories: Category[]
  restaurants?: Restaurant[]
}

export const Header = ({ categories, restaurants }: HeaderProps) => {
  return (
    <header className="flex w-full items-center justify-between p-5">
      <div>
        <Link href="/">
          <svg
            viewBox="0 -0.35492335728912394 1004 566.9724898595939"
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="50"
          >
            <g fill="#ea1d2c">
              <path d="M0 304.6h76.41l42.46-211.2H42.45zM46.66 68.21h76.73L136 5.02H59.3zm59.47 295.82h76.42l46.69-228.18h57.31L295 93.4h-56.21l2.13-9.55c3.18-18 9.55-38.21 38.2-38.21 17 0 32.91 1.06 48.82 8.49l8.5-44.57A167.8 167.8 0 0 0 281.25 0c-61.56 0-104 36.09-119.93 93.4h-26.53l-8.49 42.45h26.53z" />
              <path d="M348.11 308.85c90.21 0 152.83-81.73 152.83-148.59 0-49.88-45.64-71.11-90.21-71.11-98.73 0-152.83 88.14-152.83 148.59 0 49.88 46.7 71.11 90.21 71.11m242 0c90.21 0 152.83-81.73 152.83-148.59 0-49.88-46.7-71.11-91.28-71.11-98.7 0-152.82 88.09-152.82 148.59 0 49.88 47.76 71.11 91.27 71.11m277-4.25h75.35L1004 4.29h-76.41l-18.05 89.15-31.84-3.18c-74.29 0-142.21 95.51-142.21 163.44 0 27.59 18 55.19 48.82 55.19 43.51 0 74.29-21.23 87-42.46h4.24zM631.48 462.74a295 295 0 0 1-212.26 66.86c-100.83-6.37-173-83.85-185.73-165.57h4.24c23.35 51 79.6 98.71 148.59 106.13 70 8.49 153.89-23.34 199.52-66.86l-50.94-39.27h153.89l-34 163.45-22.29-63.68z" />
            </g>
          </svg>
        </Link>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="default"
            className="h-12 w-12 rounded-full transition-all duration-700 hover:bg-primary hover:text-white md:h-14 md:w-14"
          >
            <MenuIcon size={25} />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="max-h-[90%] overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <HeaderMenuListDropdown categories={categories} />
            <HeaderRestaurantListDropdown restaurants={restaurants} />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
