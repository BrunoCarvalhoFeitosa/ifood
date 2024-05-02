"use client"
import { Product } from "@prisma/client"
import { ProductPrice } from "./product-price"
import { ProductQuantity } from "./product-quantity"

interface ProductPriceProps {
  product: Product
}

export const ProductPriceWrapper = ({ product }: ProductPriceProps) => {
  return (
    <div className="flex items-start justify-between">
      <ProductPrice product={product} />
      <ProductQuantity />
    </div>
  )
}
