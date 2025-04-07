import type { Metadata, Viewport } from "next/types";
import "./globals.css";

import localFont from "next/font/local";

import LayoutWrapper from "@/components/layout/wrapper";

import type React from "react";
import { Toaster } from "@/components/ui/sonner";
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
  description: "Aplicación de la liga de tenis de Guatemala",
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
      <head>
        <meta name="application-name" content="GTL" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>

      <body className={sfpro.className}>
        <Toaster mobileOffset={{ bottom: 'var(--sonner-bt)' }} />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
