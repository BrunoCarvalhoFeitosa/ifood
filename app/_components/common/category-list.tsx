"use server"
import { db } from "@/app/_lib/prisma"
import { CategoryListItem } from "./category-list-item"

export const CategoryList = async () => {
  const categories = await db.category.findMany({})

  return (
    <section className="px-5 py-6">
      <div className="custom-scrollbar flex items-center justify-between gap-5 overflow-x-auto pb-3 md:justify-start md:overflow-x-visible">
        {categories.map((category) => (
          <CategoryListItem key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}
