"use client"
import { useContext } from "react"
import { CartContext, CartProduct } from "@/app/_contexts/Cart"
import {
  formatCurrency,
  getCalculateProductTotalPrice
} from "@/app/_helpers/price"
import Image from "next/image"
import { Button } from "@/app/_components/ui/button"
import { Trash2Icon } from "lucide-react"

interface CartItemProps {
  cartProduct: CartProduct
}

export const CartItem = ({ cartProduct }: CartItemProps) => {
  const { removeProductFromCart } = useContext(CartContext)

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-[90px] w-[100px] bg-gray-200 xl:w-[130px]">
        <Image
          fill
          src={cartProduct.imageUrl}
          alt={cartProduct.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 truncate">
        <div className="flex w-full items-center gap-2">
          <h3 className="truncate text-base font-semibold">
            {cartProduct.name}
          </h3>
          <span className="text-xs text-muted-foreground">
            ({cartProduct.quantity}x)
          </span>
        </div>
        <div className="mb-2">
          <h4 className="text-xs">{cartProduct.restaurant.name}</h4>
        </div>
        <div className="flex flex-col items-center gap-2 xl:flex-row">
          <h4 className="text-lg font-extrabold">
            {formatCurrency(getCalculateProductTotalPrice(cartProduct))}
          </h4>
          {cartProduct.discountPercentage > 0 && (
            <h5 className="text-sm text-muted-foreground line-through">
              {formatCurrency(Number(cartProduct.price))}
            </h5>
          )}
        </div>
      </div>
      <div className="ml-auto">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => removeProductFromCart(cartProduct.id)}
        >
          <Trash2Icon size={20} />
        </Button>
      </div>
    </div>
  )
}
