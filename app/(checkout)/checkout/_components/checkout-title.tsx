"use client"
import { Fragment, useContext } from "react"
import { CartContext } from "@/app/_contexts/CartContext"

export const CheckoutTitle = () => {
  const { products } = useContext(CartContext)

  return (
    <Fragment>
      {products.length >= 1 && (
        <div className="pb-5">
          <h1 className="text-lg font-extrabold md:text-xl">
            Sacola de compras
          </h1>
          {products.length >= 2 ? (
            <p className="text-sm md:text-base">
              Estes foram os <strong>{products.length} produtos</strong> que
              você adicionou a sacola.
            </p>
          ) : (
            <p className="text-sm md:text-base">
              Este foi o <strong>produto</strong> que você adicionou a sacola.
            </p>
          )}
        </div>
      )}
    </Fragment>
  )
}
