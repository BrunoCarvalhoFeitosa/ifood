import db from "@/app/_libs/prisma"
import { Search } from "@/app/_components/common/search/search"
import { CategoryList } from "@/app/_components/common/category/category-list"
import { ProductList } from "@/app/_components/common/product/product-list"

const HomePage = async () => {
  const [brazilianFood, japaneseFood, fastFood] = await Promise.all([
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
    <main className="min-h-[100dvh] w-full overflow-hidden">
      <div className="px-5 py-6">
        <Search />
      </div>
      <div>
        <CategoryList />
      </div>
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
  )
}

export default HomePage
