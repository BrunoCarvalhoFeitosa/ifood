import { db } from "@/app/_lib/prisma"
import { Header } from "@/app/_components/common/header"
import { Search } from "@/app/_components/common/search"
import { CategoryList } from "@/app/_components/common/category-list"
import { ProductList } from "@/app/_components/common/product-list"
import { PromoBannerPizza } from "./_components/promo-banner"

const HomePage = async () => {
  const [categories, restaurants, brazilianFood, japaneseFood, fastFood] =
    await Promise.all([
      db.category.findMany({}),

      db.restaurant.findMany({}),

      db.product.findMany({
        where: {
          category: {
            name: "Comida Brasileira"
          }
        },
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
      }),

      db.product.findMany({
        where: {
          category: {
            name: "Comida Japonesa"
          }
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
      }),

      db.product.findMany({
        where: {
          category: {
            name: "Hambúrgueres"
          }
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
      })
    ])

  return (
    <div>
      <Header categories={categories} restaurants={restaurants} />
      <main className="min-h-[100dvh] w-full overflow-hidden">
        <div className="px-5 py-6">
          <Search />
        </div>
        <CategoryList />
        <PromoBannerPizza />
        <div className="mt-8 flex flex-col gap-14">
          <ProductList
            title="O melhor da culinária brasileira"
            products={brazilianFood}
          />
          <ProductList
            title="O melhor da culinária japonesa"
            products={japaneseFood}
          />
          <ProductList
            title="Desconto ativo por tempo limitado"
            products={fastFood}
          />
        </div>
      </main>
    </div>
  )
}

export default HomePage
