"use client"
import { ProductList } from "@/app/_components/common/product-list"
import { Prisma } from "@prisma/client"

interface RestaurantCategorieProductsProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: {
        include: {
          products: {
            include: {
              restaurant: {
                select: {
                  id: true
                  name: true
                  imageUrl: true
                  deliveryFee: true
                  deliveryTimeMinutes: true
                  categories: true
                  products: true
                }
              }
            }
          }
        }
      }
      products: {
        take: 10
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
}

export const RestaurantCategorieProducts = ({
  restaurant
}: RestaurantCategorieProductsProps) => {
  return (
    <section className="mt-5 flex w-full flex-col-reverse gap-8">
      {restaurant.categories.map((category) => (
        <ProductList
          key={category.id}
          title={category.name}
          products={category.products}
        />
      ))}
    </section>
  )
}
