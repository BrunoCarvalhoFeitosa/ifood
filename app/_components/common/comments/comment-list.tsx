"use client"
import { Fragment } from "react"
import { Comment } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
import { Skeleton } from "@/app/_components/ui/skeleton"
import { CommentItem } from "./comment-item"

interface CommentProductProps {
  currentUser: SafeUser | null
  comments: Comment[]
  productId: string | undefined
}

export const CommentList = ({
  currentUser,
  comments,
  productId
}: CommentProductProps) => {
  return (
    <Fragment>
      {comments.filter((comment) => comment.productId === productId).length >=
      1 ? (
        <section className="mt-10 md:ml-20">
          {comments
            .filter((comment) => comment.productId === productId)
            .map((comment) => (
              <CommentItem
                key={comment.id}
                currentUser={currentUser}
                commentId={comment.id}
                comment={comment}
              />
            ))}
        </section>
      ) : (
        <section className="mt-10 md:ml-20">
          <div className="mb-2">
            <h5 className="font-semibold">Seja o primeiro a comentar algo</h5>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-[60px] w-[60px] rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-[300px]" />
              <Skeleton className="h-3 w-[250px]" />
              <Skeleton className="h-3 w-[200px]" />
            </div>
          </div>
        </section>
      )}
    </Fragment>
  )
}
