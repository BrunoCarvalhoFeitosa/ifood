"use client"
import { Prisma, UserFavoriteProduct } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
import { ProductListItem } from "@/app/_components/common/product/product-list-item"

interface CategoryProductListProps {
  category: Prisma.CategoryGetPayload<{
    include: {
      products: {
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
      }
    }
  }>
  currentUser: SafeUser | null
  userFavoriteProducts: UserFavoriteProduct[]
}

export const CategoryProductList = ({
  category,
  currentUser,
  userFavoriteProducts
}: CategoryProductListProps) => {
  return (
    <section className="px-5 py-6">
      <div className="mb-3">
        <h1 className="text-lg font-extrabold md:text-xl">{category.name}</h1>
      </div>
      <div className="custom-scrollbar flex items-center gap-x-5 gap-y-7 overflow-x-auto pb-3 xl:gap-y-14">
        {category.products.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            currentUser={currentUser}
            userFavoriteProducts={userFavoriteProducts}
          />
        ))}
      </div>
    </section>
  )
}
