import { Category, Restaurant } from "@prisma/client"
import Link from "next/link"
import { Button } from "@/app/_components/ui/button"
import { HeaderMenuListDropdown } from "./header-menu-list-dropdown"
import { HeaderRestaurantListDropdown } from "./header-restaurant-list-dropdown"
import { HeartIcon, HomeIcon, NotebookTextIcon } from "lucide-react"
import { HeaderAuthenticatedContent } from "./header-authenticated-content"
import { HeaderUnauthenticatedContent } from "./header-unautheticated-content"

interface HeaderContentProps {
  categories: Category[]
  restaurants?: Restaurant[]
  currentUser: {
    id: string
    name: string | null
    image: string | null
    email: string | null
    createdAt?: string | Date
    updatedAt?: string | Date
  } | null
}

export const HeaderContent = async ({
  categories,
  restaurants,
  currentUser
}: HeaderContentProps) => {
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
        <Button
          type="button"
          variant="ghost"
          className="flex justify-start gap-2 rounded-full font-semibold hover:bg-gray-200"
        >
          <div>
            <NotebookTextIcon size={20} />
          </div>
          <div className="text-sm xl:text-base">Meus Pedidos</div>
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
      <div className="max-h-[62vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <HeaderMenuListDropdown categories={categories} />
        <HeaderRestaurantListDropdown restaurants={restaurants} />
      </div>
    </div>
  )
}
