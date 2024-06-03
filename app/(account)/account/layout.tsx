import db from "@/app/_libs/prisma"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import { notFound, redirect } from "next/navigation"
import { Header } from "@/app/_components/common/header"
import { AccountUserProfile } from "./_components/account-user-profile"
import { AccountMenuOptions } from "./_components/account-menu-options"

const AccountPageLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [currentUser, categories, restaurants] = await Promise.all([
    getCurrentUser(),

    db.restaurant.findMany({}),

    db.restaurant.findMany({})
  ])

  if (!currentUser) {
    return redirect("/sign-in")
  }

  if (!categories || !restaurants) {
    return notFound()
  }

  return (
    <div>
      <Header categories={categories} restaurants={restaurants} />
      <main>
        <div className="px-5 pt-10">
          <h1 className="text-lg font-extrabold md:text-xl">Minha conta</h1>
          <p className="text-sm">
            Edite seus dados pessoais, veja, adicione ou remova os produtos e
            restaurantes que você favoritou.
          </p>
        </div>
        <div className="flex w-full flex-col gap-12 px-5 pb-8 pt-10 lg:flex-row">
          <div className="w-full rounded-2xl bg-primary px-6 py-8 lg:w-2/6">
            <AccountUserProfile currentUser={currentUser} />
            <AccountMenuOptions />
          </div>
          <div className="w-full lg:w-[66.333333%]">{children}</div>
        </div>
      </main>
    </div>
  )
}

export default AccountPageLayout
