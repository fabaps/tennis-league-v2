"use client";

import { Calendar, Home, Trophy, User } from "lucide-react";
import { usePathname } from "next/navigation";

import NavItem from "./components/item";

const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      data-id="nav"
      className="bg-white shadow-lg fixed bottom-0 left-0 right-0 z-10 "
    >
      <div data-id="nav-container" className="px-5 bg-white h-14">
        <div
          data-id="nav-content"
          className="flex justify-around bg-white h-full"
        >
          <NavItem
            href="/"
            label="Inicio"
            isActive={isActive("/")}
            icon={
              <Home
                className={`h-6 w-6 ${isActive("/") ? "fill-current" : ""}`}
              />
            }
          />

          <NavItem
            href="/torneos"
            label="Torneos"
            isActive={isActive("/torneos")}
            icon={
              <Trophy
                className={`h-6 w-6 ${
                  isActive("/torneos") ? "fill-current" : ""
                }`}
              />
            }
          />

          <NavItem
            href="/ranking"
            label="Ranking"
            isActive={isActive("/ranking")}
            icon={
              <Calendar
                className={`h-6 w-6 ${
                  isActive("/ranking") ? "fill-current" : ""
                }`}
              />
            }
          />

          <NavItem
            href="/perfil"
            label="Perfil"
            isActive={isActive("/perfil")}
            icon={
              <User
                className={`h-6 w-6 ${
                  isActive("/perfil") ? "fill-current" : ""
                }`}
              />
            }
          />
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
