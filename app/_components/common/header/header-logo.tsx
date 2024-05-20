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
      className="h-auto px-0"
      onClick={() => router.push("/")}
    >
      <Logo width="100px" height="60px" />
    </Button>
  )
}
