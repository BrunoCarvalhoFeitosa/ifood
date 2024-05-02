"use client"
import { Product } from "@prisma/client"

interface ProductNameProps {
  product: Product
}

export const ProductName = ({ product }: ProductNameProps) => {
  return (
    <div className="mb-5">
      <h1 className="text-2xl font-extrabold md:text-3xl">{product.name}</h1>
    </div>
  )
}
