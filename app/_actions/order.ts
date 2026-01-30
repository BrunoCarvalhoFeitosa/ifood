export const dynamic = "force-dynamic"
import db from "@/app/_libs/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  await db.order.create({ data })
  revalidatePath("/account/orders")
}
