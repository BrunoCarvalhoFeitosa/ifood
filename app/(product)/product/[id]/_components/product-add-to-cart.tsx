"use client"
import { Prisma } from "@prisma/client"
import { useScroll } from "@/app/_hooks/use-scroll"
import {
  formatCurrency,
  getCalculateProductTotalPrice
} from "@/app/_helpers/price"
import { Button } from "@/app/_components/ui/button"
import { Badge } from "@/app/_components/ui/badge"
import { ArrowDownIcon, EqualNotIcon } from "lucide-react"

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
  const scrolled = useScroll()

  return (
    <div>
      {scrolled && (
        <div className="fixed left-[50%] z-50 mx-auto w-full translate-x-[-50%] border-t border-solid bg-white px-5 py-4 shadow-md xl:top-0">
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
                  <div className="hidden xl:block">
                    <h4 className="text-sm text-muted-foreground line-through">
                      <span>{formatCurrency(Number(product.price))}</span>
                    </h4>
                  </div>
                  <div className="hidden xl:block">
                    <Badge
                      variant="default"
                      className="flex items-center px-2 py-[2px]"
                    >
                      <div>
                        {product.discountPercentage === 0 ? (
                          <EqualNotIcon className="text-yellow-500" size={20} />
                        ) : (
                          <ArrowDownIcon
                            className="text-yellow-500"
                            size={20}
                          />
                        )}
                      </div>
                      <div className="text-sm md:text-base">
                        {product.discountPercentage}%
                      </div>
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Button
                type="button"
                variant="default"
                className="h-[45px] w-full rounded-md text-base"
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
