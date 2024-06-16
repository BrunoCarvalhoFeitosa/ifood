/* eslint-disable no-unused-vars */
"use client"
import { Flip, toast } from "react-toastify"
import { SafeUser } from "@/app/_types/SafeUser"
import { signOut } from "next-auth/react"
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

interface HeaderSignOutAlertDialogProps {
  setIsConfirmDialogOpen: (isConfirmDialogOpen: boolean) => void
  isConfirmDialogOpen: boolean
  currentUser: SafeUser | null
}

export const HeaderSignOutAlertDialog = ({
  setIsConfirmDialogOpen,
  isConfirmDialogOpen,
  currentUser
}: HeaderSignOutAlertDialogProps) => {
  const handleSignOutClick = async () => {
    if (!currentUser?.id) {
      return
    }

    toast("Sessão finalizada com sucesso.", {
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

    setTimeout(() => {
      signOut({
        callbackUrl: "/",
        redirect: true
      })
    }, 2500)
  }

  return (
    <AlertDialog
      open={isConfirmDialogOpen}
      onOpenChange={setIsConfirmDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja finalizar sua sessão?</AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Ao finalizar sua sessão, você será redirecionado à home page e
            poderá entrar em sua conta novamente quando quiser, estamos
            aguardando o seu retorno.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleSignOutClick}>
            Finalizar sessão agora
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
