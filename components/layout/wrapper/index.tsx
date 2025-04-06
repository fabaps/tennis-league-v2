"use client";

import Header from "@/components/header";
import BottomNav from "@/components/layout/bottomNav";
import useIsPrivateRoute from "@/hooks/router";
import AuthProvider from "@/providers/auth";

import type React from "react";
interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const isPrivateRoute = useIsPrivateRoute();

  return (
    <AuthProvider>
      {isPrivateRoute && <Header />}

      <main
        className={isPrivateRoute ? "mt-14" : ""}
        style={{
          height: isPrivateRoute
            ? "calc(100dvh - calc(var(--spacing) * 34))"
            : "100dvh",
        }}
      >
        {children}
      </main>

      {isPrivateRoute && <BottomNav />}
    </AuthProvider>
  );
};

export default LayoutWrapper;
