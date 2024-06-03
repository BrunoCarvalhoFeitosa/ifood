import db from "@/app/_libs/prisma"
import { Header } from "./_components/common/header"
import { notFound } from "next/navigation"
import { AccountIllustration } from "@/public/svgs/account-illustration"

const NotFoundPage = async () => {
  const [categories, restaurants] = await Promise.all([
    db.category.findMany({}),

    db.restaurant.findMany({})
  ])

  if (!categories || !restaurants) {
    return notFound()
  }

  return (
    <div>
      <Header categories={categories} restaurants={restaurants} />
      <main>
        <div className="flex w-full flex-col items-center justify-center gap-4 px-5">
          <div className="mx-auto w-2/3 text-center">
            <h1 className="text-6xl font-extrabold">404</h1>
            <p>Ooops, a página que você tentou acessar não existe.</p>
          </div>
          <div className="mx-auto w-full xl:w-2/5">
            <AccountIllustration />
          </div>
        </div>
      </main>
    </div>
  )
}

export default NotFoundPage
