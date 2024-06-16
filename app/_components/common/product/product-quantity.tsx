"use client"
import { useContext } from "react"
import { toast, Flip } from "react-toastify"
import { CartContext } from "@/app/_contexts/Cart"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

export const ProductQuantity = () => {
  const { quantity, setQuantity } = useContext(CartContext)

  const handleIncreaseQuantityClick = () => {
    const newQuantity = quantity + 1

    if (quantity >= 10) {
      toast("Esta é a quantidade máxima permitida por pedido.", {
        type: "error",
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Flip
      })

      return
    }

    setQuantity(newQuantity)
  }

  const handleDecreaseQuantityClick = () => {
    const newQuantity = quantity - 1

    if (newQuantity < 1) {
      toast("Esta é a quantidade mínima permitida por pedido.", {
        type: "error",
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Flip
      })
      return
    }

    setQuantity(newQuantity)
  }

  return (
    <div className="flex items-center">
      <Button
        type="button"
        variant="default"
        size="icon"
        className="h-9 w-9 rounded-sm md:h-10 md:w-10"
        onClick={() => handleDecreaseQuantityClick()}
      >
        <ChevronLeftIcon />
      </Button>
      <Input
        readOnly
        type="text"
        value={quantity}
        className="flex h-9 w-9 items-center justify-center border-transparent bg-white p-0 text-center text-base font-bold text-black focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
      />
      <Button
        type="button"
        variant="default"
        size="icon"
        className="h-9 w-9 rounded-sm md:h-10 md:w-10"
        onClick={() => handleIncreaseQuantityClick()}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
