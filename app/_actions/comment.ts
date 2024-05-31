"use server"
import db from "@/app/_libs/prisma"
import { revalidatePath } from "next/cache"

export const createProductComment = async (
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

    await db.commentProduct.create({
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

export const deleteProductComment = async (
  userId: string,
  commentId: string
) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true }
    })

    if (!user) {
      throw new Error("User not founded.")
    }

    const comment = await db.commentProduct.findUnique({
      where: {
        id: commentId
      }
    })

    if (!comment) {
      throw new Error("Comment not founded.")
    }

    await db.commentProduct.delete({
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

export const createRestaurantComment = async (
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

    await db.commentRestaurant.create({
      data: {
        userId,
        userName,
        userImage,
        content,
        productId,
        restaurantId
      }
    })

    revalidatePath("/restaurant")
  } catch (error) {
    console.error("Error while add comment: ", error)
    throw error
  }
}

export const deleteRestaurantComment = async (
  userId: string,
  restaurantId: string
) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true }
    })

    if (!user) {
      throw new Error("User not founded.")
    }

    const comment = await db.commentRestaurant.findUnique({
      where: {
        id: restaurantId
      }
    })

    if (!comment) {
      throw new Error("Comment not founded.")
    }

    await db.commentProduct.delete({
      where: {
        id: restaurantId
      }
    })

    revalidatePath("/restaurant")
  } catch (error) {
    console.error("Error while delete comment: ", error)
    throw error
  }
}
