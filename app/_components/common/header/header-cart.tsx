"use client"
import { useContext } from "react"
import { CartContext } from "@/app/_contexts/Cart"
import { Button } from "@/app/_components/ui/button"
import { ShoppingBagIcon } from "lucide-react"

export const HeaderCart = () => {
  const { setIsCartOpen, products } = useContext(CartContext)

  return (
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
  )
}
