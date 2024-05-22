"use client"
import { Fragment, useContext } from "react"
import { CartContext } from "@/app/_contexts/Cart"

export const CheckoutTitle = () => {
  const { products } = useContext(CartContext)

  return (
    <Fragment>
      {products.length >= 1 && (
        <div className="pb-5 pt-8">
          <h1 className="text-lg font-extrabold md:text-xl">
            Sacola de compras
          </h1>
          <p className="text-sm">
            Este foram os <strong>{products.length} produtos</strong> que você
            adicionou a sacola.
          </p>
        </div>
      )}
    </Fragment>
  )
}
