import db from "@/app/_libs/prisma"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import { SlideButtonProvider } from "@/app/_contexts/SlideButtonContext"
import { notFound } from "next/navigation"
import { Header } from "@/app/_components/common/header"
import { Breadcrumb } from "@/app/_components/common/breadcrumb/breadcrumb"
import { RestaurantContent } from "./_components/restaurant-content"
import { RestaurantCategorieProducts } from "./_components/restaurant-categorie-products"

interface RestaurantPageProps {
  params: {
    id: string
  }
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const currentUser = await getCurrentUser()

  const [categories, restaurants, restaurant, userFavoriteRestaurants] =
    await Promise.all([
      db.category.findMany({}),

      db.restaurant.findMany({}),

      db.restaurant.findUnique({
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
      }),

      db.userFavoriteRestaurant.findMany({
        where: {
          userId: currentUser?.id
        },
        include: {
          restaurant: true
        }
      })
    ])

  if (!categories || !restaurants || !restaurant) {
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
        <RestaurantCategorieProducts restaurant={restaurant} />
      </main>
    </SlideButtonProvider>
  )
}

export default RestaurantPage
