import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Press_Start_2P } from "next/font/google";
import { Suspense } from "react";

import Navbar from "@/components/layout/navbar";
import UserProvider from "@/providers/user";

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--press-start",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meme Coin Traders Leaderboard",
  description: "The ultimate leaderboard for meme coin traders",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pressStart.className} antialiased`}>
        <div className="min-h-screen bg-black w-full flex justify-center relative overflow-hidden bg-fixed bg-cover bg-center">
          <Suspense>
            <UserProvider>
              <Navbar />
              {children}
            </UserProvider>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
