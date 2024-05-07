"use client"
import { Product } from "@prisma/client"
import { Badge } from "@/app/_components/ui/badge"
import { ArrowDownIcon, EqualNotIcon } from "lucide-react"

interface DiscountBadge {
  product: Product
}

export const ProductDiscountBadge = ({ product }: DiscountBadge) => {
  return (
    <Badge
      variant="default"
      className="flex items-center px-2 py-[2px] hover:bg-primary"
    >
      <div>
        {product.discountPercentage === 0 ? (
          <EqualNotIcon className="text-yellow-500" size={20} />
        ) : (
          <ArrowDownIcon className="text-yellow-500" size={20} />
        )}
      </div>
      <div className="text-sm md:text-base">{product.discountPercentage}%</div>
    </Badge>
  )
}
