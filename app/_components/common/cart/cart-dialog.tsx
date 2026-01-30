"use client"
import { Product } from "@prisma/client"
import { useContext } from "react"
import { CartContext } from "@/app/_contexts/CartContext"
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

interface CartDialogProps {
  product: Product
}

export const CartDialog = ({ product }: CartDialogProps) => {
  const { setIsDifferentRestaurant, isDifferentRestaurant, addProductToCart } =
    useContext(CartContext)

  return (
    <AlertDialog
      open={isDifferentRestaurant}
      onOpenChange={setIsDifferentRestaurant}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você só pode adicionar itens de um único restaurante por vez
          </AlertDialogTitle>
          <AlertDialogDescription>
            Deseja mesmo adicionar este produto? Esta ação limpará toda a sua
            sacola.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Manter minha sacola</AlertDialogCancel>
          <AlertDialogAction onClick={() => addProductToCart(product)}>
            Esvaziar sacola e adicionar este produto
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
