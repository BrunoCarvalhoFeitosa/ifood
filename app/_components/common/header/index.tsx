"use server"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import { Category, Restaurant } from "@prisma/client"
import { HeaderLogo } from "./header-logo"
import { HeaderCart } from "./header-cart"
import { HeaderActions } from "./header-actions"

interface HeaderProps {
  categories: Category[]
  restaurants?: Restaurant[]
}

export const Header = async ({ categories, restaurants }: HeaderProps) => {
  const currentUser = await getCurrentUser()

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between bg-white p-5">
      <HeaderLogo />
      <div className="flex items-center gap-1">
        <HeaderCart />
        <HeaderActions
          categories={categories}
          restaurants={restaurants}
          currentUser={currentUser}
        />
      </div>
    </header>
  )
}