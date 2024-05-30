"use client"
import { Prisma, UserFavoriteProduct } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
import {
  formatCurrency,
  getCalculateProductTotalPrice
} from "@/app/_helpers/price"
import { Flip, toast } from "react-toastify"
import { toggleFavoriteProduct } from "@/app/_actions/product"
import { Button } from "@/app/_components/ui/button"
import { ChefHatIcon, HeartIcon } from "lucide-react"

interface ProductListItemContentProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
          imageUrl: true
        }
      }
    }
  }>
  currentUser: SafeUser | null
  userFavoriteProducts: UserFavoriteProduct[]
}

export const ProductListItemContent = ({
  product,
  currentUser,
  userFavoriteProducts
}: ProductListItemContentProps) => {
  const isFavorite =
    userFavoriteProducts &&
    userFavoriteProducts.some((fav) => fav.productId === product.id)

  const handleFavoriteClick = async () => {
    if (!currentUser?.id) return

    try {
      await toggleFavoriteProduct(currentUser.id, product.id)

      if (isFavorite) {
        toast("Produto removido dos favoritos com sucesso.", {
          type: "success",
          toastId: "success-remove-fav",
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Flip
        })
      } else {
        toast("Produto favoritado com sucesso.", {
          type: "success",
          toastId: "success-add-fav",
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Flip
        })
      }
    } catch (error) {
      toast.error("Error while favorite product.")
    }
  }
  return (
    <div>
      <div className="my-3 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="truncate">
            <h3 className="text-base font-semibold">{product.name}</h3>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <h4 className="text-lg font-bold lg:text-xl">
            {formatCurrency(getCalculateProductTotalPrice(product))}
          </h4>
          {product.discountPercentage > 0 && (
            <h5 className="text-xs text-muted-foreground line-through lg:text-sm">
              {formatCurrency(Number(product.price))}
            </h5>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-primary">
          <Button
            type="button"
            title="Favoritar"
            variant="ghost"
            size="sm"
            className={`p-0 text-primary hover:text-primary`}
            onClick={handleFavoriteClick}
          >
            {isFavorite && currentUser ? (
              <HeartIcon fill="#FF0000" />
            ) : (
              <HeartIcon />
            )}
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <div>
              <ChefHatIcon className="text-primary" />
            </div>
            <div className="text-sm text-muted-foreground">
              {product.restaurant.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
