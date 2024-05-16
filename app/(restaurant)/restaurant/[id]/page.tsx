import { db } from "@/app/_libs/prisma"
import { notFound } from "next/navigation"
import { Header } from "@/app/_components/common/header/header"
import { Breadcrumb } from "@/app/_components/common/breadcrumb/breadcrumb"
import { RestaurantContent } from "./_components/restaurant-content"
import { RestaurantCategorieProducts } from "./_components/restaurant-categorie-products"

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
  ])

  if (!categories || !restaurants || !restaurant) {
    return notFound()
  }

  return (
    <div>
      <div className="hidden xl:flex">
        <Header categories={categories} restaurants={restaurants} />
      </div>
      <main>
        <Breadcrumb param={restaurant.name} />
        <RestaurantContent restaurant={restaurant} />
        <RestaurantCategorieProducts restaurant={restaurant} />
      </main>
    </div>
  )
}

export default RestaurantPage
