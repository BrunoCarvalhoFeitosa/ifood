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
              src={currentUser?.image as string}
              alt={currentUser?.name as string}
              title={currentUser?.name as string}
              className="bg-gray-100 object-cover grayscale"
            />
          </Avatar>
        </div>
        <div className="truncate text-white">
          <h2 className="w-3/4 truncate text-base font-extrabold md:w-full">
            {currentUser?.name}
          </h2>
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
