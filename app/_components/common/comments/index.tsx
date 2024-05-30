"use client"
import { SafeUser } from "@/app/_types/SafeUser"
import { CommentsResume } from "./comments-resume"
import { CommentsForm } from "./comments-form"
import { Comment } from "@prisma/client"
import { CommentList } from "./comment-list"

interface CommentsProps {
  type: "produto" | "restaurante"
  productId?: string
  currentUser: SafeUser | null
  comments: Comment[]
}

export const Comments = async ({
  type,
  productId,
  currentUser,
  comments
}: CommentsProps) => {
  return (
    <section className="w-full px-5 pb-14 pt-20 xl:w-[1200px] 2xl:w-2/4">
      <CommentsResume comments={comments} productId={productId} />
      <CommentsForm
        type={type}
        productId={productId}
        currentUser={currentUser}
      />
      <CommentList
        currentUser={currentUser}
        comments={comments}
        productId={productId}
      />
    </section>
  )
}
