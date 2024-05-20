/* eslint-disable no-unused-vars */
"use client"
import { ReactNode, createContext, useContext, useState } from "react"

type SlideButtonType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

type SlideButtonProviderProps = {
  children: ReactNode
}

const SlideButtonContext = createContext<SlideButtonType | undefined>(undefined)

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

export const useSlideButton = (): SlideButtonType => {
  const context = useContext(SlideButtonContext)

  if (!context) {
    throw new Error("useSlideButton context is not created.")
  }

  return context
}
