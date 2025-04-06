import type { Metadata, Viewport } from "next/types";
import "./globals.css";

import localFont from "next/font/local";

import LayoutWrapper from "@/components/layout/wrapper";

import type React from "react";

const sfpro = localFont({
  src: [
    {
      path: "./fonts/sfpro/SF-Pro-Display-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/sfpro/SF-Pro-Display-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/sfpro/SF-Pro-Display-Semibold.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/sfpro/SF-Pro-Display-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Liga de Tenis GT",
  description: "Aplicación de la Liga de Tenis de Guatemala",
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#245A4C",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="es">
      <body className={sfpro.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
