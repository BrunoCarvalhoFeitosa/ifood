"use client"
import { useContext } from "react"
import { CartContext } from "@/app/_contexts/CartContext"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/app/_components/ui/sheet"
import { CartResume } from "./cart-resume"
import { CartProducts } from "./cart-products"

export const Cart = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext)

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex flex-col justify-between">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <CartProducts />
        <SheetFooter>
          <CartResume />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
