import { Category, Restaurant } from "@prisma/client"
import { HeaderLogo } from "./header-logo"
import { HeaderCart } from "./header-cart"
import { HeaderActions } from "./header-actions"
import { SafeUser } from "@/app/_types/SafeUser"

interface HeaderProps {
  categories: Category[]
  restaurants?: Restaurant[]
  currentUser: SafeUser | null
}

export const Header = ({
  categories,
  restaurants,
  currentUser
}: HeaderProps) => {
  return (
    <header className="flex w-full items-center justify-between p-5">
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
