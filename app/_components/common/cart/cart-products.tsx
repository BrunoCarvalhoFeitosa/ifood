"use client"
import { useContext } from "react"
import { CartContext } from "@/app/_contexts/CartContext"
import { CartItem } from "./cart-item"
import { PackageSearchIcon } from "lucide-react"

export const CartProducts = () => {
  const { products } = useContext(CartContext)

  return (
    <div className="mt-2 h-[calc(100%-280px)] overflow-y-auto [&::-webkit-scrollbar]:hidden">
      {products.length >= 1 ? (
        <div className="flex flex-col gap-3">
          {products.map((product) => (
            <CartItem key={product.id} cartProduct={product} />
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <h3 className="flex flex-col items-center justify-center font-semibold">
            <PackageSearchIcon size={25} />
            <span>Nenhum produto na sacola.</span>
          </h3>
        </div>
      )}
    </div>
  )
}
