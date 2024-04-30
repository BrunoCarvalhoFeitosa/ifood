import { Header } from "@/app/_components/common/header"
import { Search } from "@/app/_components/common/search"
import { CategoryList } from "@/app/_components/common/category-list"
import { PromoBanner } from "./_components/promo-banner"

const Home = () => {
  return (
    <main className="min-h-[100dvh] overflow-hidden">
      <Header />
      <Search />
      <CategoryList />
      <PromoBanner />
    </main>
  )
}

export default Home
