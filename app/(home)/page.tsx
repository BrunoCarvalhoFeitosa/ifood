import { db } from "@/app/_lib/prisma"
import { Header } from "@/app/_components/common/header"
import { Search } from "@/app/_components/common/search"
import { CategoryList } from "@/app/_components/common/category-list"
import { PromoBannerPizza } from "./_components/promo-banner"
import { ProductList } from "../_components/common/product-list"

const Home = async () => {
  const products = await db.product.findMany({
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
  })

  return (
    <main className="min-h-[100dvh] overflow-hidden">
      <Header />
      <Search />
      <CategoryList />
      <PromoBannerPizza />
      <ProductList products={products} />
    </main>
  )
}

export default Home
