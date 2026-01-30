"use client"
import { useSlideButtonContext } from "@/app/_contexts/SlideButtonContext"
import { Button } from "@/app/_components/ui/button"

export const ProductSlideButton = () => {
  const { setIsOpen, isOpen } = useSlideButtonContext()

  return (
    <div className="mb-5 flex justify-center xl:hidden">
      <Button
        type="button"
        variant="ghost"
        className="h-2 w-20 rounded-full bg-zinc-300 p-0 hover:bg-zinc-300"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  )
}
