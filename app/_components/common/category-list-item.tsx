"use client"
import { Category } from "@prisma/client"
import Image from "next/image"

interface CategoryListItemProps {
  category: Category
}

export const CategoryListItem = ({ category }: CategoryListItemProps) => {
  return (
    <div className="group flex h-14 min-w-max cursor-pointer items-center gap-2 rounded-full py-2 pl-[6px] pr-6 transition-all duration-300 ease-in hover:bg-primary/90 hover:text-white md:py-0">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-solid border-transparent bg-white p-1 group-hover:border-yellow-500 xl:group-hover:animate-bounce">
        <Image
          src={category.imageUrl}
          width={40}
          height={40}
          quality={100}
          alt={category.name}
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="font-semibold">{category.name}</h3>
      </div>
    </div>
  )
}
