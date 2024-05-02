/* eslint-disable no-unused-vars */
"use client"
import { ReactNode, createContext, useContext, useState } from "react"

type ProductSlideButtonType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

type ProductSlideButtonProviderProps = {
  children: ReactNode
}

const ProductSlideButtonContext = createContext<
  ProductSlideButtonType | undefined
>(undefined)

export const ProductSlideButtonProvider: React.FC<
  ProductSlideButtonProviderProps
> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <ProductSlideButtonContext.Provider
      value={{
        isOpen,
        setIsOpen
      }}
    >
      {children}
    </ProductSlideButtonContext.Provider>
  )
}

export const useProductSlideButton = (): ProductSlideButtonType => {
  const context = useContext(ProductSlideButtonContext)

  if (!context) {
    throw new Error("useProductSlideButton context is not created.")
  }

  return context
}
