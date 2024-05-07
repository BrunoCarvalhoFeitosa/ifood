"use client"
import { Category } from "@prisma/client"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/app/_components/ui/accordion"

interface HeaderMenuListDropdownProps {
  categories: Category[]
}

export const HeaderMenuListDropdown = ({
  categories
}: HeaderMenuListDropdownProps) => {
  return (
    <Accordion
      type="single"
      defaultValue="item-1"
      collapsible
      className="flex w-full flex-col gap-2"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Cardápio</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`}>
              {category.name}
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
