"use client"
import { Flip, toast } from "react-toastify"
import { Button } from "@/app/_components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/app/_components/ui/tooltip"
import { Share2Icon } from "lucide-react"

export const HeaderSharePage = () => {
  const handleSharePageClick = () => {
    navigator.clipboard.writeText(window.location.href)
    toast(
      "Link da página copiado, agora é só colar e compartilhar onde quiser.",
      {
        type: "success",
        toastId: "success",
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Flip
      }
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="p-0"
            onClick={handleSharePageClick}
          >
            <Share2Icon size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="text-foreground">
          <p>Compartilhar esta página</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
