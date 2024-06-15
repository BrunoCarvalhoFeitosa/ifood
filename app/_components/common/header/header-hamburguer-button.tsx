"use server"
import { Category, Restaurant } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
import { Button } from "@/app/_components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/app/_components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/app/_components/ui/tooltip"
import { HeaderSideMenu } from "./header-side-menu"
import { MenuIcon } from "lucide-react"

interface HeaderHamburguerButtonProps {
  categories: Category[]
  restaurants?: Restaurant[]
  currentUser: SafeUser | null
}

export const HeaderHamburguerButton = ({
  categories,
  restaurants,
  currentUser
}: HeaderHamburguerButtonProps) => {
  return (
    <TooltipProvider>
      <Sheet>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="default"
                size="default"
                className="h-12 w-12 rounded-full transition-all duration-700 hover:text-white hover:opacity-80 md:h-14 md:w-14"
              >
                <MenuIcon size={25} />
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
          <div className="hidden xl:block">
            <TooltipContent className="text-foreground">
              <p>Abrir o menú</p>
            </TooltipContent>
          </div>
        </Tooltip>
        <SheetContent>
          <SheetHeader className="text-left">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <HeaderSideMenu
            categories={categories}
            restaurants={restaurants}
            currentUser={currentUser}
          />
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  )
}
