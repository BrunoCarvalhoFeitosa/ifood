import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "iFood",
  description: "O jeito mais fácil de pedir delivery de comida e fazer mercado. Leia avaliações de restaurantes, faça seu pedido pela internet e receba em casa.",
  authors: {
    name: "Bruno Carvalho Feitosa",
    url: "https://br.linkedin.com/in/bruno-carvalho-feitosa"
  },
  icons: {
    icon: "./favicon/favicon.ico",
    shortcut: "./favicon/favicon.ico"
  },
}

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}