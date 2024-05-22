import db from "@/app/_libs/prisma"
import { notFound } from "next/navigation"
import { Header } from "@/app/_components/common/header"
import { CategoryProductList } from "./_components/category-product-list"
import { CategoryRestaurantList } from "./_components/category-restaurant-list"
import { CategoryList } from "@/app/_components/common/category/category-list"
import getCurrentUser from "@/app/_actions/getCurrentUser"

interface CategoryPageProps {
  params: {
    id: string
  }
}

const CategoryPage = async ({ params: { id } }: CategoryPageProps) => {
  const currentUser = await getCurrentUser()

  const [
    categories,
    restaurants,
    category,
    userFavoriteRestaurants,
    userFavoriteProducts
  ] = await Promise.all([
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
    }),

    db.userFavoriteRestaurant.findMany({
      where: {
        userId: currentUser?.id
      },
      include: {
        restaurant: true
      }
    }),

    db.userFavoriteProduct.findMany({
      where: {
        userId: currentUser?.id
      },
      include: {
        product: true
      }
    })
  ])

  if (!categories || !restaurants || !category || !userFavoriteRestaurants) {
    return notFound()
  }

  return (
    <div>
      <Header categories={categories} restaurants={restaurants} />
      <main>
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
