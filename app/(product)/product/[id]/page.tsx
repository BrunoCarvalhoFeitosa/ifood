import db from "@/app/_libs/prisma"
import { SlideButtonProvider } from "@/app/_contexts/SlideButtonContext"
import { notFound } from "next/navigation"
import { Header } from "@/app/_components/common/header"
import { Breadcrumb } from "@/app/_components/common/breadcrumb/breadcrumb"
import { ProductAddToCart } from "./_components/product-add-to-cart"
import { ProductContent } from "./_components/product-content"
import { RecommendedProductList } from "@/app/_components/common/recommended/recommended-product-list"

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
        restaurant: true,
        category: true
      }
    })
  ])

  if (!categories || !restaurants || !product) {
    return notFound()
  }

  return (
    <SlideButtonProvider>
      <div className="hidden xl:flex">
        <Header categories={categories} restaurants={restaurants} />
      </div>
      <main className="min-h-[100dvh] w-full overflow-hidden">
        <Breadcrumb param={product.name} />
        <ProductAddToCart product={product} />
        <ProductContent product={product} />
        <RecommendedProductList
          title="Tão deliciosos quanto"
          productName={product.name}
          categoryId={product.categoryId}
        />
      </main>
    </SlideButtonProvider>
  )
}

export default ProductPage
