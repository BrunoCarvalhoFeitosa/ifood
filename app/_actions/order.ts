"use server"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  const db = (await import("@/app/_libs/prisma")).default
  await db.order.create({ data })

  revalidatePath("/account/orders")
}
