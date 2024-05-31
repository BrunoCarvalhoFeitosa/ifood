"use client"
import { Prisma, UserFavoriteProduct } from "@prisma/client"
import { ProductListItem } from "./product-list-item"
import { SafeUser } from "@/app/_types/SafeUser"

interface ProductListProps {
  title: string
  products: Prisma.ProductGetPayload<{
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
  }>[]
  currentUser: SafeUser | null
  userFavoriteProducts: UserFavoriteProduct[]
}

export const ProductList = ({
  title,
  products,
  currentUser,
  userFavoriteProducts
}: ProductListProps) => {
  return (
    <section className="w-full px-5">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h2 className="text-lg font-extrabold md:text-xl">{title}</h2>
        </div>
      </div>
      <div className="custom-scrollbar flex items-center gap-5 overflow-x-auto py-3">
        {products.slice(0, 6).map((product) => (
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
