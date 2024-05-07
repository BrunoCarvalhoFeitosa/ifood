"use client"
import { Category, Restaurant } from "@prisma/client"
import { Button } from "@/app/_components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/app/_components/ui/sheet"
import { MenuIcon } from "lucide-react"
import { HeaderContent } from "./header-content"

interface HeaderActionsProps {
  categories: Category[]
  restaurants?: Restaurant[]
}

export const HeaderActions = ({
  categories,
  restaurants
}: HeaderActionsProps) => {
  return (
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
        <SheetHeader className="text-left">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <HeaderContent categories={categories} restaurants={restaurants} />
      </SheetContent>
    </Sheet>
  )
}