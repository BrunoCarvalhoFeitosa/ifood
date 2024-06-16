"use client"
import Link from "next/link"
import { Button } from "@/app/_components/ui/button"
import { LogInIcon } from "lucide-react"

export const HeaderUnauthenticatedContent = () => {
  return (
    <div className="mt-8 flex items-center justify-between gap-3 border-b border-solid pb-3">
      <div className="text-lg font-semibold">Olá. Faça seu login!</div>
      <Link href="/sign-in" className="w-fit">
        <Button type="button" variant="default" size="icon">
          <LogInIcon size={20} />
        </Button>
      </Link>
    </div>
  )
}
