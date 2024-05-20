import db from "@/app/_libs/prisma"
import { Header } from "@/app/_components/common/header"
import { CheckoutTitle } from "./_components/CheckoutTitle"
import { CheckoutProductsTable } from "./_components/checkout-products-table"

const CheckoutPage = async () => {
  const [categories, restaurants] = await Promise.all([
    db.category.findMany({}),

    db.restaurant.findMany({})
  ])

  return (
    <div>
      <Header categories={categories} restaurants={restaurants} />
      <main>
        <div className="px-5">
          <CheckoutTitle />
          <CheckoutProductsTable />
        </div>
      </main>
    </div>
  )
}

export default CheckoutPage
