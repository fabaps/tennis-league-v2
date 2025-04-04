"use client";

import { usePathname } from "next/navigation";

import Header from "@/components/header";
import BottomNav from "@/components/layout/bottomNav";
import AuthProvider from "@/providers/auth";

import type React from "react";
interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const isSpecialPage =
    pathname === "/auth" ||
    pathname === "/crear" ||
    pathname === "/partido" ||
    pathname === "/partido-finalizado";

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {!isSpecialPage && <Header />}
        <main className={isSpecialPage ? "" : "pt-14 pb-16"}>{children}</main>
        {!isSpecialPage && <BottomNav />}
      </div>
    </AuthProvider>
  );
};

export default LayoutWrapper;
