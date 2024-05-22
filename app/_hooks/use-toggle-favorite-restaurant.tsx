import { UserFavoriteRestaurant } from "@prisma/client"
import { Flip, toast } from "react-toastify"
import { toggleFavoriteRestaurant } from "@/app/_actions/restaurant"

interface UseToggleFavoriteRestaurantProps {
  userId?: string
  userFavoriteRestaurants?: UserFavoriteRestaurant[]
  restaurantId: string
  restaurantIsFavorited?: boolean
}

const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  restaurantIsFavorited
}: UseToggleFavoriteRestaurantProps) => {
  const handleFavoriteClick = async () => {
    if (!userId) return

    try {
      await toggleFavoriteRestaurant(userId, restaurantId)

      if (restaurantIsFavorited) {
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

  return { handleFavoriteClick }
}

export default useToggleFavoriteRestaurant
