"use client";

import { Calendar, Home, Trophy, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white border-t shadow-lg fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 bg-white">
        <div className="flex justify-around bg-white">
          <Link
            href="/"
            className={`flex flex-col items-center py-2 ${
              isActive("/") ? "text-green-600" : "text-green-700"
            }`}
          >
            <Home
              className={`h-6 w-6 ${isActive("/") ? "fill-current" : ""}`}
            />
            <span className="text-xs mt-1">Inicio</span>
          </Link>
          <Link
            href="/torneos"
            className={`flex flex-col items-center py-2 ${
              isActive("/torneos") ? "text-green-600" : "text-green-700"
            }`}
          >
            <Trophy
              className={`h-6 w-6 ${
                isActive("/torneos") ? "fill-current" : ""
              }`}
            />
            <span className="text-xs mt-1">Torneos</span>
          </Link>
          <Link
            href="/ranking"
            className={`flex flex-col items-center py-2 ${
              isActive("/ranking") ? "text-green-600" : "text-green-700"
            }`}
          >
            <Calendar
              className={`h-6 w-6 ${
                isActive("/ranking") ? "fill-current" : ""
              }`}
            />
            <span className="text-xs mt-1">Ranking</span>
          </Link>
          <Link
            href="/perfil"
            className={`flex flex-col items-center py-2 ${
              isActive("/perfil") ? "text-green-600" : "text-green-700"
            }`}
          >
            <User
              className={`h-6 w-6 ${isActive("/perfil") ? "fill-current" : ""}`}
            />
            <span className="text-xs mt-1">Perfil</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
