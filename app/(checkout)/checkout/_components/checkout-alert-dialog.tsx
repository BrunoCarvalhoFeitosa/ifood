/* eslint-disable no-unused-vars */
"use client"
import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { SafeUser } from "@/app/_types/SafeUser"
import { CartContext } from "@/app/_contexts/CartContext"
import { createOrder } from "@/app/_actions/order"
import { OrderStatus } from "@prisma/client"
import { Flip, toast } from "react-toastify"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/app/_components/ui/alert-dialog"
import { Loader } from "lucide-react"

interface CheckoutAlertDialogProps {
  setIsConfirmDialogOpen: (isConfirmDialogOpen: boolean) => void
  isConfirmDialogOpen: boolean
  currentUser: SafeUser | null
}

export const CheckoutAlertDialog = ({
  setIsConfirmDialogOpen,
  isConfirmDialogOpen,
  currentUser
}: CheckoutAlertDialogProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { products, subtotalPrice, totalPrice, totalDiscounts, clearCart } =
    useContext(CartContext)

  const handleFinishOrderClick = async () => {
    if (!currentUser?.id) {
      return
    }

    const restaurant = products[0].restaurant

    try {
      setIsLoading(true)

      await createOrder({
        subtotalPrice: String(subtotalPrice),
        totalDiscounts: String(totalDiscounts),
        totalPrice: String(totalPrice),
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: {
            id: restaurant.id
          }
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: {
            id: currentUser.id
          }
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity
            }))
          }
        }
      })

      toast("Pedido realizado com sucesso.", {
        type: "success",
        toastId: "success",
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Flip
      })

      router.push("/account/orders")
    } catch (error) {
      console.error(error)
      toast("Erro ao processar o pedido.", {
        type: "error",
        toastId: "error",
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Flip
      })
    } finally {
      setIsLoading(false)
      clearCart()
    }
  }

  return (
    <AlertDialog
      open={isConfirmDialogOpen}
      onOpenChange={setIsConfirmDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Ao finalizar seu pedido, você concorda com os termos e condições da
            nossa plataforma. Seu pedido será gerado e o restaurante ficará
            responsável pela entrega do seu pedido.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleFinishOrderClick}
            disabled={isLoading}
          >
            {isLoading && <Loader color="#FFF" width="40px" height="40px" />}
            Finalizar meu pedido agora
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
