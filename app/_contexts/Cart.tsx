/* eslint-disable no-unused-vars */
"use client"
import { ReactNode, createContext, useState } from "react"
import { Prisma, Product } from "@prisma/client"
import { getCalculateProductTotalPrice } from "@/app/_helpers/price"
import { Flip, toast } from "react-toastify"

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          id: true
          deliveryFee: true
          deliveryTimeMinutes: true
          categories: true
          imageUrl: true
          name: true
          products: true
        }
      }
    }
  }> {
  quantity: number
}

interface ICartContext {
  products: CartProduct[]
  addProductToCart: (product: Product) => void
  removeProductFromCart: (productId: string) => void
  subtotalPrice: number
  totalPrice: number
  deliveryPrice: number
  totalDiscounts: number
  setQuantity: (value: number) => void
  quantity: number
  setIsCartOpen: (isOpen: boolean) => void
  isCartOpen: boolean
  setIsDifferentRestaurant: (isDifferentRestaurant: boolean) => void
  isDiffferentRestaurant: boolean
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  subtotalPrice: 0,
  totalPrice: 0,
  deliveryPrice: 0,
  totalDiscounts: 0,
  setQuantity: () => {},
  quantity: 0,
  setIsCartOpen: () => {},
  isCartOpen: false,
  setIsDifferentRestaurant: () => {},
  isDiffferentRestaurant: false
})

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([])
  const [quantity, setQuantity] = useState<number>(1)
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [isDiffferentRestaurant, setIsDifferentRestaurant] =
    useState<boolean>(false)

  const addProductToCart = (product: Product) => {
    const isProductInCart = products.some(
      (cartProduct) => cartProduct.id === product.id
    )

    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId
    )

    if (hasDifferentRestaurantProduct) {
      setProducts([])
    }

    if (isProductInCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (
            cartProduct.id === product.id &&
            cartProduct.quantity + quantity > 10
          ) {
            toast("O máximo permitido é de 10 unidades por item.", {
              type: "error",
              toastId: "id",
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Flip
            })

            return cartProduct
          } else if (cartProduct.id === product.id) {
            toast("Produto adicionado ao carrinho.", {
              type: "success",
              toastId: "id",
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Flip
            })

            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity
            }
          }
          return cartProduct
        })
      )
    } else {
      setProducts((prev) => [
        ...prev,
        {
          ...product,
          quantity: quantity
        } as CartProduct
      ])

      toast("Produto adicionado ao carrinho.", {
        type: "success",
        toastId: "id",
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Flip
      })
    }
  }

  const removeProductFromCart = (productId: string) => {
    return setProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    )
  }

  const subtotalPrice = products.reduce((acc, product) => {
    return acc + Number(product.price) * product.quantity
  }, 0)

  const totalPrice =
    products.reduce((acc, product) => {
      return acc + getCalculateProductTotalPrice(product) * product.quantity
    }, 0) + Number(products?.[0]?.restaurant?.deliveryFee)

  const deliveryPrice = products.reduce((acc, product) => {
    return acc + Number(product.restaurant.deliveryFee)
  }, 0)

  const totalDiscounts = subtotalPrice - totalPrice + Number(deliveryPrice)

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        removeProductFromCart,
        subtotalPrice,
        totalPrice,
        deliveryPrice,
        totalDiscounts,
        setQuantity,
        quantity,
        setIsCartOpen,
        isCartOpen,
        setIsDifferentRestaurant,
        isDiffferentRestaurant
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
