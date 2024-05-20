"use client"

import { CartContext } from "@/app/_contexts/Cart"
import { useContext } from "react"

export const CheckoutTitle = () => {
  const { products } = useContext(CartContext)

  return (
    <div className="pb-5 pt-8">
      <h1 className="text-lg font-extrabold md:text-xl">Sacola de compras</h1>
      {products.length ? (
        <p className="text-sm">
          Este foram os <strong>{products.length} produtos</strong> que você
          adicionou a sacola.
        </p>
      ) : (
        <p className="text-sm">
          Nenhum produto adicionado ainda, volte à loja aproveite nossas
          promoções.
        </p>
      )}
    </div>
  )
}
