import { Header } from "@/app/_components/common/header"
import { Search } from "@/app/_components/common/search"
import { CategoryList } from "@/app/_components/common/category-list"

const Home = () => {
  return (
    <main>
      <Header />
      <Search />
      <CategoryList />
    </main>
  )
}

export default Home
