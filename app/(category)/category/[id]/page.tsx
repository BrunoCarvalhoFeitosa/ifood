export const dynamic = "force-dynamic"
import { notFound } from "next/navigation"
import { Header } from "@/app/_components/common/header"
import { CategoryProductList } from "./_components/category-product-list"
import { CategoryRestaurantList } from "./_components/category-restaurant-list"
import { CategoryList } from "@/app/_components/common/category/category-list"

interface CategoryPageProps {
  params: {
    id: string
  }
}

const CategoryPage = async ({ params: { id } }: CategoryPageProps) => {
  const db = (await import("@/app/_libs/prisma")).default
  const getCurrentUser = (await import("@/app/_actions/getCurrentUser")).default
  const currentUser = await getCurrentUser()
  const categories = await db.category.findMany({})
  const restaurants = await db.restaurant.findMany({})

  const category = await db.category.findUnique({
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

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: currentUser?.id
    },
    include: {
      restaurant: true
    }
  })

  const userFavoriteProducts = await db.userFavoriteProduct.findMany({
    where: {
      userId: currentUser?.id
    },
    include: {
      product: true
    }
  })

  if (!categories || !restaurants || !category || !userFavoriteRestaurants) {
    return notFound()
  }

  return (
    <div>
      <Header categories={categories} restaurants={restaurants} />
      <main className="pb-14">
        <CategoryList selectedCategoryId={id} />
        <CategoryProductList
          category={category}
          currentUser={currentUser}
          userFavoriteProducts={userFavoriteProducts}
        />
        <CategoryRestaurantList
          restaurants={category.restaurants}
          currentUser={currentUser}
          userFavoriteRestaurants={userFavoriteRestaurants}
        />
      </main>
    </div>
  )
}

export default CategoryPage
