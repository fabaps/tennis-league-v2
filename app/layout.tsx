import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import LayoutWrapper from "./components/LayoutWrapper"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Liga de Tenis GT",
  description: "Aplicación de la Liga de Tenis de Guatemala",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={inter.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}



import './globals.css'