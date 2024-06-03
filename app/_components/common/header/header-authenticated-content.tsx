"use client"
import { useState } from "react"
import { SafeUser } from "@/app/_types/SafeUser"
import { Button } from "@/app/_components/ui/button"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { HeaderSignOutAlertDialog } from "./header-sign-out-alert-dialog"

interface HeaderAuthenticatedContentProps {
  currentUser: SafeUser | null
}

export const HeaderAuthenticatedContent = ({
  currentUser
}: HeaderAuthenticatedContentProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false)

  return (
    <div>
      <div className="flex justify-between pt-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-3">
            <div>
              <Avatar>
                <AvatarImage
                  src={currentUser?.image as string}
                  alt={currentUser?.name as string}
                  title={currentUser?.name as string}
                  className="bg-gray-100 object-cover grayscale"
                />
              </Avatar>
            </div>
            <div>
              <h3 className="text-base font-semibold leading-none">
                {currentUser?.name}
              </h3>
              <h4 className="block text-sm text-muted-foreground">
                {currentUser?.email}
              </h4>
              <div>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="mt-1 h-fit w-fit px-2 py-1 text-sm text-primary"
                  onClick={() => setIsConfirmDialogOpen(true)}
                >
                  Finalizar sessão
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <HeaderSignOutAlertDialog
          isConfirmDialogOpen={isConfirmDialogOpen}
          setIsConfirmDialogOpen={setIsConfirmDialogOpen}
          currentUser={currentUser}
        />
      </div>
    </div>
  )
}
