"use client"
import { Fragment } from "react"
import { CommentRestaurant } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
import { CommentRestaurantItem } from "./comment-restaurant-item"

interface CommentRestaurantListProps {
  type: "produto" | "restaurante"
  currentUser: SafeUser | null
  comments: CommentRestaurant[]
  restaurantId: string | undefined
}

export const CommentRestaurantList = ({
  type,
  currentUser,
  comments,
  restaurantId
}: CommentRestaurantListProps) => {
  return (
    <Fragment>
      {type === "restaurante" && (
        <div>
          {comments.filter((comment) => comment.restaurantId === restaurantId)
            .length >= 1 && (
            <section className="mt-10 md:ml-20">
              {comments
                .filter((comment) => comment.restaurantId === restaurantId)
                .map((comment) => (
                  <CommentRestaurantItem
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
