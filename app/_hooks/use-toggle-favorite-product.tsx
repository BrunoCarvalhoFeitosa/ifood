import { UserFavoriteProduct } from "@prisma/client"
import { Flip, toast } from "react-toastify"
import { toggleFavoriteProduct } from "@/app/_actions/product"

interface UseToggleFavoriteProductProps {
  userId?: string
  userFavoriteProducts?: UserFavoriteProduct[]
  productId: string
  productIsFavorited?: boolean
}

const useToggleFavoriteProduct = ({
  userId,
  productId,
  productIsFavorited
}: UseToggleFavoriteProductProps) => {
  const handleFavoriteClick = async () => {
    if (!userId) return

    try {
      await toggleFavoriteProduct(userId, productId)

      if (productIsFavorited) {
        toast("Produto removido dos favoritos com sucesso.", {
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
        toast("Produto favoritado com sucesso.", {
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
      toast.error("Error while favorite product.")
    }
  }

  return { handleFavoriteClick }
}

export default useToggleFavoriteProduct
