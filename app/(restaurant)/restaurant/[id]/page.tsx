import db from "@/app/_libs/prisma"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import { SlideButtonProvider } from "@/app/_contexts/SlideButtonContext"
import { notFound } from "next/navigation"
import { Header } from "@/app/_components/common/header"
import { Breadcrumb } from "@/app/_components/common/breadcrumb/breadcrumb"
import { RestaurantContent } from "./_components/restaurant-content"
import { RestaurantCategorieProducts } from "./_components/restaurant-categorie-products"
import { Comments } from "@/app/_components/common/comments"

interface RestaurantPageProps {
  params: {
    id: string
  }
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const currentUser = await getCurrentUser()

  const categories = await db.category.findMany({})

  const restaurants = await db.restaurant.findMany({})

  const restaurant = await db.restaurant.findUnique({
    where: {
      id
    },
    include: {
      categories: {
        where: {
          NOT: {
            name: "Sucos e refrigerantes"
          }
        },
        include: {
          products: {
            where: {
              restaurantId: id
            },
            include: {
              restaurant: {
                select: {
                  id: true,
                  name: true,
                  imageUrl: true,
                  deliveryFee: true,
                  deliveryTimeMinutes: true,
                  categories: true,
                  products: true
                }
              }
            }
          }
        }
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
              imageUrl: true,
              deliveryFee: true,
              deliveryTimeMinutes: true
            }
          }
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

  const comments = await db.commentRestaurant.findMany({})

  if (!categories || !restaurants || !restaurant || !userFavoriteRestaurants) {
    return notFound()
  }

  return (
    <SlideButtonProvider>
      <div className="hidden xl:flex">
        <Header categories={categories} restaurants={restaurants} />
      </div>
      <main>
        <Breadcrumb param={restaurant.name} />
        <RestaurantContent
          restaurant={restaurant}
          currentUser={currentUser}
          userFavoriteRestaurants={userFavoriteRestaurants}
        />
        <RestaurantCategorieProducts
          restaurant={restaurant}
          currentUser={currentUser}
          userFavoriteProducts={userFavoriteProducts}
        />
        <Comments
          type="restaurante"
          restaurantId={restaurant.id}
          currentUser={currentUser}
          comments={comments}
        />
      </main>
    </SlideButtonProvider>
  )
}

export default RestaurantPage
