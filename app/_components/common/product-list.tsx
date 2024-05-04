import { Prisma } from "@prisma/client"
import { Button } from "@/app/_components/ui/button"
import { ProductListItem } from "./product-list-item"
import { ChevronRightIcon } from "lucide-react"

interface ProductListProps {
  title: string
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
          imageUrl: true
          deliveryFee: true
          deliveryTimeMinutes: true
        }
      }
    }
  }>[]
}

export const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <section className="w-full px-5">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-extrabold md:text-xl">{title}</h2>
        </div>
        {products.length > 6 && (
          <div>
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="rounded-full p-0 text-lg font-extrabold text-primary hover:bg-transparent hover:text-primary md:text-base"
            >
              <span>Ver todos</span>
              <span>
                <ChevronRightIcon />
              </span>
            </Button>
          </div>
        )}
      </div>
      <div className="custom-scrollbar flex items-center gap-5 overflow-x-auto py-3">
        {products.slice(0, 12).map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
