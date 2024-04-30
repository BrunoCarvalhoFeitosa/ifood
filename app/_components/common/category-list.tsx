"use server"
import { db } from "@/app/_lib/prisma"
import { CategoryListItem } from "./category-list-item"

export const CategoryList = async () => {
  const categories = await db.category.findMany({})

  return (
    <section className="px-5 py-6">
      <div className="custom-scrollbar relative z-10 flex items-center justify-between gap-5 overflow-x-auto pb-3 md:justify-start 2xl:overflow-x-visible">
        {categories.map((category) => (
          <CategoryListItem key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}
