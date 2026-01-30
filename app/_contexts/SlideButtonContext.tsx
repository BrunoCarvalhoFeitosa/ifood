/* eslint-disable no-unused-vars */
"use client"
import { ReactNode, createContext, useContext, useState } from "react"

type ISlideButtonContext = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

type SlideButtonProviderProps = {
  children: ReactNode
}

const SlideButtonContext = createContext<ISlideButtonContext | undefined>(
  undefined
)

export const SlideButtonProvider: React.FC<SlideButtonProviderProps> = ({
  children
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <SlideButtonContext.Provider
      value={{
        isOpen,
        setIsOpen
      }}
    >
      {children}
    </SlideButtonContext.Provider>
  )
}

export const useSlideButtonContext = (): ISlideButtonContext => {
  const context = useContext(SlideButtonContext)

  if (!context) {
    throw new Error("useSlideButton context is not created.")
  }

  return context
}
