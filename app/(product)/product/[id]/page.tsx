import db from "@/app/_libs/prisma"
import { ProductSlideButtonProvider } from "@/app/_contexts/ProductSlideButtonContext"
import { notFound } from "next/navigation"
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
  const [product] = await Promise.all([
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

  if (!product) {
    return notFound()
  }

  return (
    <ProductSlideButtonProvider>
      <main className="min-h-[100dvh] w-full overflow-hidden pb-36 xl:pb-36">
        <Breadcrumb param={product.name} />
        <ProductAddToCart product={product} />
        <ProductContent product={product} />
        <RecommendedProductList
          title="Tão deliciosos quanto"
          productName={product.name}
          categoryId={product.categoryId}
        />
      </main>
    </ProductSlideButtonProvider>
  )
}

export default ProductPage
