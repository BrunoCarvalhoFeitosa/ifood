"use client"
import { Product } from "@prisma/client"

interface ProductDescriptionProps {
  product: Product
}

export const ProductDescription = ({ product }: ProductDescriptionProps) => {
  return (
    <div className="w-full">
      <div className="py-8">
        <h3 className="text-lg font-extrabold md:text-xl">Sobre</h3>
        <p className="text-sm md:text-base">{product.description}</p>
      </div>
    </div>
  )
}
