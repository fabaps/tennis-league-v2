// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { Search, TurtleIcon as Tennis, GraduationCap, Trophy } from "lucide-react"
// import React from "react"
// import Header from "./components/Header"

// export default function Home() {
//   // Se inicializa con el día actual para que se muestre el día en curso
//   const [selectedDay, setSelectedDay] = useState(new Date().getDate())

//   const [weekDays, setWeekDays] = useState([]);

//   useEffect(() => {
//     const today = new Date();
//     const dayOfWeek = today.getDay();
//     // Calcula el lunes de la semana actual
//     const monday = new Date(today);
//     monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

//     const days = Array.from({ length: 7 }, (_, i) => {
//       const date = new Date(monday);
//       date.setDate(monday.getDate() + i);
//       return {
//         dayName: date.toLocaleDateString("es-ES", { weekday: "long" }),
//         dayNumber: date.getDate(),
//       };
//     });

//     setWeekDays(days);
//   }, []);

//   const allEvents = {
//     "17": [
//       {
//         time: "10:00",
//         title: "Singles",
//         type: "U14",
//         location: "Cancha delfines",
//         courtConfirmed: true,
//         completed: true,
//         score: {
//           sets: ["7-5", "4-6", "7-5"],
//         },
//         players: [
//           {
//             name: "Jugador 1",
//             image:
//               "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.39%20-%20An%20eleventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20-oJWiw24SazV4nI40VBn9FGsHL4XYPr.webp",
//             ranking: 12.5,
//           },
//           {
//             name: "Jugador 2",
//             image:
//               "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.34%20-%20A%20tenth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-xq7jwBypIZm1U78YD4UdHZoWNIfLgP.webp",
//             ranking: 11.8,
//           },
//         ],
//       },
//     ],
//     "18": [
//       {
//         time: "13:30",
//         title: "Dobles",
//         type: "Dobles",
//         location: "Federación Z15",
//         courtConfirmed: false,
//         players: [
//           {
//             name: "Jugador 1",
//             image:
//               "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.34%20-%20A%20tenth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-xq7jwBypIZm1U78YD4UdHZoWNIfLgP.webp",
//             ranking: 9.8,
//           },
//           {
//             name: "Jugador 2",
//             image:
//               "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.30%20-%20A%20seventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20Th-AWZujTU92XzOdTha9t8pZuwNBEwwtO.webp",
//             ranking: 14.2,
//           },
//         ],
//       },
//       {
//         time: "16:00",
//         title: "Singles",
//         type: "Individual",
//         location: "Club aleman",
//         courtConfirmed: true,
//         players: [
//           {
//             name: "Jugador 1",
//             image:
//               "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.16.19%20-%20A%20sixth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-74G1MZLpQAn7Bm6va0bL8t3tnQUR26.webp",
//             ranking: 15.7,
//           },
//         ],
//       },
//     ],
//     "19": [
//       {
//         time: "16:00",
//         title: "Singles",
//         type: "Principiantes",
//         location: "La aurora",
//         courtConfirmed: true,
//         players: [
//           {
//             name: "Jugador 1",
//             image:
//               "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.39%20-%20An%20eleventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20-oJWiw24SazV4nI40VBn9FGsHL4XYPr.webp",
//             ranking: 5.2,
//           },
//         ],
//       },
//     ],
//     "20": [
//       {
//         time: "18:00",
//         title: "Dobles",
//         type: "Dobles Mixtos",
//         location: "Federación Z15",
//         courtConfirmed: false,
//         players: [
//           {
//             name: "Jugador 1",
//             image:
//               "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.34%20-%20A%20tenth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-xq7jwBypIZm1U78YD4UdHZoWNIfLgP.webp",
//             ranking: 11.3,
//           },
//           {
//             name: "Jugador 2",
//             image:
//               "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.30%20-%20A%20seventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20Th-AWZujTU92XzOdTha9t8pZuwNBEwwtO.webp",
//             ranking: 13.8,
//           },
//         ],
//       },
//     ],
//     "21": [
//       {
//         time: "20:00",
//         title: "Singles",
//         type: "Individual",
//         location: "Club italiano",
//         courtConfirmed: true,
//         players: [
//           {
//             name: "Jugador 1",
//             image:
//               "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.16.19%20-%20A%20sixth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-74G1MZLpQAn7Bm6va0bL8t3tnQUR26.webp",
//             ranking: 16.0,
//           },
//         ],
//       },
//     ],
//     "22": [
//       {
//         time: "09:00",
//         title: "Dobles",
//         type: "Varios formatos",
//         location: "Ciudad de la Raqueta",
//         courtConfirmed: true,
//         players: [
//           {
//             name: "Jugador 1",
//             image:
//               "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.34%20-%20A%20tenth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-xq7jwBypIZm1U78YD4UdHZoWNIfLgP.webp",
//             ranking: 14.5,
//           },
//           {
//             name: "Jugador 2",
//             image:
//               "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.30%20-%20A%20seventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20Th-AWZujTU92XzOdTha9t8pZuwNBEwwtO.webp",
//             ranking: 15.2,
//           },
//         ],
//       },
//     ],
//   }

