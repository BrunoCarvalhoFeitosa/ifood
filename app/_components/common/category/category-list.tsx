"use server"
import db from "@/app/_libs/prisma"
import Link from "next/link"
import { CategoryListItem } from "./category-list-item"

interface CategoryListProps {
  selectedCategoryId?: string
}

export const CategoryList = async ({
  selectedCategoryId
}: CategoryListProps) => {
  const categories = await db.category.findMany({})

  return (
    <section className="px-5 py-6">
      <div className="custom-scrollbar relative z-10 flex items-center justify-between gap-3 overflow-x-auto pb-3 md:justify-start 2xl:overflow-x-visible">
        {categories
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((category) => (
            <Link key={category.id} href={`/category/${category.id}`}>
              <CategoryListItem
                key={category.id}
                category={category}
                selectedCategoryId={selectedCategoryId ?? categories[0].id}
              />
            </Link>
          ))}
      </div>
    </section>
  )
}
