export const dynamic = "force-dynamic"
import { notFound, redirect } from "next/navigation"
import { Header } from "@/app/_components/common/header"
import { AccountUserProfile } from "./_components/account-user-profile"
import { AccountMenuOptions } from "./_components/account-menu-options"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import db from "@/app/_libs/prisma"

const AccountPageLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return redirect("/sign-in")
  }

  const categories = await db.category.findMany()
  const restaurants = await db.restaurant.findMany()

  if (!categories || !restaurants) {
    return notFound()
  }

  return (
    <div>
      <Header categories={categories} restaurants={restaurants} />
      <main className="py-14">
        <div className="px-5">
          <h1 className="text-lg font-extrabold md:text-xl">Minha conta</h1>
          <p className="text-sm md:text-base">
            Edite seus dados pessoais, favorite pratos, restaurantes e acompanhe
            seus pedidos.
          </p>
        </div>
        <div className="flex w-full flex-col gap-12 px-5 pb-8 pt-10 lg:items-start xl:flex-row xl:gap-6">
          <div className="w-full bg-primary px-6 py-8 xl:w-2/6">
            <AccountUserProfile currentUser={currentUser} />
            <AccountMenuOptions />
          </div>
          <div className="w-full xl:w-[66.333333%]">{children}</div>
        </div>
      </main>
    </div>
  )
}

export default AccountPageLayout
