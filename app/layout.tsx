import type { Metadata } from "next";
import "./globals.css";

import { Press_Start_2P } from "next/font/google";

import Navbar from "@/components/layout/navbar";
import UserProvider from "@/providers/user";
import { Suspense } from "react";

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--press-start",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meme Coin Traders Leaderboard",
  description: "The ultimate leaderboard for meme coin traders",
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
