"use client"
import { Product } from "@prisma/client"
import Image from "next/image"
import { Badge } from "@/app/_components/ui/badge"
import { ArrowDownIcon } from "lucide-react"

interface ProductListItemImageProps {
  product: Product
}

export const ProductListItemImage = ({
  product
}: ProductListItemImageProps) => {
  return (
    <div className="relative w-[200px] overflow-hidden md:w-[210px] lg:w-[220px]">
      <div className="h-[150px] w-full md:h-[180px]">
        <Image
          fill
          src={product.imageUrl}
          alt={product.name}
          className="cursor-zoom-in object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="absolute left-3 top-3 z-10">
        <Badge variant="default" className="flex items-center px-2 py-[2px]">
          <div>
            <ArrowDownIcon size={18} />
          </div>
          <div className="text-base">{product.discountPercentage}%</div>
        </Badge>
      </div>
    </div>
  )
}
