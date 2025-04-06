"use client";

import Header from "@/components/header";
import BottomNav from "@/components/layout/bottomNav";
import AuthProvider from "@/providers/auth";

import type React from "react";
interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <AuthProvider>
      <Header />
      <main className="mt-14">{children}</main>
      <BottomNav />
    </AuthProvider>
  );
};

export default LayoutWrapper;