//   const events = allEvents[selectedDay] || []

//   return (
//     <div className="min-h-screen bg-white">
//       <Header isHomePage={true} />
//       <div className="px-4 py-4 pt-8">
//         {/* Primera sección - Tarjetas */}
//         <div className="grid grid-cols-2 gap-3 mb-4">
//           {[
//             {
//               href: "/marketplace",
//               icon: <Search className="w-5 h-5 text-white" />,
//               title: "Marketplace",
//               subtitle: "Próximamente",
//               image:
//                 "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5703e048-4bc0-4e07-809d-a68af4925ac5.jpg-zEzZ60kAYMzXdbs2CoJumCtVwHEQF3.jpeg",
//             },
//             {
//               href: "/crear",
//               icon: <Tennis className="w-5 h-5 text-white" />,
//               title: "Crear un partido",
//               subtitle: "Proximamente",
//               image:
//                 "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92a8bdb0-94d8-488a-a82c-c311d8a06366.jpg-TQfZLagSUReUH6XRtC2fyvm3287mxm.jpeg",
//             },
//             {
//               href: "/clases",
//               icon: <GraduationCap className="w-5 h-5 text-white" />,
//               title: "Clases",
//               subtitle: "Próximamente",
//               image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FjKgPVs9ZIcvCXulsV71jHvHyfQ0Yh.png",
//             },
//             {
//               href: "/competiciones",
//               icon: <Trophy className="w-5 h-5 text-white" />,
//               title: "Competiciones",
//               subtitle: "Proximamente",
//               image:
//                 "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/24d70b5b-60cd-4f50-93ef-32a1835b5662.jpg-RW1YkNMJ76ivKjJS5GDaLXQd2S8R8L.jpeg",
//             },
//           ].map((item) => (
//             <Link key={item.href} href={item.href}>
//               <div className="bg-white rounded-[12px] p-3 shadow-[0_2px_6px_rgba(0,0,0,0.06)] relative overflow-hidden">
//                 <div
//                   className="absolute inset-0 bg-cover bg-center"
//                   style={{
//                     backgroundImage: `url(${item.image})`,
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-black/50" />
//                 <div className="relative">
//                   <div className="bg-[#14181F] w-[40px] h-[40px] rounded-[8px] flex items-center justify-center mb-2">
//                     {item.icon}
//                   </div>
//                   <div>
//                     <h2 className="text-sm font-bold text-white">{item.title}</h2>
//                     {item.subtitle && <p className="text-xs text-white/80 mt-1">{item.subtitle}</p>}
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Segunda sección - Calendario y eventos */}
//         <div>
//           {/* Header */}
//           <h2 className="text-2xl font-bold mb-4">
//             {weekDays.find((day) => day.dayNumber === selectedDay)?.dayName} {selectedDay} Feb.
//           </h2>

//           {/* Calendar Strip */}
//           <div className="flex space-x-2 mb-4 overflow-x-auto scrollbar-hide">
//             {weekDays.map((day) => (
//               <button
//                 key={day.dayName}
//                 onClick={() => setSelectedDay(day.dayNumber)}
//                 className={`flex-shrink-0 w-[60px] h-[60px] rounded-xl border ${
//                   day.dayNumber === selectedDay
//                     ? "border-green-500 bg-green-500 text-white"
//                     : "border-gray-200 text-gray-400"
//                 } flex flex-col items-center justify-center`}
//               >
//                 <span className="text-xs">{day.dayName}</span>
//                 <span className="text-xl font-bold">{day.dayNumber}</span>
//               </button>
//             ))}
//           </div>

