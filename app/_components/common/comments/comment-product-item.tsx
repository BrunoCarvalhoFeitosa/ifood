"use client"
import { useState } from "react"
import { CommentProduct } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/app/_libs/utils"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { Button } from "@/app/_components/ui/button"
import { CommentProductAlertDialog } from "./comment-product-alert-dialog"
import { ClockIcon, Trash2Icon } from "lucide-react"

interface CommentProductItemProps {
  currentUser: SafeUser | null
  commentId: string
  comment: CommentProduct
}

export const CommentProductItem = ({
  currentUser,
  commentId,
  comment
}: CommentProductItemProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false)

  return (
    <div className="w-full">
      <div className="flex w-full gap-6 border-b border-gray-100 py-5">
        <div className="flex flex-col items-center">
          <div>
            <Avatar>
              <AvatarImage
                src={comment.userImage}
                alt={comment.userName}
                title={comment.userName}
                className="bg-gray-100 object-cover grayscale"
              />
            </Avatar>
          </div>
          <div className="flex w-20 justify-center">
            <h5 className="truncate text-sm font-bold">
              {comment.userName.split(" ")[0]}
            </h5>
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-end gap-1">
            <div className="text-gray-300">
              <ClockIcon size={18} />
            </div>
            <div>
              <strong className="text-xs font-normal text-gray-300 md:text-sm">
                {format(comment.createdAt, "dd 'de' MMMM yyyy 'às' HH:mm", {
                  locale: ptBR
                })}
              </strong>
            </div>
          </div>
          <div>
            <p className="text-sm md:text-base">{comment.content}</p>
          </div>
          {currentUser?.id === comment.userId && (
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsConfirmDialogOpen(true)}
                className={cn(
                  "flex items-center gap-1 p-0 text-primary transition-all duration-100 hover:scale-105 hover:text-primary hover:opacity-100",
                  isConfirmDialogOpen && "scale-105"
                )}
              >
                <Trash2Icon size={17} />
                <div className="text-sm font-bold">Excluir comentário</div>
              </Button>
            </div>
          )}
        </div>
      </div>
      <CommentProductAlertDialog
        currentUser={currentUser}
        commentId={commentId}
        setIsConfirmDialogOpen={setIsConfirmDialogOpen}
        isConfirmDialogOpen={isConfirmDialogOpen}
      />
    </div>
  )
}
