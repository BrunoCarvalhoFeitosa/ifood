"use client"
import { useContext, useState } from "react"
import { SafeUser } from "@/app/_types/SafeUser"
import { useRouter } from "next/navigation"
import { CartContext } from "@/app/_contexts/Cart"
import { Button } from "@/app/_components/ui/button"
import { CheckoutAlertDialog } from "./checkout-alert-dialog"

interface CheckoutSubmitProps {
  currentUser: SafeUser | null
}

export const CheckoutSubmit = ({ currentUser }: CheckoutSubmitProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false)
  const router = useRouter()
  const { products } = useContext(CartContext)

  return (
    <div>
      {currentUser ? (
        <div>
          {products.length >= 1 ? (
            <div className="flex justify-end pt-5">
              <Button
                type="button"
                variant="default"
                className="relative flex h-14 w-full items-center gap-2 px-6 text-base xl:w-96"
                onClick={() => setIsConfirmDialogOpen(true)}
              >
                Finalizar pedido agora
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <Button
                type="button"
                variant="default"
                size="default"
                onClick={() => router.push("/")}
              >
                Volte e adicione produtos à sua sacola
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <Button
            type="button"
            variant="default"
            size="default"
            onClick={() => router.push("/sign-in")}
          >
            Para finalizar pedidos, identifique-se
          </Button>
        </div>
      )}
      <CheckoutAlertDialog
        setIsConfirmDialogOpen={setIsConfirmDialogOpen}
        isConfirmDialogOpen={isConfirmDialogOpen}
        currentUser={currentUser}
      />
    </div>
  )
}
