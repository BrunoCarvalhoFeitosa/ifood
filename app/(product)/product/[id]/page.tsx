export const dynamic = "force-dynamic"
import { SlideButtonProvider } from "@/app/_contexts/SlideButtonContext"
import { notFound } from "next/navigation"
import { Header } from "@/app/_components/common/header"
import { Breadcrumb } from "@/app/_components/common/breadcrumb/breadcrumb"
import { ProductAddToCart } from "./_components/product-add-to-cart"
import { ProductContent } from "./_components/product-content"
import { RecommendedProductList } from "@/app/_components/common/recommended/recommended-product-list"
import { Comments } from "@/app/_components/common/comments"

interface ProductPageProps {
  params: {
    id: string
  }
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const db = (await import("@/app/_libs/prisma")).default
  const getCurrentUser = (await import("@/app/_actions/getCurrentUser")).default
  const currentUser = await getCurrentUser()
  const categories = await db.category.findMany({})
  const restaurants = await db.restaurant.findMany({})

  const product = await db.product.findUnique({
    where: {
      id
    },
    include: {
      restaurant: true,
      category: true
    }
  })

  const userFavoriteProducts = await db.userFavoriteProduct.findMany({
    where: {
      userId: currentUser?.id
    },
    include: {
      product: true
    }
  })

  const comments = await db.commentProduct.findMany({})

  if (!categories || !restaurants || !product || !userFavoriteProducts) {
    return notFound()
  }

  return (
    <SlideButtonProvider>
      <div className="hidden xl:flex">
        <Header categories={categories} restaurants={restaurants} />
      </div>
      <main className="min-h-[100dvh] w-full overflow-hidden pb-10">
        <Breadcrumb param={product.name} />
        <ProductAddToCart product={product} />
        <ProductContent
          product={product}
          currentUser={currentUser}
          userFavoriteProducts={userFavoriteProducts}
        />
        <RecommendedProductList
          title="Tão deliciosos quanto"
          productName={product.name}
          categoryId={product.categoryId}
          currentUser={currentUser}
          userFavoriteProducts={userFavoriteProducts}
        />
        <Comments
          type="produto"
          productId={product.id}
          currentUser={currentUser}
          comments={comments}
        />
      </main>
    </SlideButtonProvider>
  )
}

export default ProductPage
