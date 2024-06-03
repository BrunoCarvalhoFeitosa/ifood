"use client"
import { useEffect, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage
} from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { Button } from "@/app/_components/ui/button"
import { SearchHistoryAlertDialog } from "./search-history-alert-dialog"
import { ClockIcon, SearchIcon } from "lucide-react"

type SearchItem = {
  term: string
  timestamp: string
}

interface SearchProps {
  defaultValues?: z.infer<typeof formSchema>
}

const formSchema = z.object({
  term: z
    .string({
      message: "Por favor, busque pelo nome de um restaurante."
    })
    .min(2, {
      message: "O valor mínimo para busca é de 2 caracteres."
    })
    .max(50, {
      message: "O valor máximo para busca é de 50 caracteres."
    })
})

export const Search = ({ defaultValues }: SearchProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false)
  const [searchHistory, setSearchHistory] = useState<SearchItem[]>([])
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    let searchHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    )

    const searchItem = {
      term: values.term,
      timestamp: new Date().toISOString()
    }

    searchHistory.push(searchItem)

    if (searchHistory.length > 10) {
      searchHistory = searchHistory.slice(-10)
    }

    localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    setSearchHistory(searchHistory)

    router.push(`/restaurants?search=${values.term}`)
  }

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]")
    setSearchHistory(history)
  }, [])

  return (
    <div>
      <div>
        <Button
          type="button"
          variant="ghost"
          className="flex items-center gap-1 p-0 font-normal text-gray-400 hover:text-gray-400"
          onClick={() => setIsConfirmDialogOpen(true)}
        >
          <ClockIcon size={18} />
          Ver histórico de busca
        </Button>
      </div>
      <div className="mb-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative flex items-center gap-2"
          >
            <FormField
              name="term"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Pesquisar por restaurantes..."
                      className="h-12 w-full rounded-br-full rounded-tr-full border-transparent text-base font-semibold text-zinc-800 placeholder:font-normal placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 md:h-14"
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-bold" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="default"
              size="default"
              className="absolute right-0 top-0 h-12 w-12 rounded-full transition-opacity duration-300 hover:opacity-80 md:h-14 md:w-14"
            >
              <SearchIcon size={22} />
            </Button>
          </form>
        </Form>
      </div>
      <div>
        <SearchHistoryAlertDialog
          setIsConfirmDialogOpen={setIsConfirmDialogOpen}
          isConfirmDialogOpen={isConfirmDialogOpen}
          setSearchHistory={setSearchHistory}
          searchHistory={searchHistory}
        />
      </div>
    </div>
  )
}
