import db from "@/app/_libs/prisma"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import { notFound } from "next/navigation"
import { Header } from "@/app/_components/common/header"
import { Search } from "@/app/_components/common/search"
import { CategoryList } from "@/app/_components/common/category/category-list"
import { ProductList } from "@/app/_components/common/product/product-list"
import { Download } from "./_components/download"
import { TestimonialsComments } from "@/app/_components/common/testimonials"
import "swiper/css"
import "swiper/css/navigation"

const HomePage = async () => {
  const currentUser = await getCurrentUser()

  const categories = await db.category.findMany({})

  const restaurants = await db.restaurant.findMany({})

  const brazilianFood = await db.product.findMany({
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
  })

  const japaneseFood = await db.product.findMany({
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
          deliveryTimeMinutes: true
        }
      }
    }
  })

  const fastFood = await db.product.findMany({
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
          deliveryTimeMinutes: true
        }
      }
    }
  })

  const userFavoriteProducts = await db.userFavoriteProduct.findMany({
    where: {
      userId: currentUser?.id
    },
    include: {
      product: {
        include: {
          restaurant: true,
          category: true,
          favoritedByUsers: true
        }
      }
    }
  })

  const testimonials = await db.testimonials.findMany({})

  if (
    !categories ||
    !restaurants ||
    !brazilianFood ||
    !japaneseFood ||
    !fastFood
  ) {
    return notFound()
  }

  return (
    <div>
      <Header categories={categories} restaurants={restaurants} />
      <main className="min-h-[100dvh] w-full overflow-hidden">
        <div className="px-5 py-6">
          <Search />
        </div>
        <CategoryList />
        <div className="mt-8 flex flex-col gap-14">
          <ProductList
            title="O melhor da culinária brasileira"
            products={brazilianFood}
            currentUser={currentUser}
            userFavoriteProducts={userFavoriteProducts}
          />
          <ProductList
            title="O melhor da culinária japonesa"
            products={japaneseFood}
            currentUser={currentUser}
            userFavoriteProducts={userFavoriteProducts}
          />
          <ProductList
            title="Desconto ativo por tempo limitado"
            products={fastFood}
            currentUser={currentUser}
            userFavoriteProducts={userFavoriteProducts}
          />
        </div>
        <Download />
        <TestimonialsComments
          currentUser={currentUser}
          testimonials={testimonials}
        />
      </main>
    </div>
  )
}

export default HomePage
