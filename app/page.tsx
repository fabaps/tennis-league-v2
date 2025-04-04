"use client";

import type React from "react";

import {
  BarChart3,
  Calendar,
  ChevronDown,
  ShoppingBag,
  Smartphone,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Header from "@/components/header";

interface FeatureReel {
  icon: React.ReactNode;
  title: string;
  badge: string;
  description: string;
  image: string;
  showArrow: boolean;
  index: number;
  customStyle?: boolean;
}

export default function Home() {
  const [, setActiveReel] = useState(0);
  const reelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (reelsRef.current) {
        const scrollPosition = window.scrollY;
        const reelHeight = window.innerHeight;
        const newActiveReel = Math.round(scrollPosition / reelHeight);
        setActiveReel(newActiveReel);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToReel = (index: number) => {
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: "smooth",
    });
  };

  const featureReels: FeatureReel[] = [
    {
      icon: <Trophy className="w-6 h-6 text-white" />,
      title: "Torneos",
      badge: "Próximamente",
      description:
        "Sigue el bracket en tiempo real, revisa resultados y conoce a tus próximos rivales.",
      image: "/images/banner/tournaments.jpeg",
      showArrow: true,
      index: 1,
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      title: "Estadísticas H2H",
      badge: "Próximamente",
      description:
        "Compara tu historial contra cualquier rival y analiza tu rendimiento en la cancha.",
      image: "/images/banner/analytics.webp",
      showArrow: true,
      index: 2,
      customStyle: true,
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-white" />,
      title: "Marketplace",
      badge: "Próximamente",
      description:
        "Compra y vende artículos de tenis fácilmente dentro de la comunidad.",
      image: "/images/banner/market.webp",
      showArrow: true,
      index: 3,
    },
    {
      icon: <Calendar className="w-6 h-6 text-white" />,
      title: "Reserva de Clases",
      badge: "Próximamente",
      description:
        "Encuentra entrenadores, agenda sesiones y mejora tu juego sin complicaciones.",
      image: "/images/banner/calendar.jpg",
      showArrow: true,
      index: 4,
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Comunidad GTL",
      badge: "Próximamente",
      description:
        "Conéctate con jugadores, organiza partidos y sé parte del tenis en un solo lugar.",
      image: "/images/banner/community.jpg",
      showArrow: true,
      index: 5,
    },
    {
      icon: <Smartphone className="w-6 h-6 text-white" />,
      title: "Próximamente en iOS y Android 📲🎾",
      badge: "Próximamente",
      description: "",
      image: "/images/banner/app.jpg",
      showArrow: false,
      index: 6,
    },
  ];

  return (
    <div className="bg-black text-white">
      <Header />

      <div
        ref={reelsRef}
        className="snap-y snap-mandatory h-screen overflow-y-scroll scrollbar-hide"
      >
        <div className="h-screen w-full snap-start relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://static.wixstatic.com/media/51662f_3da5ce3ee43744dabb0a107c9af1ab3f~mv2.jpg)`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pt-0">
            <div className="text-center mt-[-80px]">
              <div className="mb-6 flex justify-center">
                <Image
                  src="/images/logo.png"
                  alt="GTL Logo"
                  width={120}
                  height={120}
                  className="drop-shadow-xl"
                />
              </div>

              <h1 className="text-2xl font-bold mb-2 text-white">
                Lo que se viene en la
              </h1>
              <h2 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                GTL
              </h2>

              <button
                onClick={() => scrollToReel(1)}
                className="animate-bounce inline-block"
                aria-label="Ver más"
              >
                <ChevronDown className="w-8 h-8 text-white opacity-80" />
              </button>
            </div>
          </div>
        </div>

        {featureReels.map((reel, index) => (
          <div
            key={index}
            className="h-screen w-full snap-start relative overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${reel.image})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

            <div className="absolute inset-0 flex flex-col p-8">
              <div className="flex justify-between items-start pt-4">
                <div className="bg-green-600 w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-lg">
                  {reel.icon}
                </div>
                <span className="bg-yellow-500 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                  {reel.badge}
                </span>
              </div>

              <div className="flex flex-col justify-center flex-grow">
                <div className="max-w-md">
                  <h2 className="text-3xl font-bold mb-4">{reel.title}</h2>
                  {reel.description && (
                    <p className="text-white/90 text-base leading-relaxed mb-6">
                      {reel.description}
                    </p>
                  )}

                  {reel.showArrow && (
                    <button
                      onClick={() => scrollToReel(reel.index)}
                      className="animate-bounce inline-block"
                      aria-label="Ver más"
                    >
                      <ChevronDown className="w-7 h-7 text-white opacity-80" />
                    </button>
                  )}
                </div>
              </div>

              <div className="h-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
