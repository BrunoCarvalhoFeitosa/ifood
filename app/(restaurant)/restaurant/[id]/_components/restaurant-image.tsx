"use client"
import { useContext } from "react"
import { CartContext } from "@/app/_contexts/Cart"
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
import { useRouter } from "next/navigation"
import { toggleFavoriteRestaurant } from "@/app/_actions/restaurant"
import { Flip, toast } from "react-toastify"
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
  HeartIcon,
  Share2Icon,
  ShoppingBagIcon,
  ZoomInIcon,
  ZoomOutIcon
} from "lucide-react"

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl" | "id">
  currentUser: SafeUser | null
  userFavoriteRestaurants: UserFavoriteRestaurant[]
}

export const RestaurantImage = ({
  restaurant,
  currentUser,
  userFavoriteRestaurants
}: RestaurantImageProps) => {
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls()
    const { setIsCartOpen } = useContext(CartContext)

    const isFavorite = userFavoriteRestaurants.some(
      (fav) => fav.restaurantId === restaurant.id
    )

    const handleFavoriteClick = async () => {
      if (!currentUser?.id) return

      try {
        await toggleFavoriteRestaurant(currentUser.id, restaurant.id)

        if (isFavorite) {
          toast("Restaurante removido dos favoritos com sucesso.", {
            type: "success",
            toastId: "id",
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Flip
          })
        } else {
          toast("Restaurante favoritado com sucesso.", {
            type: "success",
            toastId: "id",
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Flip
          })
        }
      } catch (error) {
        toast.error("Error while favorite restaurant.")
      }
    }

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
      <div className="flex w-full flex-1 items-center justify-between gap-2 xl:flex-auto">
        <div className="flex w-full items-center justify-end gap-2 xl:justify-start">
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
        <div>
          <Button
            type="button"
            title="Favoritar"
            variant="ghost"
            size="sm"
            className={`p-0 ${currentUser && isFavorite ? "text-primary" : "text-white/60"} hover:text-primary`}
            onClick={handleFavoriteClick}
          >
            {isFavorite && currentUser ? (
              <HeartIcon fill="#FF0000" />
            ) : (
              <HeartIcon />
            )}
          </Button>
        </div>
        <div className="xl:hidden">
          <Button
            type="button"
            title="Favoritar"
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-primary"
            onClick={handleSharePageClick}
          >
            <Share2Icon />
          </Button>
        </div>
      </div>
    )
  }

  const BackToHomeButton = () => {
    const router = useRouter()

    return (
      <div className="flex-1 xl:flex-auto">
        <Button
          type="button"
          variant="ghost"
          size="default"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-0 hover:bg-primary hover:text-white xl:hidden"
          onClick={() => router.push("/")}
        >
          <ChevronLeftIcon size={24} />
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full lg:h-[600px] xl:w-2/4">
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
              className="h-full w-full object-cover xl:brightness-[.50] hover:xl:brightness-100"
            />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  )
}
