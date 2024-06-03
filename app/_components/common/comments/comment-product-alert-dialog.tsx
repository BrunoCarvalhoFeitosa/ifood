/* eslint-disable no-unused-vars */
"use client"
import { useState } from "react"
import { SafeUser } from "@/app/_types/SafeUser"
import { Flip, toast } from "react-toastify"
import { deleteProductComment } from "@/app/_actions/comment"
import { Loader } from "@/public/svgs/loader"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/app/_components/ui/alert-dialog"

interface CommentProductAlertDialogProps {
  currentUser: SafeUser | null
  commentId: string
  setIsConfirmDialogOpen: (isConfirmDialogOpen: boolean) => void
  isConfirmDialogOpen: boolean
}

export const CommentProductAlertDialog = ({
  currentUser,
  commentId,
  setIsConfirmDialogOpen,
  isConfirmDialogOpen
}: CommentProductAlertDialogProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDeleteComment = async () => {
    if (!currentUser?.id) return

    setIsLoading(true)

    try {
      if (currentUser) {
        await deleteProductComment(currentUser.id, commentId)

        toast("Comentário excluido com sucesso.", {
          type: "success",
          toastId: "success",
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Flip
        })
      }
    } catch (error) {
      console.error("Error while delete comment: ", error)

      toast("Erro ao remover comentário.", {
        type: "error",
        toastId: "error",
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Flip
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog
      open={isConfirmDialogOpen}
      onOpenChange={setIsConfirmDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja remover seu comentário?</AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Esta ação é irreversível, ao excluir seu comentário, ele será
            removido para sempre da nossa base de dados. Claramente você poderá
            adicionar um ou mais comentários novamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteComment} disabled={isLoading}>
            {isLoading && <Loader color="#FFF" width="40px" height="40px" />}
            Excluir meu comentário agora
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
