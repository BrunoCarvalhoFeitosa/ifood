"use client"
import { signOut } from "next-auth/react"
import { SafeUser } from "@/app/_types/SafeUser"
import { Button } from "@/app/_components/ui/button"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"

interface HeaderAuthenticatedContentProps {
  currentUser: SafeUser | null
}

export const HeaderAuthenticatedContent = ({
  currentUser
}: HeaderAuthenticatedContentProps) => {
  return (
    <div className="flex justify-between pt-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
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
            <h3 className="text-base font-semibold">{currentUser?.name}</h3>
            <h4 className="block text-sm text-muted-foreground">
              {currentUser?.email}
            </h4>
            <div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-fit w-fit text-sm"
                onClick={() => signOut()}
              >
                Sair da conta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