//           {/* Events List */}
//           <div className="relative ">
//             <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-md h-full w-full px-4 pt-8 text-center">Próximamente: El Calendario Semanal de la Guatemala Tennis League (GTL)</p>
//             <div className="space-y-2 blur-md pointer-events-none p-4 bg-gray-300">
//             {events.map((event, index) => (
//               <Link href={event.completed ? "/partido-finalizado" : "/partido"} key={index}>
//                 <div className="border border-gray-200 rounded-lg p-3">
//                   <div className="flex items-center justify-between mb-2">
//                     <div className="flex items-center space-x-2">
//                       <div className="text-green-500 text-lg font-bold">{event.time}</div>
//                       <h3 className="text-lg font-bold">{event.title}</h3>
//                     </div>
//                     {!event.completed && (
//                       <div
//                         className={`text-xs font-medium ${event.courtConfirmed ? "text-green-500" : "text-yellow-500"}`}
//                       >
//                         {event.courtConfirmed ? "Cancha reservada" : "Cancha por reservar"}
//                       </div>
//                     )}
//                   </div>
//                   <div className="text-sm text-gray-500 mb-1">{event.type}</div>
//                   <div className="text-sm text-gray-400 mb-2">{event.location}</div>

//                   {event.completed ? (
//                     <div className="flex justify-center bg-gray-50 rounded-lg p-4">
//                       <div className="w-full max-w-md">
//                         <div className="grid grid-cols-[auto,1fr,1fr,1fr] gap-2 items-center">
//                           <div className="col-span-1 font-semibold text-gray-500">Jugador</div>
//                           <div className="col-span-1 text-center font-semibold text-gray-500">Set 1</div>
//                           <div className="col-span-1 text-center font-semibold text-gray-500">Set 2</div>
//                           <div className="col-span-1 text-center font-semibold text-gray-500">Set 3</div>
//                           {event.players.map((player, playerIndex) => (
//                             <React.Fragment key={playerIndex}>
//                               <div className="col-span-1 flex items-center gap-2">
//                                 <Image
//                                   src={player.image || "/placeholder.svg"}
//                                   alt={player.name}
//                                   width={36}
//                                   height={36}
//                                   className="rounded-full"
//                                 />
//                                 <div>
//                                   <span className="text-sm font-medium block">{player.name}</span>
//                                   <span className="text-xs text-gray-500">GTR: {player.ranking.toFixed(2)}</span>
//                                 </div>
//                               </div>
//                               {event.score.sets.map((set, setIndex) => (
//                                 <div key={setIndex} className="col-span-1 text-center text-2xl font-light">
//                                   {set.split("-")[playerIndex]}
//                                 </div>
//                               ))}
//                             </React.Fragment>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex flex-wrap gap-2">
//                       {event.players.map((player, playerIndex) => (
//                         <div
//                           key={playerIndex}
//                           className="flex items-center space-x-2 bg-gray-50 rounded-full py-1 px-2"
//                         >
//                           <Image
//                             src={player.image || "/placeholder.svg"}
//                             alt={player.name}
//                             width={24}
//                             height={24}
//                             className="rounded-full"
//                           />
//                           <div>
//                             <div className="text-xs font-semibold">{player.name}</div>
//                             <div className="text-xs text-gray-500">GTR: {player.ranking.toFixed(1)}</div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </Link>
//             ))}
//           </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  Trophy,
  BarChart3,
  ShoppingBag,
  Calendar,
  Smartphone,
  Users,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Header from "./components/Header";

