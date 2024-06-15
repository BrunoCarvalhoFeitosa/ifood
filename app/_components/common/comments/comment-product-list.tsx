"use client"
import { Fragment } from "react"
import { CommentProduct } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
import { CommentProductItem } from "./comment-product-item"

interface CommentProductListProps {
  type: "produto" | "restaurante"
  currentUser: SafeUser | null
  comments: CommentProduct[]
  productId: string | undefined
}

export const CommentProductList = ({
  type,
  currentUser,
  comments,
  productId
}: CommentProductListProps) => {
  return (
    <Fragment>
      {type === "produto" && (
        <div>
          {comments.filter((comment) => comment.productId === productId)
            .length >= 1 && (
            <section className="mt-10 md:ml-28">
              {comments
                .filter((comment) => comment.productId === productId)
                .map((comment) => (
                  <CommentProductItem
                    key={comment.id}
                    currentUser={currentUser}
                    commentId={comment.id}
                    comment={comment}
                  />
                ))}
            </section>
          )}
        </div>
      )}
    </Fragment>
  )
}
