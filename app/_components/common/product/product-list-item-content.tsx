"use client"
import { Prisma } from "@prisma/client"
import {
  formatCurrency,
  getCalculateProductTotalPrice
} from "@/app/_helpers/price"

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
}

export const ProductListItemContent = ({
  product
}: ProductListItemContentProps) => {
  return (
    <div>
      <div className="my-3 overflow-hidden">
        <div className="truncate">
          <h3 className="text-base font-semibold">{product.name}</h3>
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
      <div>
        <strong className="text-sm font-normal">
          {product.restaurant.name}
        </strong>
      </div>
    </div>
  )
}
