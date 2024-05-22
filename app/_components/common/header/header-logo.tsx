"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/app/_components/ui/button"
import { Logo } from "@/public/svgs/logo"

export const HeaderLogo = () => {
  const router = useRouter()

  return (
    <Button
      type="button"
      size="lg"
      variant="ghost"
      className="h-auto border-none px-0 outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
      onClick={() => router.push("/")}
    >
      <Logo width="100px" height="60px" />
    </Button>
  )
}
