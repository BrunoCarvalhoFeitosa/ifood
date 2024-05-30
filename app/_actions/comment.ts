"use server"
import db from "@/app/_libs/prisma"
import { revalidatePath } from "next/cache"

export const createComment = async (
  userId: string,
  userName: string,
  userImage: string,
  content: string,
  productId?: string,
  restaurantId?: string
) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true }
    })

    if (!user) {
      throw new Error("User not founded.")
    }

    await db.comment.create({
      data: {
        userId,
        userName,
        userImage,
        content,
        productId,
        restaurantId
      }
    })

    revalidatePath("/product")
  } catch (error) {
    console.error("Error while add comment: ", error)
    throw error
  }
}

export const deleteComment = async (userId: string, commentId: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true }
    })

    if (!user) {
      throw new Error("User not founded.")
    }

    const comment = await db.comment.findUnique({
      where: {
        id: commentId
      }
    })

    if (!comment) {
      throw new Error("Comment not founded.")
    }

    await db.comment.delete({
      where: {
        id: commentId
      }
    })

    revalidatePath("/product")
  } catch (error) {
    console.error("Error while delete comment: ", error)
    throw error
  }
}
