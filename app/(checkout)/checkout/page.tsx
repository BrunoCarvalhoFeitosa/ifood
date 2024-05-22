import db from "@/app/_libs/prisma"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import { Header } from "@/app/_components/common/header"
import { CheckoutTitle } from "./_components/checkout-title"
import { CheckoutProductsTable } from "./_components/checkout-products-table"
import { CheckoutSubmit } from "./_components/checkout-submit"

const CheckoutPage = async () => {
  const [categories, restaurants, currentUser] = await Promise.all([
    db.category.findMany({}),

    db.restaurant.findMany({}),

    getCurrentUser()
  ])

  return (
    <div>
      <Header categories={categories} restaurants={restaurants} />
      <main>
        <div className="px-5">
          <CheckoutTitle />
          <CheckoutProductsTable />
          <CheckoutSubmit currentUser={currentUser} />
        </div>
      </main>
    </div>
  )
}

export default CheckoutPage
