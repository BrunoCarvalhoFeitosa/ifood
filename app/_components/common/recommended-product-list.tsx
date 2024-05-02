import { db } from "@/app/_lib/prisma"
import { ProductListItem } from "./product-list-item"

interface RecommendedProductListProps {
  title: string
  productName?: string
  categoryId: string
}

export const RecommendedProductList = async ({
  title,
  productName,
  categoryId
}: RecommendedProductListProps) => {
  const recommendedProducts = await db.product.findMany({
    where: {
      categoryId
    },
    include: {
      restaurant: true
    }
  })

  return (
    <section className="w-full px-5 pt-10">
      <div>
        <h2 className="w-4/5 text-xl font-extrabold md:text-2xl">
          {title} {productName}
        </h2>
      </div>
      <div className="custom-scrollbar flex items-center gap-5 overflow-x-auto py-3">
        {recommendedProducts.slice(0, 6).map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
