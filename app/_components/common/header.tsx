"use client"
import { Category, Restaurant } from "@prisma/client"
import { HeaderLogo } from "./header-logo"
import { HeaderActions } from "./header-actions"

interface HeaderProps {
  categories: Category[]
  restaurants?: Restaurant[]
}

export const Header = ({ categories, restaurants }: HeaderProps) => {
  return (
    <header className="flex w-full items-center justify-between p-5">
      <HeaderLogo />
      <HeaderActions categories={categories} restaurants={restaurants} />
    </header>
  )
}
