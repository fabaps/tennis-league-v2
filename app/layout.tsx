import type { Metadata, Viewport } from "next/types";
import "./globals.css";

import { Inter } from "next/font/google";

import LayoutWrapper from "@/components/layout/wrapper";
import Toaster from "@/components/ui/sonner";

import type React from "react";

const cont = Inter({ subsets: ["latin"], variable: "--font-cont" });

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
        <link rel="preconnect" href="https://vercel.live" />
        <link rel="preconnect" href="https://apis.google.com" />
      </head>

      <body className={cont.className}>
        <Toaster mobileOffset={{ bottom: "var(--sonner-bt)" }} />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
