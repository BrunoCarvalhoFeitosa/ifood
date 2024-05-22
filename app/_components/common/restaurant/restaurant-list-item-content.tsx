"use client"
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
import { formatCurrency } from "@/app/_helpers/price"
import { Flip, toast } from "react-toastify"
import { toggleFavoriteRestaurant } from "@/app/_actions/restaurant"
import { Button } from "@/app/_components/ui/button"
import { BikeIcon, HeartIcon, TimerIcon } from "lucide-react"

interface RestaurantListItemContentProps {
  restaurant: Restaurant
  currentUser: SafeUser | null
  userFavoriteRestaurants: UserFavoriteRestaurant[]
}

export const RestaurantListItemContent = ({
  restaurant,
  currentUser,
  userFavoriteRestaurants
}: RestaurantListItemContentProps) => {
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

  return (
    <div>
      <div className="my-3">
        <h3 className="text-base font-semibold">{restaurant.name}</h3>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-primary">
          <Button
            type="button"
            title="Favoritar"
            variant="ghost"
            size="sm"
            className={`p-0 text-primary hover:text-primary`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? <HeartIcon fill="#FF0000" /> : <HeartIcon />}
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <div className="text-primary">
            <BikeIcon size={20} />
          </div>
          <div className="text-sm text-muted-foreground">
            {Number(restaurant.deliveryFee) === 0
              ? "Entrega Grátis"
              : formatCurrency(Number(restaurant.deliveryFee))}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="text-primary">
            <TimerIcon size={20} />
          </div>
          <div className="text-sm text-muted-foreground">
            {restaurant.deliveryTimeMinutes} min
          </div>
        </div>
      </div>
    </div>
  )
}
