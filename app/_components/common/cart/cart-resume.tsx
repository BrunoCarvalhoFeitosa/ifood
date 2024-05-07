"use client"
import { useContext } from "react"
import { CartContext } from "@/app/_contexts/Cart"
import { formatCurrency } from "@/app/_helpers/price"
import { Button } from "@/app/_components/ui/button"
import { useRouter } from "next/navigation"

export const CartResume = () => {
  const router = useRouter()
  const {
    products,
    setIsCartOpen,
    subtotalPrice,
    totalPrice,
    totalDiscounts,
    deliveryPrice
  } = useContext(CartContext)

  const handleGoToCheckout = () => {
    router.push("/checkout")
  }

  return (
    <div className="flex w-full flex-col gap-3">
      {products.length >= 1 && (
        <div className="text-sm xl:text-base">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-extrabold">Subtotal:</h4>
            <span className="xl:w-24">
              {formatCurrency(products.length ? subtotalPrice : 0)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-extrabold">Descontos:</h4>
            <span className="xl:w-24">
              {formatCurrency(products.length ? totalDiscounts : 0)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-extrabold">Entrega:</h4>
            {products.length && deliveryPrice !== 0 ? (
              <span className="xl:w-24">
                {formatCurrency(Number(deliveryPrice))}
              </span>
            ) : (
              <span className="xl:w-24">Grátis</span>
            )}
          </div>
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-extrabold">Total:</h4>
            <span className="xl:w-24">
              {formatCurrency(products.length ? totalPrice : 0)}
            </span>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-3">
        <Button
          type="button"
          variant="ghost"
          className="h-[50px] w-full rounded-full border border-solid bg-transparent text-sm xl:text-base"
          onClick={() => setIsCartOpen(false)}
        >
          Continuar comprando
        </Button>
        <Button
          type="button"
          variant="default"
          className="h-[50px] w-full rounded-full text-sm xl:text-base"
          disabled={!products.length}
          onClick={handleGoToCheckout}
        >
          Ir para o checkout
        </Button>
      </div>
    </div>
  )
}
