"use client"
import { useState } from "react"
import { toast, Flip } from "react-toastify"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

export const ProductQuantity = () => {
  const [quantity, setQuantity] = useState<number>(1)
  const [isMaxQuantity, setIsMaxQuantity] = useState<boolean>(false)
  const [isMinQuantity, setIsMinQuantity] = useState<boolean>(true)

  const handleIncreaseQuantityClick = () => {
    setQuantity((currentState: number): number => {
      if (currentState + 1 >= 10) {
        setIsMaxQuantity(true)
        return 10
      }
      return currentState + 1
    })
    setIsMinQuantity(false)
    setIsMaxQuantity(false)

    if (quantity + 1 >= 10) {
      toast("Esta é a quantidade máxima permitida por pedido.", {
        type: "error",
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Flip
      })
    }
  }

  const handleDecreaseQuantityClick = () => {
    setQuantity((currentState: number): number => {
      if (currentState - 1 <= 1) {
        setIsMinQuantity(true)
        return 1
      }
      return currentState - 1
    })
    setIsMaxQuantity(false)
    setIsMinQuantity(false)

    if (quantity - 1 <= 1) {
      toast("Esta é a quantidade mínima permitida por pedido.", {
        type: "error",
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Flip
      })
    }
  }

  return (
    <div className="flex items-center">
      <Button
        type="button"
        variant="default"
        size="icon"
        disabled={isMinQuantity}
        className="h-9 w-9 rounded-md md:h-10 md:w-10"
        onClick={handleDecreaseQuantityClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Input
        readOnly
        type="text"
        defaultValue={quantity}
        className="flex h-9 w-9 items-center justify-center border-transparent bg-white p-0 text-center text-base font-bold text-black focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
      />
      <Button
        type="button"
        variant="default"
        size="icon"
        disabled={isMaxQuantity}
        className="h-9 w-9 rounded-md md:h-10 md:w-10"
        onClick={handleIncreaseQuantityClick}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
