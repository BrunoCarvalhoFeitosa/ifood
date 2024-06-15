"use client"
import { StarHalfIcon, StarIcon } from "lucide-react"

export const TestimonialsResume = () => {
  return (
    <div className="w-full">
      <div className="flex gap-8">
        <div>
          <div className="flex flex-col items-center justify-center gap-[2px]">
            <div className="text-4xl font-bold md:text-6xl">4.8</div>
            <div className="flex items-center">
              <StarIcon size={18} className="fill-red-600 stroke-red-600" />
              <StarIcon size={18} className="fill-red-600 stroke-red-600" />
              <StarIcon size={18} className="fill-red-600 stroke-red-600" />
              <StarIcon size={18} className="fill-red-600 stroke-red-600" />
              <StarHalfIcon size={18} className="fill-red-600 stroke-red-600" />
            </div>
          </div>
          <div className="mt-2 text-center text-xs text-[#5F6368] md:text-sm">
            13,2 mi avaliações
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="text-xs">5</div>
            <div className="h-4 w-full bg-zinc-100">
              <div className="h-full w-[90%] bg-red-600" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs">4</div>
            <div className="h-4 w-full bg-zinc-100">
              <div className="h-full w-[5%] bg-red-600" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs">3</div>
            <div className="h-4 w-full bg-zinc-100">
              <div className="h-full w-[3%] bg-red-600" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs">2</div>
            <div className="h-4 w-full bg-zinc-100">
              <div className="h-full w-[2%] bg-red-600" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs">1</div>
            <div className="h-4 w-full bg-zinc-100">
              <div className="h-full w-[1%] bg-red-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
