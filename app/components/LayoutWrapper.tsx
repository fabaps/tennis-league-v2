"use client"

import { usePathname } from "next/navigation"
import Header from "./Header"
import BottomNav from "./BottomNav"
import type React from "react"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isSpecialPage =
    pathname === "/auth" || pathname === "/partido" || pathname === "/partido-finalizado" || pathname === "/crear"

  return (
    <>
      {!isSpecialPage && <Header />}
      <main className={isSpecialPage ? "" : "pt-14 pb-16"}>{children}</main>
      {!isSpecialPage && <BottomNav />}
    </>
  )
}

