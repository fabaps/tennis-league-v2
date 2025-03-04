"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Trophy, User, Calendar } from "lucide-react"

export default function BottomNav() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white shadow-lg fixed bottom-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around">
          <Link
            href="/"
            className={`flex flex-col items-center py-2 ${isActive("/") ? "text-green-600" : "text-green-700"}`}
          >
            <Home className={`h-6 w-6 ${isActive("/") ? "fill-current" : ""}`} />
            <span className="text-xs mt-1">Inicio</span>
          </Link>
          <Link
            href="/torneos"
            className={`flex flex-col items-center py-2 ${isActive("/torneos") ? "text-green-600" : "text-green-700"}`}
          >
            <Trophy className={`h-6 w-6 ${isActive("/torneos") ? "fill-current" : ""}`} />
            <span className="text-xs mt-1">Torneos</span>
          </Link>
          <Link
            href="/ranking"
            className={`flex flex-col items-center py-2 ${isActive("/ranking") ? "text-green-600" : "text-green-700"}`}
          >
            <Calendar className={`h-6 w-6 ${isActive("/ranking") ? "fill-current" : ""}`} />
            <span className="text-xs mt-1">Ranking</span>
          </Link>
          <Link
            href="/perfil"
            className={`flex flex-col items-center py-2 ${isActive("/perfil") ? "text-green-600" : "text-green-700"}`}
          >
            <User className={`h-6 w-6 ${isActive("/perfil") ? "fill-current" : ""}`} />
            <span className="text-xs mt-1">Perfil</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

