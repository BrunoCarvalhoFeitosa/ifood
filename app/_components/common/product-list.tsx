import { db } from "@/app/_lib/prisma"
import { Button } from "@/app/_components/ui/button"
import { ProductListItem } from "./product-list-item"
import { ChevronRightIcon } from "lucide-react"

export const ProductList = async () => {
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
    <section className="w-full px-5 py-6 lg:pt-24">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold md:text-xl">
            Pedidos recomendados
          </h2>
        </div>
        <div>
          <Button
            type="button"
            variant="ghost"
            size="default"
            className="rounded-full p-0 text-sm font-semibold text-primary hover:bg-transparent hover:text-primary md:text-base"
          >
            <span>Ver todos</span>
            <span>
              <ChevronRightIcon />
            </span>
          </Button>
        </div>
      </div>
      <div className="custom-scrollbar flex items-center gap-5 overflow-x-auto py-3">
        {products.slice(13, 24).map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
