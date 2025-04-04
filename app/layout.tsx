import type { Metadata } from "next/types";
import "./globals.css";

import { Inter } from "next/font/google";

import LayoutWrapper from "@/components/layout/wrapper";

import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Liga de Tenis GT",
  description: "Aplicación de la Liga de Tenis de Guatemala",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="es">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={inter.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
