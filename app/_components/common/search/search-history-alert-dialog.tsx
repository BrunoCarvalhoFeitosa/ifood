/* eslint-disable no-unused-vars */
"use client"
import { Flip, toast } from "react-toastify"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/app/_components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/app/_components/ui/dialog"
import { ClockIcon, PackageSearchIcon, Trash2Icon } from "lucide-react"

type SearchItem = {
  term: string
  timestamp: string
}

interface SearchHistoryAlertDialogProps {
  setIsConfirmDialogOpen: (isConfirmDialogOpen: boolean) => void
  isConfirmDialogOpen: boolean
  searchHistory: SearchItem[]
  setSearchHistory: (searchHistory: SearchItem[]) => void
}

export const SearchHistoryAlertDialog = ({
  setIsConfirmDialogOpen,
  isConfirmDialogOpen,
  setSearchHistory,
  searchHistory
}: SearchHistoryAlertDialogProps) => {
  const handleDeleteSearchItem = (term: string) => {
    const updatedHistory = searchHistory.filter((item) => item.term !== term)

    setSearchHistory(updatedHistory)
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory))

    toast("Histórico de busca removido com sucesso.", {
      type: "success",
      toastId: "success",
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Flip
    })

    if (!updatedHistory.length) {
      setIsConfirmDialogOpen(false)
    }
  }

  return (
    <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
      <DialogContent className="flex h-full flex-col">
        <DialogHeader>
          <DialogTitle>
            Deseja remover algum item do seu histórico de busca?
          </DialogTitle>
          <DialogDescription>
            A ação de remover um item do seu histórico de busca poderá
            dificultar um pouco sua experiência, o histórico é só uma maneira de
            facilitar a sua navegação, por exemplo, ao ter buscado pelo nome de
            um restaurante que você já efetuou uma compra, ele ficará registrado
            neste histórico, caso você tenha esquecido o nome do restaurante,
            este mecanismo lhe lembrará.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 h-full overflow-y-auto">
          <div className="h-full">
            {searchHistory.length >= 1 ? (
              <ul className="flex flex-col gap-4">
                {searchHistory.map((search: SearchItem) => (
                  <li key={search.term}>
                    <div className="flex items-center justify-between xl:justify-start">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div>
                          <ClockIcon size={22} />
                        </div>
                        <div className="text-sm font-semibold md:text-base xl:min-w-44">
                          {search.term}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="text-xs md:text-base">
                          {format(
                            search.timestamp,
                            "dd 'de' MMMM yyyy 'às' HH:mm",
                            {
                              locale: ptBR
                            }
                          )}
                        </div>
                        <div>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteSearchItem(search.term)}
                          >
                            <Trash2Icon size={20} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex h-[calc(100%-80px)] flex-col items-center justify-center">
                <div>
                  <PackageSearchIcon size={50} />
                </div>
                <div>
                  <h4 className="text-base font-semibold">
                    Você não buscou por nenhum termo ainda.
                  </h4>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
