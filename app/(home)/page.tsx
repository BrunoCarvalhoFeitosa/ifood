import { db } from "@/app/_lib/prisma"
import { Header } from "@/app/_components/common/header"
import { Search } from "@/app/_components/common/search"
import { CategoryList } from "@/app/_components/common/category-list"
import { PromoBannerPizza } from "./_components/promo-banner"
import { ProductList } from "../_components/common/product-list"
import { RestaurantList } from "../_components/common/restaurant-list"

const Home = async () => {
  const [products, restaurants] = await Promise.all([
    db.product.findMany({
      where: {
        discountPercentage: {
          gt: 0
        }
      },
      include: {
        restaurant: {
          select: {
            name: true,
            imageUrl: true
          }
        }
      }
    }),

    await db.restaurant.findMany({
      take: 10
    })
  ])

  return (
    <main className="min-h-[100dvh] overflow-hidden">
      <Header />
      <Search />
      <CategoryList />
      <PromoBannerPizza />
      <ProductList
        title="Desconto ativo por tempo limitado"
        products={products}
      />
      <ProductList title="Seleção dos melhores da semana" products={products} />
      <RestaurantList
        title="Restaurantes recomendados"
        restaurants={restaurants}
      />
    </main>
  )
}

export default Home
