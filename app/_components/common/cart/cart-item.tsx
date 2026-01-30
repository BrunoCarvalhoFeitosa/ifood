"use client"
import { useContext } from "react"
import { CartContext, CartProduct } from "@/app/_contexts/CartContext"
import {
  formatCurrency,
  getCalculateProductTotalPrice
} from "@/app/_helpers/price"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/app/_components/ui/button"
import { FileStackIcon, Trash2Icon } from "lucide-react"

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
        <div className="absolute -left-0 top-0 bg-primary p-1.5 text-white">
          <Link href={`/product/${cartProduct.id}`}>
            <FileStackIcon size={18} />
          </Link>
        </div>
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
        <div className="flex flex-col items-start xl:flex-row xl:items-center xl:gap-2">
          <h4 className="text-base font-extrabold xl:text-lg">
            {formatCurrency(getCalculateProductTotalPrice(cartProduct))}
          </h4>
          {cartProduct.discountPercentage > 0 && (
            <h5 className="text-xs text-muted-foreground line-through xl:text-sm">
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
