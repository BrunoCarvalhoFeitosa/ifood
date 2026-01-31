export const dynamic = "force-dynamic"
import { Header } from "@/app/_components/common/header"
import { CheckoutTitle } from "./_components/checkout-title"
import { CheckoutProductsTable } from "./_components/checkout-products-table"
import { CheckoutSubmit } from "./_components/checkout-submit"
import { notFound } from "next/navigation"

const CheckoutPage = async () => {
  const db = (await import("@/app/_libs/prisma")).default
  const getCurrentUser = (await import("@/app/_actions/getCurrentUser")).default
  const currentUser = await getCurrentUser()
  const categories = await db.category.findMany({})
  const restaurants = await db.restaurant.findMany({})

  if (!categories || !restaurants) {
    return notFound()
  }

  return (
    <div>
      <Header categories={categories} restaurants={restaurants} />
      <main className="py-14">
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
