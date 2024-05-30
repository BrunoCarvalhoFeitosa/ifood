"use server"
import { Category, Restaurant } from "@prisma/client"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import { HeaderLogo } from "./header-logo"
import { HeaderSharePage } from "./header-share-page"
import { HeaderCartButton } from "./header-cart-button"
import { HeaderHamburguerButton } from "./header-hamburguer-button"

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
        <HeaderSharePage />
        <HeaderCartButton />
        <HeaderHamburguerButton
          categories={categories}
          restaurants={restaurants}
          currentUser={currentUser}
        />
      </div>
    </header>
  )
}
