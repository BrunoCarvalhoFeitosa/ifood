"use client"
import { Product } from "@prisma/client"
import {
  formatCurrency,
  getCalculateProductTotalPrice
} from "@/app/_helpers/price"
import { ProductDiscountBadge } from "@/app/_components/common/product-discount-badge"

interface ProductPriceProps {
  product: Product
}

export const ProductPrice = ({ product }: ProductPriceProps) => {
  return (
    <div className="flex items-start gap-2">
      <div>
        <h2 className="text-2xl font-extrabold md:text-3xl">
          {formatCurrency(getCalculateProductTotalPrice(product))}
        </h2>
        <h3 className="flex items-center gap-1 text-muted-foreground">
          <span>De:</span>
          <strong className="font-normal line-through">
            {formatCurrency(Number(product.price))}
          </strong>
        </h3>
      </div>
      <div>
        <ProductDiscountBadge product={product} />
      </div>
    </div>
  )
}
