import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClientSideHydration } from "@/app/_components/common/client-side-hydration"
import { CartProvider } from "@/app/_contexts/Cart"
import { Cart } from "@/app/_components/common/cart/cart"
import { Footer } from "@/app/_components/common/footer"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "iFood",
  description:
    "O jeito mais fácil de pedir delivery de comida e fazer mercado. Leia avaliações de restaurantes, faça seu pedido pela internet e receba em casa.",
  authors: {
    name: "Bruno Carvalho Feitosa",
    url: "https://br.linkedin.com/in/bruno-carvalho-feitosa"
  },
  icons: {
    icon: "./favicon/favicon.ico",
    shortcut: "./favicon/favicon.ico"
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ClientSideHydration>
          <CartProvider>
            {children}
            <Cart />
            <Footer />
            <ToastContainer toastStyle={{ width: "100%" }} />
          </CartProvider>
        </ClientSideHydration>
      </body>
    </html>
  )
}
