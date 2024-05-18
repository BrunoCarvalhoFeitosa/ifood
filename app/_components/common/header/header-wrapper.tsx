"use client"
import { useEffect, useState } from "react"
import { Category, Restaurant } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
import { HeaderActions } from "./header-actions"
import { HeaderCart } from "./header-cart"
import { HeaderLogo } from "./header-logo"
import { usePathname } from "next/navigation"

interface HeaderWrapperProps {
  categories: Category[]
  restaurants?: Restaurant[]
  currentUser: SafeUser | null
}

export const HeaderWrapper = ({
  categories,
  restaurants,
  currentUser
}: HeaderWrapperProps) => {
  const [hideHeaderOnMobile, setHideHeaderOnMobile] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname && pathname.includes("/product")) {
      setHideHeaderOnMobile(true)
    } else {
      setHideHeaderOnMobile(false)
    }
  }, [pathname])

  return (
    <header
      className={`flex w-full items-center justify-between p-5 ${hideHeaderOnMobile && "hidden md:flex"}`}
    >
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
