export const dynamic = "force-dynamic"
import { notFound } from "next/navigation"
import { Header } from "./_components/common/header"
import { AccountIllustration } from "@/public/svgs/account-illustration"

const NotFoundPage = async () => {
  const db = (await import("@/app/_libs/prisma")).default
  const categories = await db.category.findMany({})
  const restaurants = await db.restaurant.findMany({})

  if (!categories || !restaurants) {
    return notFound()
  }

  return (
    <div>
      <Header categories={categories} restaurants={restaurants} />
      <main className="py-14">
        <div className="flex w-full flex-col items-center justify-center gap-4 px-5">
          <div className="mx-auto w-full text-center md:w-2/3">
            <h1 className="text-2xl font-extrabold leading-none md:text-4xl">
              Página não encontrada
            </h1>
            <p className="text-sm md:text-base">
              Ooops, a página que você tentou acessar não foi encontrada ou não
              existe.
            </p>
          </div>
          <div className="mx-auto w-full xl:w-2/5">
            <div>
              <div className="flex justify-center md:hidden">
                <AccountIllustration width="330" height="245" />
              </div>
              <div className="hidden justify-center md:flex">
                <AccountIllustration width="660" height="448" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NotFoundPage
