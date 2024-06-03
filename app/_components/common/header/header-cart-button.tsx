"use client"
import { useContext, useEffect } from "react"
import { usePathname } from "next/navigation"
import { CartContext } from "@/app/_contexts/Cart"
import { Button } from "@/app/_components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/app/_components/ui/tooltip"
import { ShoppingBagIcon } from "lucide-react"

export const HeaderCartButton = () => {
  const { setIsCartOpen, products } = useContext(CartContext)
  const pathname = usePathname()

  useEffect(() => {
    setIsCartOpen(false)
  }, [pathname])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBagIcon size={20} />
            </Button>
            <div className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
              {products.length}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="text-foreground">
          <p>Ver produtos do carrinho</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
