"use server"
import { Category, Restaurant } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
import Link from "next/link"
import { Button } from "@/app/_components/ui/button"
import { HeaderMenuListDropdown } from "./header-menu-list-dropdown"
import { HeaderRestaurantListDropdown } from "./header-restaurant-list-dropdown"
import {
  CircleUserRoundIcon,
  CookingPotIcon,
  HeartIcon,
  HomeIcon,
  NotebookTextIcon
} from "lucide-react"
import { HeaderAuthenticatedContent } from "./header-authenticated-content"
import { HeaderUnauthenticatedContent } from "./header-unautheticated-content"

interface HeaderSideMenuProps {
  categories: Category[]
  restaurants?: Restaurant[]
  currentUser: SafeUser | null
}

export const HeaderSideMenu = async ({
  categories,
  restaurants,
  currentUser
}: HeaderSideMenuProps) => {
  return (
    <div>
      {currentUser ? (
        <HeaderAuthenticatedContent currentUser={currentUser} />
      ) : (
        <HeaderUnauthenticatedContent />
      )}
      <div className="my-6 flex flex-col gap-3 border-b border-solid pb-3">
        <Link href="/" className="w-full">
          <Button
            type="button"
            variant="default"
            className="flex w-full justify-start gap-2 rounded-full font-semibold"
          >
            <div>
              <HomeIcon size={20} />
            </div>
            <div className="text-sm xl:text-base">Início</div>
          </Button>
        </Link>
        <Link href="/account/user" className="w-full">
          <Button
            type="button"
            variant="ghost"
            className="flex w-full justify-start gap-2 rounded-full font-semibold hover:bg-gray-100"
          >
            <div>
              <CircleUserRoundIcon size={22} />
            </div>
            <div className="text-sm xl:text-base">Minha Conta</div>
          </Button>
        </Link>
        <Link href="/account/orders" className="w-full">
          <Button
            type="button"
            variant="ghost"
            className="flex w-full justify-start gap-2 rounded-full font-semibold hover:bg-gray-100"
          >
            <div>
              <NotebookTextIcon size={20} />
            </div>
            <div className="text-sm xl:text-base">Meus Pedidos</div>
          </Button>
        </Link>
        <Link href="/account/favorite-foods" className="w-full">
          <Button
            type="button"
            variant="ghost"
            className="flex w-full justify-start gap-2 rounded-full font-semibold hover:bg-gray-100"
          >
            <div>
              <CookingPotIcon size={20} />
            </div>
            <div className="text-sm xl:text-base">Comidas Favoritas</div>
          </Button>
        </Link>
        <Link href="/account/favorite-restaurants" className="w-full">
          <Button
            type="button"
            variant="ghost"
            className="flex w-full justify-start gap-2 rounded-full font-semibold hover:bg-gray-100"
          >
            <div>
              <HeartIcon size={20} />
            </div>
            <div className="text-sm xl:text-base">Restaurantes Favoritos</div>
          </Button>
        </Link>
      </div>
      <div className="max-h-[60vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <HeaderMenuListDropdown categories={categories} />
        <HeaderRestaurantListDropdown restaurants={restaurants} />
      </div>
    </div>
  )
}
