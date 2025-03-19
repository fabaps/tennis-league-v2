"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, TurtleIcon as Tennis, GraduationCap, Trophy } from "lucide-react"
import React from "react"
import Header from "./components/Header"

export default function Home() {
  const [selectedDay, setSelectedDay] = useState("18")

  const days = [
    { name: "Lunes", number: "17" },
    { name: "Martes", number: "18" },
    { name: "Miércoles", number: "19" },
    { name: "Jueves", number: "20" },
    { name: "Viernes", number: "21" },
    { name: "Sábado", number: "22" },
  ]

  const allEvents = {
    "17": [
      {
        time: "10:00",
        title: "Singles",
        type: "U14",
        location: "Cancha delfines",
        courtConfirmed: true,
        completed: true,
        score: {
          sets: ["7-5", "4-6", "7-5"],
        },
        players: [
          {
            name: "Jugador 1",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.39%20-%20An%20eleventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20-oJWiw24SazV4nI40VBn9FGsHL4XYPr.webp",
            ranking: 12.5,
          },
          {
            name: "Jugador 2",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.34%20-%20A%20tenth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-xq7jwBypIZm1U78YD4UdHZoWNIfLgP.webp",
            ranking: 11.8,
          },
        ],
      },
    ],
    "18": [
      {
        time: "13:30",
        title: "Dobles",
        type: "Dobles",
        location: "Federación Z15",
        courtConfirmed: false,
        players: [
          {
            name: "Jugador 1",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.34%20-%20A%20tenth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-xq7jwBypIZm1U78YD4UdHZoWNIfLgP.webp",
            ranking: 9.8,
          },
          {
            name: "Jugador 2",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.30%20-%20A%20seventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20Th-AWZujTU92XzOdTha9t8pZuwNBEwwtO.webp",
            ranking: 14.2,
          },
        ],
      },
      {
        time: "16:00",
        title: "Singles",
        type: "Individual",
        location: "Club aleman",
        courtConfirmed: true,
        players: [
          {
            name: "Jugador 1",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.16.19%20-%20A%20sixth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-74G1MZLpQAn7Bm6va0bL8t3tnQUR26.webp",
            ranking: 15.7,
          },
        ],
      },
    ],
    "19": [
      {
        time: "16:00",
        title: "Singles",
        type: "Principiantes",
        location: "La aurora",
        courtConfirmed: true,
        players: [
          {
            name: "Jugador 1",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.39%20-%20An%20eleventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20-oJWiw24SazV4nI40VBn9FGsHL4XYPr.webp",
            ranking: 5.2,
          },
        ],
      },
    ],
    "20": [
      {
        time: "18:00",
        title: "Dobles",
        type: "Dobles Mixtos",
        location: "Federación Z15",
        courtConfirmed: false,
        players: [
          {
            name: "Jugador 1",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.34%20-%20A%20tenth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-xq7jwBypIZm1U78YD4UdHZoWNIfLgP.webp",
            ranking: 11.3,
          },
          {
            name: "Jugador 2",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.30%20-%20A%20seventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20Th-AWZujTU92XzOdTha9t8pZuwNBEwwtO.webp",
            ranking: 13.8,
          },
        ],
      },
    ],
    "21": [
      {
        time: "20:00",
        title: "Singles",
        type: "Individual",
        location: "Club italiano",
        courtConfirmed: true,
        players: [
          {
            name: "Jugador 1",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.16.19%20-%20A%20sixth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-74G1MZLpQAn7Bm6va0bL8t3tnQUR26.webp",
            ranking: 16.0,
          },
        ],
      },
    ],
    "22": [
      {
        time: "09:00",
        title: "Dobles",
        type: "Varios formatos",
        location: "Ciudad de la Raqueta",
        courtConfirmed: true,
        players: [
          {
            name: "Jugador 1",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.34%20-%20A%20tenth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-xq7jwBypIZm1U78YD4UdHZoWNIfLgP.webp",
            ranking: 14.5,
          },
          {
            name: "Jugador 2",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.30%20-%20A%20seventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20Th-AWZujTU92XzOdTha9t8pZuwNBEwwtO.webp",
            ranking: 15.2,
          },
        ],
      },
    ],
  }

  const events = allEvents[selectedDay] || []

  return (
    <div className="min-h-screen bg-white">
      <Header isHomePage={true} />
      <div className="px-4 py-4 pt-16">
        {/* Primera sección - Tarjetas */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            {
              href: "/marketplace",
              icon: <Search className="w-5 h-5 text-white" />,
              title: "Marketplace",
              subtitle: "Próximamente",
              image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5703e048-4bc0-4e07-809d-a68af4925ac5.jpg-zEzZ60kAYMzXdbs2CoJumCtVwHEQF3.jpeg",
            },
            {
              href: "/crear",
              icon: <Tennis className="w-5 h-5 text-white" />,
              title: "Crear un partido",
              subtitle: "Proximamente",
              image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92a8bdb0-94d8-488a-a82c-c311d8a06366.jpg-TQfZLagSUReUH6XRtC2fyvm3287mxm.jpeg",
            },
            {
              href: "/clases",
              icon: <GraduationCap className="w-5 h-5 text-white" />,
              title: "Clases",
              subtitle: "Próximamente",
              image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FjKgPVs9ZIcvCXulsV71jHvHyfQ0Yh.png",
            },
            {
              href: "/competiciones",
              icon: <Trophy className="w-5 h-5 text-white" />,
              title: "Competiciones",
              subtitle: "Proximamente",
              image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/24d70b5b-60cd-4f50-93ef-32a1835b5662.jpg-RW1YkNMJ76ivKjJS5GDaLXQd2S8R8L.jpeg",
            },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="bg-white rounded-[12px] p-3 shadow-[0_2px_6px_rgba(0,0,0,0.06)] relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative">
                  <div className="bg-[#14181F] w-[40px] h-[40px] rounded-[8px] flex items-center justify-center mb-2">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">{item.title}</h2>
                    {item.subtitle && <p className="text-xs text-white/80 mt-1">{item.subtitle}</p>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Segunda sección - Calendario y eventos */}
        <div>
          {/* Header */}
          <h2 className="text-2xl font-bold mb-4">
            {days.find((day) => day.number === selectedDay)?.name} {selectedDay} Feb.
          </h2>

          {/* Calendar Strip */}
          <div className="flex space-x-2 mb-4 overflow-x-auto scrollbar-hide">
            {days.map((day) => (
              <button
                key={day.name}
                onClick={() => setSelectedDay(day.number)}
                className={`flex-shrink-0 w-[60px] h-[60px] rounded-xl border ${
                  day.number === selectedDay
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-200 text-gray-400"
                } flex flex-col items-center justify-center`}
              >
                <span className="text-xs">{day.name}</span>
                <span className="text-xl font-bold">{day.number}</span>
              </button>
            ))}
          </div>

          {/* Events List */}
          <div className="space-y-2">
            {events.map((event, index) => (
              <Link href={event.completed ? "/partido-finalizado" : "/partido"} key={index}>
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="text-green-500 text-lg font-bold">{event.time}</div>
                      <h3 className="text-lg font-bold">{event.title}</h3>
                    </div>
                    {!event.completed && (
                      <div
                        className={`text-xs font-medium ${event.courtConfirmed ? "text-green-500" : "text-yellow-500"}`}
                      >
                        {event.courtConfirmed ? "Cancha reservada" : "Cancha por reservar"}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mb-1">{event.type}</div>
                  <div className="text-sm text-gray-400 mb-2">{event.location}</div>

                  {event.completed ? (
                    <div className="flex justify-center bg-gray-50 rounded-lg p-4">
                      <div className="w-full max-w-md">
                        <div className="grid grid-cols-[auto,1fr,1fr,1fr] gap-2 items-center">
                          <div className="col-span-1 font-semibold text-gray-500">Jugador</div>
                          <div className="col-span-1 text-center font-semibold text-gray-500">Set 1</div>
                          <div className="col-span-1 text-center font-semibold text-gray-500">Set 2</div>
                          <div className="col-span-1 text-center font-semibold text-gray-500">Set 3</div>
                          {event.players.map((player, playerIndex) => (
                            <React.Fragment key={playerIndex}>
                              <div className="col-span-1 flex items-center gap-2">
                                <Image
                                  src={player.image || "/placeholder.svg"}
                                  alt={player.name}
                                  width={36}
                                  height={36}
                                  className="rounded-full"
                                />
                                <div>
                                  <span className="text-sm font-medium block">{player.name}</span>
                                  <span className="text-xs text-gray-500">GTR: {player.ranking.toFixed(2)}</span>
                                </div>
                              </div>
                              {event.score.sets.map((set, setIndex) => (
                                <div key={setIndex} className="col-span-1 text-center text-2xl font-light">
                                  {set.split("-")[playerIndex]}
                                </div>
                              ))}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {event.players.map((player, playerIndex) => (
                        <div
                          key={playerIndex}
                          className="flex items-center space-x-2 bg-gray-50 rounded-full py-1 px-2"
                        >
                          <Image
                            src={player.image || "/placeholder.svg"}
                            alt={player.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <div>
                            <div className="text-xs font-semibold">{player.name}</div>
                            <div className="text-xs text-gray-500">GTR: {player.ranking.toFixed(1)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

