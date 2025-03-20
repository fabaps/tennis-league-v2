"use client"

import { usePathname } from "next/navigation"
import Header from "./Header"
import BottomNav from "./BottomNav"
import AuthProvider from "../providers/AuthProvider"
import type React from "react"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isSpecialPage =
    pathname === "/auth" || pathname === "/partido" || pathname === "/partido-finalizado" || pathname === "/crear"

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {!isSpecialPage && <Header />}
        <main className={isSpecialPage ? "" : "pt-14 pb-16"}>{children}</main>
        {!isSpecialPage && <BottomNav />}
      </div>
    </AuthProvider>
  )
}
