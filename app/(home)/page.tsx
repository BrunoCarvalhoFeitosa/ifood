import { Header } from "@/app/_components/common/header"
import { Search } from "@/app/_components/common/search"
import { CategoryList } from "@/app/_components/common/category-list"
import { PromoBanner } from "./_components/promo-banner"
import { ProductList } from "../_components/common/product-list"

const Home = () => {
  return (
    <main className="min-h-[100dvh] overflow-hidden">
      <Header />
      <Search />
      <CategoryList />
      <PromoBanner />
      <ProductList />
    </main>
  )
}

export default Home
