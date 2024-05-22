"use client"
import { SafeUser } from "@/app/_types/SafeUser"
import { signOut } from "next-auth/react"
import { Button } from "@/app/_components/ui/button"
import { Avatar } from "@/app/_components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { LogOutIcon } from "lucide-react"

interface UserProfileProps {
  currentUser: SafeUser | null
}

export const AccountUserProfile = ({ currentUser }: UserProfileProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div>
          <Avatar>
            <AvatarImage
              className="bg-gray-100 object-cover"
              src={currentUser?.image as string | undefined}
            />
          </Avatar>
        </div>
        <div className="text-white">
          <h2 className="text-base font-extrabold">{currentUser?.name}</h2>
          <h3 className="text-sm">{currentUser?.email}</h3>
        </div>
      </div>
      <div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => signOut()}
        >
          <LogOutIcon />
        </Button>
      </div>
    </div>
  )
}
