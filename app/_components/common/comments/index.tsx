"use client"
import { SafeUser } from "@/app/_types/SafeUser"
import { CommentsResume } from "./comments-resume"
import { CommentsForm } from "./comments-form"
import { CommentProduct } from "@prisma/client"
import { CommentProductList } from "./comment-product-list"
import { CommentRestaurantList } from "./comment-restaurant-list"
import { CommentMessage } from "./comment-message"

interface CommentsProps {
  type: "produto" | "restaurante"
  productId?: string
  restaurantId?: string
  currentUser: SafeUser | null
  comments: CommentProduct[]
}

export const Comments = ({
  type,
  productId,
  restaurantId,
  currentUser,
  comments
}: CommentsProps) => {
  return (
    <section className="w-full px-5 pb-14 pt-20 xl:w-[1200px] 2xl:w-2/4">
      <CommentsResume
        comments={comments}
        productId={productId}
        restaurantId={restaurantId}
      />
      <CommentsForm
        type={type}
        productId={productId}
        restaurantId={restaurantId}
        currentUser={currentUser}
      />
      <CommentProductList
        type={type}
        currentUser={currentUser}
        comments={comments}
        productId={productId}
      />
      <CommentRestaurantList
        type={type}
        currentUser={currentUser}
        comments={comments}
        restaurantId={restaurantId}
      />
      <CommentMessage type={type} currentUser={currentUser} />
    </section>
  )
}
