"use client"
import { useContext } from "react"
import { Prisma } from "@prisma/client"
import { useScroll } from "@/app/_hooks/use-scroll"
import { CartContext } from "@/app/_contexts/Cart"
import {
  formatCurrency,
  getCalculateProductTotalPrice
} from "@/app/_helpers/price"
import { Button } from "@/app/_components/ui/button"
import { CartDialog } from "@/app/_components/common/cart/cart-dialog"
import { ProductDiscountBadge } from "@/app/_components/common/product/product-discount-badge"

interface ProductAddToCartProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
          imageUrl: true
          deliveryFee: true
          deliveryTimeMinutes: true
        }
      }
    }
  }>
}

export const ProductAddToCart = ({ product }: ProductAddToCartProps) => {
  const { addProductToCart, products, setIsDifferentRestaurant } =
    useContext(CartContext)
  const scrolled = useScroll()

  const handleAddToCartClick = () => {
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId
    )

    if (hasDifferentRestaurantProduct) {
      setIsDifferentRestaurant(true)
      return
    } else {
      setIsDifferentRestaurant(false)
      addProductToCart(product)
    }
  }

  return (
    <div>
      <CartDialog product={product} />
      {scrolled && (
        <div className="fixed bottom-0 left-[50%] z-50 mx-auto w-full translate-x-[-50%] border-t border-solid bg-white px-5 py-4 shadow-md">
          <div className="mt-2 flex justify-between">
            <div className="flex-1 truncate pr-10">
              <div className="w-full">
                <h2 className="truncate text-lg font-extrabold">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold">
                    <span>
                      {formatCurrency(getCalculateProductTotalPrice(product))}
                    </span>
                  </h3>
                  {product.discountPercentage > 0 && (
                    <div className="flex items-center gap-2">
                      <div>
                        <h4 className="text-sm text-muted-foreground">
                          <span>De:</span>
                          <span className="line-through">
                            {formatCurrency(Number(product.price))}
                          </span>
                        </h4>
                      </div>
                      <div className="hidden xl:block">
                        <ProductDiscountBadge product={product} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <Button
                type="button"
                variant="default"
                className="h-[45px] w-full rounded-md text-base"
                onClick={() => handleAddToCartClick()}
              >
                <span>Comprar</span>
                <span className="ml-1 hidden xl:block">{product.name}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
