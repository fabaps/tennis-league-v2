"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Header from "../components/Header"

// Datos de ejemplo para el ranking (mantenemos los mismos)
const rankingData = {
  A: Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: i === 7 ? "Juan Pérez" : `Jugador A${i + 1}`,
    photo:
      i === 7
        ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.39%20-%20An%20eleventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20-oJWiw24SazV4nI40VBn9FGsHL4XYPr.webp"
        : [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.34%20-%20A%20tenth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-xq7jwBypIZm1U78YD4UdHZoWNIfLgP.webp",
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.30%20-%20A%20seventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20Th-AWZujTU92XzOdTha9t8pZuwNBEwwtO.webp",
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.16.19%20-%20A%20sixth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-74G1MZLpQAn7Bm6va0bL8t3tnQUR26.webp",
          ][i % 3],
    utr: (10 - i * 0.1).toFixed(1),
    isCurrentUser: i === 7,
  })),
  B: Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: i === 7 ? "Juan Pérez" : `Jugador B${i + 1}`,
    photo:
      i === 7
        ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.39%20-%20An%20eleventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20-oJWiw24SazV4nI40VBn9FGsHL4XYPr.webp"
        : [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.34%20-%20A%20tenth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-xq7jwBypIZm1U78YD4UdHZoWNIfLgP.webp",
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.30%20-%20A%20seventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20Th-AWZujTU92XzOdTha9t8pZuwNBEwwtO.webp",
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.16.19%20-%20A%20sixth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-74G1MZLpQAn7Bm6va0bL8t3tnQUR26.webp",
          ][i % 3],
    utr: (8 - i * 0.1).toFixed(1),
    isCurrentUser: i === 7,
  })),
  C: Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: i === 7 ? "Juan Pérez" : `Jugador C${i + 1}`,
    photo:
      i === 7
        ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.39%20-%20An%20eleventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20-oJWiw24SazV4nI40VBn9FGsHL4XYPr.webp"
        : [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.34%20-%20A%20tenth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-xq7jwBypIZm1U78YD4UdHZoWNIfLgP.webp",
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.30%20-%20A%20seventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20Th-AWZujTU92XzOdTha9t8pZuwNBEwwtO.webp",
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.16.19%20-%20A%20sixth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-74G1MZLpQAn7Bm6va0bL8t3tnQUR26.webp",
          ][i % 3],
    utr: (6 - i * 0.1).toFixed(1),
    isCurrentUser: i === 7,
  })),
  D: Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: i === 7 ? "Juan Pérez" : `Jugador D${i + 1}`,
    photo:
      i === 7
        ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.39%20-%20An%20eleventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20-oJWiw24SazV4nI40VBn9FGsHL4XYPr.webp"
        : [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.34%20-%20A%20tenth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-xq7jwBypIZm1U78YD4UdHZoWNIfLgP.webp",
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.30%20-%20A%20seventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20Th-AWZujTU92XzOdTha9t8pZuwNBEwwtO.webp",
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.16.19%20-%20A%20sixth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-74G1MZLpQAn7Bm6va0bL8t3tnQUR26.webp",
          ][i % 3],
    utr: (4 - i * 0.1).toFixed(1),
    isCurrentUser: i === 7,
  })),
}

// Datos de ejemplo para el usuario actual
const currentUser = {
  name: "Juan Pérez",
  photo:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.39%20-%20An%20eleventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20-oJWiw24SazV4nI40VBn9FGsHL4XYPr.webp",
  category: "A",
  categoryRank: 8,
  overallRank: 8,
}

export default function RankingPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("A")
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchToggle = () => {
    setIsSearching(!isSearching)
    if (isSearching) {
      setSearchQuery("")
    }
  }

  const handlePlayerClick = (playerId: number) => {
    router.push(`/profile?id=${playerId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Ranking GTL"
        showSearch={true}
        onSearchToggle={handleSearchToggle}
        isSearching={isSearching}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        className="bg-[#245A4C]"
      />

      <main className="flex-grow pt-16 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {isSearching ? (
              <motion.div
                key="searchResults"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="pt-4"
              >
                <Card className="bg-white shadow-md rounded-xl overflow-hidden">
                  <CardContent className="p-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Categoría</TableHead>
                          <TableHead>Jugador</TableHead>
                          <TableHead className="text-right">UTR</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(rankingData).flatMap(([category, players]) =>
                          players
                            .filter((player) => player.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((player) => (
                              <TableRow
                                key={`${category}-${player.id}`}
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handlePlayerClick(player.id)}
                              >
                                <TableCell className="font-medium">Categoría {category}</TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-3">
                                    <div className="relative">
                                      <Image
                                        src={player.photo || "/placeholder.svg"}
                                        alt={player.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                      />
                                      {player.isCurrentUser && (
                                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-4 h-4 border-2 border-white"></div>
                                      )}
                                    </div>
                                    <span className={player.isCurrentUser ? "font-semibold" : ""}>{player.name}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">{player.utr}</TableCell>
                              </TableRow>
                            )),
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="normalView"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Card del usuario actual */}
                <Card className="mb-6 bg-white shadow-md rounded-xl overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={currentUser.photo || "/placeholder.svg"}
                        alt={currentUser.name}
                        width={70}
                        height={70}
                        className="rounded-full"
                      />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}</h2>
                        <p className="text-lg text-gray-600">Categoría {currentUser.category}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Posición en categoría</p>
                        <p className="text-2xl font-bold text-green-600">#{currentUser.categoryRank}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Posición general</p>
                        <p className="text-2xl font-bold text-green-600">#{currentUser.overallRank}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Selector de categorías */}
                <ScrollArea className="w-full whitespace-nowrap rounded-md border mb-8">
                  <div className="flex p-4">
                    {["A", "B", "C", "D"].map((category) => (
                      <Button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        variant={activeCategory === category ? "default" : "outline"}
                        className={`${
                          activeCategory === category ? "bg-green-600 text-white" : "text-green-600"
                        } mx-2 flex-shrink-0`}
                      >
                        Categoría {category}
                      </Button>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>

                {/* Tabla de ranking */}
                <Card className="bg-white shadow-md rounded-xl overflow-hidden">
                  <CardContent className="p-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Posición</TableHead>
                          <TableHead>Jugador</TableHead>
                          <TableHead className="text-right">UTR</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rankingData[activeCategory].map((player, index) => (
                          <TableRow
                            key={player.id}
                            className={`${player.isCurrentUser ? "bg-green-100" : ""} cursor-pointer hover:bg-gray-50`}
                            onClick={() => handlePlayerClick(player.id)}
                          >
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="relative">
                                  <Image
                                    src={player.photo || "/placeholder.svg"}
                                    alt={player.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                  />
                                  {player.isCurrentUser && (
                                    <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-4 h-4 border-2 border-white"></div>
                                  )}
                                </div>
                                <span className={player.isCurrentUser ? "font-semibold" : ""}>{player.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{player.utr}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

