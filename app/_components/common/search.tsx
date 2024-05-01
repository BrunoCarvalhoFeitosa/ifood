"use client"
import { Input } from "@/app/_components/ui/input"
import { Button } from "@/app/_components/ui/button"
import { SearchIcon } from "lucide-react"

export const Search = () => {
  return (
    <div className="px-5 py-6">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Pesquisar por restaurantes..."
          className="h-12 w-full border-transparent text-base font-semibold text-zinc-800 placeholder:font-normal placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 md:h-14"
        />
        <Button
          type="button"
          variant="default"
          size="default"
          className="h-12 w-12 rounded-full transition-opacity duration-300 hover:opacity-80 md:h-14 md:w-14"
        >
          <SearchIcon size={22} />
        </Button>
      </div>
    </div>
  )
}
