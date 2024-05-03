import { db } from "@/app/_lib/prisma"
import { notFound } from "next/navigation"
import { Header } from "@/app/_components/common/header"
import { RestaurantContent } from "./_components/restaurant-content"

interface RestaurantPageProps {
  params: {
    id: string
  }
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const [categories, restaurants, restaurant] = await Promise.all([
    db.category.findMany({}),

    db.restaurant.findMany({}),

    db.restaurant.findUnique({
      where: {
        id
      },
      include: {
        categories: {
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
                name: true
              }
            }
          }
        }
      }
    })
  ])

  if (!restaurant) {
    return notFound()
  }

  return (
    <div>
      <div className="hidden xl:flex">
        <Header categories={categories} restaurants={restaurants} />
      </div>
      <main>
        <RestaurantContent restaurant={restaurant} />
      </main>
    </div>
  )
}

export default RestaurantPage
