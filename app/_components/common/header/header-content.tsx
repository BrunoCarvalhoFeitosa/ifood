"use client"
import { Category, Restaurant } from "@prisma/client"
import Link from "next/link"
import { Button } from "@/app/_components/ui/button"
import { HeaderMenuListDropdown } from "./header-menu-list-dropdown"
import { HeaderRestaurantListDropdown } from "./header-restaurant-list-dropdown"
import { HeartIcon, HomeIcon, LogInIcon, NotebookTextIcon } from "lucide-react"

interface HeaderContentProps {
  categories: Category[]
  restaurants?: Restaurant[]
}

export const HeaderContent = ({
  categories,
  restaurants
}: HeaderContentProps) => {
  return (
    <div>
      <div className="mt-8 flex items-center justify-between gap-3 border-b border-solid pb-3">
        <div className="text-sm font-semibold xl:text-base">
          Olá. Faça seu login!
        </div>
        <Link href="/sign-in" className="w-fit">
          <Button type="button" variant="default" size="icon">
            <LogInIcon size={20} />
          </Button>
        </Link>
      </div>
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
        <Button
          type="button"
          variant="ghost"
          className="flex justify-start gap-2 rounded-full font-semibold hover:bg-gray-300"
        >
          <div>
            <NotebookTextIcon size={20} />
          </div>
          <div className="text-sm xl:text-base">Meus pedidos</div>
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="flex justify-start gap-2 rounded-full font-semibold hover:bg-gray-200"
        >
          <div>
            <HeartIcon size={20} />
          </div>
          <div className="text-sm xl:text-base">Restaurantes Favoritos</div>
        </Button>
      </div>
      <div className="max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <HeaderMenuListDropdown categories={categories} />
        <HeaderRestaurantListDropdown restaurants={restaurants} />
      </div>
    </div>
  )
}