// Definición de tipos para los reels
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
  // Estado para seguir qué reel está activo
  const [activeReel, setActiveReel] = useState(0);
  const reelsRef = useRef<HTMLDivElement>(null);

  // Actualiza el reel activo basado en la posición de scroll
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

  // Función para desplazarse a un reel específico
  const scrollToReel = (index: number) => {
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: "smooth",
    });
  };

  // Datos de los reels de características
  const featureReels: FeatureReel[] = [
    {
      icon: <Trophy className="w-6 h-6 text-white" />,
      title: "Torneos",
      badge: "Próximamente",
      description:
        "Sigue el bracket en tiempo real, revisa resultados y conoce a tus próximos rivales.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/24d70b5b-60cd-4f50-93ef-32a1835b5662.jpg-RW1YkNMJ76ivKjJS5GDaLXQd2S8R8L.jpeg",
      showArrow: true,
      index: 1,
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      title: "Estadísticas H2H",
      badge: "Próximamente",
      description:
        "Compara tu historial contra cualquier rival y analiza tu rendimiento en la cancha.",
      image:
        "https://sjc.microlink.io/khEVcKgclc9W-Y-zj2AjchFt_pM3pXucOX6oP3zc-7WMUoBPd0OkfbSG1QfQZigGbPXpEizMBkWqgBooYek0jQ.jpeg",
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
      image:
        "https://sjc.microlink.io/8X-Px78mkMrVMSDk88uyKtsCUnNn2_juq4eOX1FNu5FPdJP7ZlHJlYKKWw9dXV3YH8OqXn9pQ1C_Ygae-2gp9A.jpeg",
      showArrow: true,
      index: 3,
    },
    {
      icon: <Calendar className="w-6 h-6 text-white" />,
      title: "Reserva de Clases",
      badge: "Próximamente",
      description:
        "Encuentra entrenadores, agenda sesiones y mejora tu juego sin complicaciones.",
      image:
        "https://static.wixstatic.com/media/51662f_489bfeec364449d7b23e993a8cf5bdc1~mv2.jpg",
      showArrow: true,
      index: 4,
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Comunidad GTL",
      badge: "Próximamente",
      description:
        "Conéctate con jugadores, organiza partidos y sé parte del tenis en un solo lugar.",
      image:
        "https://static.wixstatic.com/media/51662f_57da0bc4b60949da82d306e823038e46~mv2.jpg?quality=lossless",
      showArrow: true,
      index: 5,
    },
    {
      icon: <Smartphone className="w-6 h-6 text-white" />,
      title: "Próximamente en iOS y Android 📲🎾",
      badge: "Próximamente",
      description: "",
      image:
        "https://static.wixstatic.com/media/51662f_beac399fa642444eadbfe295b8ece461~mv2.jpg",
      showArrow: false,
      index: 6,
    },
  ];

  return (
    <div className="bg-black text-white">
      {/* Header de la aplicación */}
      <Header isHomePage={true} />

      {/* Contenedor principal de reels con scroll snap */}
      <div
        ref={reelsRef}
        className="snap-y snap-mandatory h-screen overflow-y-scroll scrollbar-hide"
      >
        {/* Reel de introducción */}
        <div className="h-screen w-full snap-start relative overflow-hidden">
          {/* Imagen de fondo */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://static.wixstatic.com/media/51662f_3da5ce3ee43744dabb0a107c9af1ab3f~mv2.jpg)`,
            }}
          />

          {/* Overlay de gradiente para mejorar legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

          {/* Contenido centrado */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pt-0">
            <div className="text-center mt-[-80px]">
              {/* Logo */}
              <div className="mb-6 flex justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1cf5f92e-5e26-41b6-815e-3493a942424c_removalai_preview_edited-ffpgDzMtzo9lF0IyY4cT18mb3gCTjj.png"
                  alt="GTL Logo"
                  width={120}
                  height={120}
                  className="drop-shadow-xl"
                />
              </div>

              {/* Título y subtítulo */}
              <h1 className="text-2xl font-bold mb-2 text-white">
                Lo que se viene en la
              </h1>
              <h2 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                GTL
              </h2>

              {/* Flecha animada para indicar scroll */}
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

        {/* Reels de características */}
        {featureReels.map((reel, index) => (
          <div
            key={index}
            className="h-screen w-full snap-start relative overflow-hidden"
          >
            {/* Imagen de fondo y overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${reel.image})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

            {/* Contenido del reel */}
            <div className="absolute inset-0 flex flex-col p-8">
              {/* Sección superior: icono y badge */}
              <div className="flex justify-between items-start pt-4">
                <div className="bg-green-600 w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-lg">
                  {reel.icon}
                </div>
                <span className="bg-yellow-500 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                  {reel.badge}
                </span>
              </div>

              {/* Sección central: título y descripción */}
              <div className="flex flex-col justify-center flex-grow">
                <div className="max-w-md">
                  <h2 className="text-3xl font-bold mb-4">{reel.title}</h2>
                  {reel.description && (
                    <p className="text-white/90 text-base leading-relaxed mb-6">
                      {reel.description}
                    </p>
                  )}

                  {/* Flecha para navegar al siguiente reel */}
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

              {/* Espaciador inferior */}
              <div className="h-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
