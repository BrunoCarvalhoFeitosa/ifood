import { notFound } from "next/navigation"
import db from "@/app/_libs/prisma"
import { Header } from "@/app/_components/common/header/header"
import { CategoryProductList } from "./_components/category-product-list"
import { CategoryRestaurantList } from "./_components/category-restaurant-list"
import { CategoryList } from "@/app/_components/common/category/category-list"

interface CategoryPageProps {
  params: {
    id: string
  }
}

const CategoryPage = async ({ params: { id } }: CategoryPageProps) => {
  const [categories, restaurants, category] = await Promise.all([
    db.category.findMany({}),

    db.restaurant.findMany({}),

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

  if (!categories || !restaurants || !category) {
    return notFound()
  }

  return (
    <div>
      <Header categories={categories} restaurants={restaurants} />
      <main>
        <CategoryList selectedCategoryId={id} />
        <CategoryProductList category={category} />
        <CategoryRestaurantList restaurants={category.restaurants} />
      </main>
    </div>
  )
}

export default CategoryPage
