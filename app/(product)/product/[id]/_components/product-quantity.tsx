"use client"
import { useState } from "react"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

export const ProductQuantity = () => {
  const min = 1
  const max = 10
  const [quantity, setQuantity] = useState<number>(min)

  const handleIncreaseQuantityClick = () => {
    setQuantity((currentState: number): number => {
      if (currentState + 1 >= max) {
        return max
      }

      return currentState + 1
    })
  }

  const handleDecreaseQuantityClick = () => {
    setQuantity((currentState: number): number => {
      if (currentState - 1 <= min) {
        return min
      }

      return currentState - 1
    })
  }

  return (
    <div className="flex items-center">
      <Button
        type="button"
        variant="default"
        size="icon"
        className="h-8 w-8 rounded-none md:h-10 md:w-10"
        onClick={handleDecreaseQuantityClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Input
        type="text"
        defaultValue={quantity}
        className="flex h-11 w-11 items-center justify-center border-transparent bg-white p-0 text-center text-base font-bold text-black focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
      />
      <Button
        type="button"
        variant="default"
        size="icon"
        className="h-8 w-8 rounded-none md:h-10 md:w-10"
        onClick={handleIncreaseQuantityClick}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
