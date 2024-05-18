"use client"
import { SafeUser } from "@/app/_types/SafeUser"
import { signOut } from "next-auth/react"
import { Button } from "@/app/_components/ui/button"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { LogOutIcon } from "lucide-react"

interface HeaderAuthenticatedContentProps {
  currentUser?: SafeUser | null
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
                className="bg-gray-100 object-cover"
                src={currentUser?.image as string | undefined}
              />
            </Avatar>
          </div>
          <div>
            <h3 className="font-semibold">{currentUser?.name}</h3>
            <h4 className="block text-xs text-muted-foreground">
              {currentUser?.email}
            </h4>
          </div>
        </div>
        <div>
          <Button
            type="button"
            variant="default"
            size="icon"
            onClick={() => signOut()}
          >
            <LogOutIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  )
}
