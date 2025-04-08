"use client";

import { Calendar, Home, Trophy, User } from "lucide-react";
import { usePathname } from "next/navigation";

import NavItem from "./components/item";
import { useShowWelcomeToast } from "@/hooks/toast";

const BottomNav: React.FC = () => {
  const pathname = usePathname();
  useShowWelcomeToast();

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      data-id="nav"
      style={{ boxShadow: "0px -2px 5px -1px rgba(0,0,0,0.05)" }}
      className="bg-white fixed bottom-0 left-0 right-0 z-10 nav"
    >
      <div data-id="nav-container" className="px-5 bg-white h-14">
        <div
          data-id="nav-content"
          className="flex justify-around bg-white h-full"
        >
          <NavItem
            href="/"
            label="Inicio"
            className="animate-jump-in animate-ease-[linear]"
            isActive={isActive("/")}
            icon={
              <Home
                className={`h-6 w-6 ${isActive("/") ? "fill-current" : ""}`}
              />
            }
          />

          <NavItem
            className="animate-jump-in animate-delay-200 animate-ease-[linear]"
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
            className="animate-jump-in animate-delay-300 animate-ease-[linear]"
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
            className="animate-jump-in animate-delay-400 animate-ease-[linear]"
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
