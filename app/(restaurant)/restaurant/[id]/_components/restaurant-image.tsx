"use client"
import { useContext } from "react"
import { CartContext } from "@/app/_contexts/Cart"
import { Restaurant } from "@prisma/client"
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
  ShoppingBagIcon,
  ZoomInIcon,
  ZoomOutIcon
} from "lucide-react"

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl">
}

export const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls()
    const { setIsCartOpen } = useContext(CartContext)

    return (
      <div className="flex items-center gap-3">
        <Button
          type="button"
          title="Abrir carrinho"
          variant="ghost"
          size="sm"
          className="flex p-0 text-white/60 hover:text-primary xl:hidden"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingBagIcon />
        </Button>
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
    <div className="w-full lg:h-[600px] xl:w-[50%]">
      <div className="relative h-[320px] flex-1 cursor-zoom-in bg-black md:h-[480px] lg:h-full">
        <TransformWrapper>
          <div className="absolute top-2 z-10 flex w-full items-start justify-between px-4 py-2">
            <BackToHomeButton />
            <Controls />
          </div>
          <TransformComponent>
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              width={0}
              height={0}
              quality={100}
              sizes="100vw 100vh"
              className="h-full w-full object-cover brightness-[.50]"
            />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  )
}
