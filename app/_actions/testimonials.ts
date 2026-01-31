"use server"
import { revalidatePath } from "next/cache"

export const createTestimonialComment = async (
  userId: string,
  userName: string,
  userImage: string,
  content: string
) => {
  try {
    const db = (await import("@/app/_libs/prisma")).default

    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true }
    })

    if (!user) {
      throw new Error("User not founded.")
    }

    await db.testimonials.create({
      data: {
        userId,
        userName,
        userImage,
        content
      }
    })

    revalidatePath("/")
  } catch (error) {
    console.error("Error while add testimonials: ", error)
    throw error
  }
}
