import db from "@/app/_libs/prisma"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import { Header } from "@/app/_components/common/header"
import { CheckoutTitle } from "./_components/checkout-title"
import { CheckoutProductsTable } from "./_components/checkout-products-table"
import { CheckoutSubmit } from "./_components/checkout-submit"
import { notFound } from "next/navigation"

const CheckoutPage = async () => {
  const currentUser = await getCurrentUser()

  const categories = await db.category.findMany({})

  const restaurants = await db.restaurant.findMany({})

  if (!categories || !restaurants) {
    return notFound()
  }

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
