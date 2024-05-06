"use client"
import { Prisma } from "@prisma/client"
import { ProductListItem } from "@/app/_components/common/product-list-item"

interface CategoryProductListProps {
  category: Prisma.CategoryGetPayload<{
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true
            }
          }
        }
      }
    }
  }>
}

export const CategoryProductList = ({ category }: CategoryProductListProps) => {
  return (
    <section className="px-5 py-6">
      <div className="mb-5">
        <h1 className="text-2xl font-extrabold">{category.name}</h1>
      </div>
      <div className="custom-scrollbar flex items-center gap-x-5 gap-y-7 overflow-x-auto pb-3 xl:gap-y-14">
        {category.products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
