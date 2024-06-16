"use client"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/app/_components/ui/button"
import {
  ChefHatIcon,
  CircleUserRoundIcon,
  CookingPotIcon,
  HomeIcon,
  LogOutIcon,
  NotebookTextIcon
} from "lucide-react"

export const AccountMenuOptions = () => {
  const pathname = usePathname()

  return (
    <div className="pt-3">
      <ul className="flex flex-col gap-2">
        <li>
          <Link href="/" className="w-full">
            <Button
              type="button"
              variant="default"
              className="flex w-full justify-start gap-2 rounded-full font-semibold hover:bg-red-800"
            >
              <div>
                <HomeIcon size={20} />
              </div>
              <div className="text-sm xl:text-base">Início</div>
            </Button>
          </Link>
        </li>
        <li>
          <Link href="/account/user" className="w-full">
            <Button
              type="button"
              variant="default"
              className={`flex w-full justify-start gap-2 rounded-full font-semibold ${pathname === "/account/user" ? "bg-white text-black hover:bg-white" : "bg-primary hover:bg-red-800"}`}
            >
              <div>
                <CircleUserRoundIcon size={22} />
              </div>
              <div className="text-sm xl:text-base">Minha Conta</div>
            </Button>
          </Link>
        </li>
        <li>
          <Link href="/account/orders" className="w-full">
            <Button
              type="button"
              variant="default"
              className={`flex w-full justify-start gap-2 rounded-full font-semibold ${pathname === "/account/orders" ? "bg-white text-black hover:bg-white" : "bg-primary hover:bg-red-800"}`}
            >
              <div>
                <NotebookTextIcon size={20} />
              </div>
              <div className="text-sm xl:text-base">Meus Pedidos</div>
            </Button>
          </Link>
        </li>
        <li>
          <Link href="/account/favorite-foods" className="w-full">
            <Button
              type="button"
              variant="default"
              className={`flex w-full justify-start gap-2 rounded-full font-semibold ${pathname === "/account/favorite-foods" ? "bg-white text-black hover:bg-white" : "bg-primary hover:bg-red-800"}`}
            >
              <div>
                <CookingPotIcon size={20} />
              </div>
              <div className="text-sm xl:text-base">Comidas Favoritas</div>
            </Button>
          </Link>
        </li>
        <li>
          <Link href="/account/favorite-restaurants" className="w-full">
            <Button
              type="button"
              variant="default"
              className={`flex w-full justify-start gap-2 rounded-full font-semibold ${pathname === "/account/favorite-restaurants" ? "bg-white text-black hover:bg-white" : "bg-primary hover:bg-red-800"}`}
            >
              <div>
                <ChefHatIcon size={22} />
              </div>
              <div className="text-sm xl:text-base">Restaurantes Favoritos</div>
            </Button>
          </Link>
        </li>
        <li>
          <Button
            type="button"
            variant="default"
            className="flex w-full justify-start gap-2 rounded-full bg-primary font-semibold hover:bg-red-800"
            onClick={() =>
              signOut({
                callbackUrl: "/",
                redirect: true
              })
            }
          >
            <div>
              <LogOutIcon />
            </div>
            <div className="text-sm xl:text-base">Finalizar sessão</div>
          </Button>
        </li>
      </ul>
    </div>
  )
}
