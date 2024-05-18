import db from "@/app/_libs/prisma"
import { notFound } from "next/navigation"
import { CategoryProductList } from "./_components/category-product-list"
import { CategoryRestaurantList } from "./_components/category-restaurant-list"
import { CategoryList } from "@/app/_components/common/category/category-list"

interface CategoryPageProps {
  params: {
    id: string
  }
}

const CategoryPage = async ({ params: { id } }: CategoryPageProps) => {
  const [category] = await Promise.all([
    db.category.findUnique({
      where: {
        id
      },
      include: {
        products: {
          include: {
            restaurant: {
              select: {
                name: true
              }
            }
          }
        },
        restaurants: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            deliveryFee: true,
            deliveryTimeMinutes: true
          }
        }
      }
    })
  ])

  if (!category) {
    return notFound()
  }

  return (
    <main>
      <CategoryList selectedCategoryId={id} />
      <CategoryProductList category={category} />
      <CategoryRestaurantList restaurants={category.restaurants} />
    </main>
  )
}

export default CategoryPage
