"use client"
import React, { useState, useEffect, Fragment } from "react"

interface ClientSideHydration {
  children: React.ReactNode
}

export const ClientSideHydration: React.FC<ClientSideHydration> = ({
  children
}) => {
  const [hasMounted, setHasMounted] = useState<boolean>(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  return <Fragment>{children}</Fragment>
}
