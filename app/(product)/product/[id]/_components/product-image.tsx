"use client"
import { Product } from "@prisma/client"
import { useRouter } from "next/navigation"
import {
  TransformComponent,
  TransformWrapper,
  useControls
} from "react-zoom-pan-pinch"
import Image from "next/image"
import { Button } from "@/app/_components/ui/button"
import {
  ChevronLeftIcon,
  FullscreenIcon,
  ZoomInIcon,
  ZoomOutIcon
} from "lucide-react"

interface ProductImageProps {
  product: Product
}

export const ProductImage = ({ product }: ProductImageProps) => {
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls()

    return (
      <div className="flex items-center gap-2">
        <Button
          type="button"
          title="Aumentar zoom"
          variant="ghost"
          size="sm"
          className="p-0 text-white/60 hover:text-primary"
          onClick={() => zoomIn()}
        >
          <ZoomInIcon />
        </Button>
        <Button
          type="button"
          title="Diminuir zoom"
          variant="ghost"
          size="sm"
          className="p-0 text-white/60 hover:text-primary"
          onClick={() => zoomOut()}
        >
          <ZoomOutIcon />
        </Button>
        <Button
          type="button"
          title="Resetar zoom"
          variant="ghost"
          size="sm"
          className="p-0 text-white/60 hover:text-primary"
          onClick={() => resetTransform()}
        >
          <FullscreenIcon />
        </Button>
      </div>
    )
  }

  const BackToHomeButton = () => {
    const router = useRouter()

    return (
      <Button
        type="button"
        variant="ghost"
        size="default"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-0 hover:bg-primary hover:text-white xl:hidden"
        onClick={() => router.push("/")}
      >
        <ChevronLeftIcon size={20} />
      </Button>
    )
  }

  return (
    <div className="flex w-full gap-[1px] lg:h-[600px] xl:w-[60%] 2xl:w-[50%]">
      <div className="hidden h-full w-[180px] flex-col gap-[2px] overflow-hidden xl:flex [&::-webkit-scrollbar]:hidden">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <Image
              key={index}
              src={product.imageUrl}
              alt={product.name}
              width={200}
              height={200}
              quality={100}
              className="h-[calc(100%/6)] w-[180px] cursor-zoom-in overflow-hidden object-cover brightness-[.50] hover:brightness-75"
            />
          ))}
      </div>
      <div className="relative h-[320px] flex-1 cursor-zoom-in bg-black md:h-[480px] lg:h-full">
        <TransformWrapper>
          <div className="absolute top-2 z-10 flex w-full items-start justify-between px-4 py-2">
            <BackToHomeButton />
            <Controls />
          </div>
          <div className="h-full">
            <TransformComponent>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={0}
                height={0}
                quality={100}
                sizes="100vw 100vh"
                className="h-full w-full object-cover brightness-[.50] hover:brightness-100"
              />
            </TransformComponent>
          </div>
        </TransformWrapper>
      </div>
    </div>
  )
}
