"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { FolderOutputIcon } from "lucide-react"

interface BreadcumbProps {
  param: string
}

export const Breadcrumb = ({ param }: BreadcumbProps) => {
  const pathname = usePathname()
  const path = pathname?.split("/")

  return (
    <div className="hidden items-center gap-3 px-5 text-sm font-semibold text-muted-foreground xl:flex">
      <Link href="/">
        <div className="flex items-center">
          <FolderOutputIcon size={22} />
        </div>
      </Link>
      <span>/</span>
      {path && (
        <Link href={`/${path[1]}/${path.pop()}`}>
          <span>{param}</span>
        </Link>
      )}
    </div>
  )
}
