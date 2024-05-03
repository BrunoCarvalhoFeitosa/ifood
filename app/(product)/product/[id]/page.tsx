import { ProductSlideButtonProvider } from "@/app/_contexts/ProductSlideButtonContext"
import { notFound } from "next/navigation"
import { db } from "@/app/_lib/prisma"
import { Header } from "@/app/_components/common/header"
import { ProductContent } from "./_components/product-content"
import { RecommendedProductList } from "@/app/_components/common/recommended-product-list"

interface ProductPageProps {
  params: {
    id: string
  }
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const [categories, restaurants, product] = await Promise.all([
    db.category.findMany({}),

    db.restaurant.findMany({}),

    db.product.findUnique({
      where: {
        id
      },
      include: {
        restaurant: true
      }
    })
  ])

  if (!product) {
    return notFound()
  }

  return (
    <ProductSlideButtonProvider>
      <div className="hidden xl:flex">
        <Header categories={categories} restaurants={restaurants} />
      </div>
      <main className="min-h-[100dvh] w-full overflow-hidden pb-24">
        <ProductContent product={product} />
        <RecommendedProductList
          title="Tão deliciosos quanto o"
          productName={product.name}
          categoryId={product.categoryId}
        />
      </main>
    </ProductSlideButtonProvider>
  )
}

export default ProductPage
