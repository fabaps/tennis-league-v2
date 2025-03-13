"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { useUsersStore } from "@/store/useUsers";

// Datos de ejemplo para el ranking (mantenemos los mismos)

// Datos de ejemplo para el usuario actual
const currentUser = {
  id: "1",
  name: "Juan Pérez",
  photo:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.39%20-%20An%20eleventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20-oJWiw24SazV4nI40VBn9FGsHL4XYPr.webp",
  category: "A",
  categoryRank: 8,
  overallRank: 8,
};

const getCategory = (user: { utr: number }) => {
  if (!user || typeof user.utr !== "number") {
    return "D";
  }

  const utr = user.utr;

  if (utr >= 11) {
    return "MAYOR";
  } else if (utr >= 9) {
    return "A";
  } else if (utr >= 6) {
    return "B";
  } else if (utr >= 3) {
    return "C";
  } else {
    return "D";
  }
};

export default function RankingPage() {
  const router = useRouter();
  const {
    loading: loadingUsers,
    error,
    fetchUsers,
    users,
  } = useUsersStore((state) => state);
  const [activeCategory, setActiveCategory] = useState("MAYOR");
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchUsers();
  }, [fetchUsers]);

  // Evitar renderizado en el servidor
  if (!mounted) {
    return null;
  }

  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
    if (isSearching) {
      setSearchQuery("");
    }
  };

  const handlePlayerClick = (playerId: string) => {
    router.push(`/profile?id=${playerId}`);
  };

  const filteredUsers = users.filter(
    (user) => getCategory(user) === activeCategory
  );
  console.log("Active Category:", activeCategory);
  console.log("Users:", users);
  console.log("Filtered Users:", filteredUsers);

  const categories = ["MAYOR", "A", "B", "C", "D"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header
          title="Ranking GTL"
          showSearch={true}
          onSearchToggle={handleSearchToggle}
          isSearching={isSearching}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          className="bg-[#245A4C] shadow-md"
        />
      </div>

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
                        {users
                          .filter((player) =>
                            player.name
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                          )
                          .map((player) => {
                            const category = getCategory(player);
                            return (
                              <TableRow
                                key={`${category}-${player.id}`}
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handlePlayerClick(player.id)}
                              >
                                <TableCell className="font-medium">
                                  Categoría {category}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <div className="relative flex-shrink-0">
                                      <Image
                                        src={player.photo || "/placeholder.svg"}
                                        alt={player.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full w-10 h-10 object-cover"
                                      />
                                      {player.isCurrentUser && (
                                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-4 h-4 border-2 border-white"></div>
                                      )}
                                    </div>
                                    <span
                                      className={`${
                                        player.isCurrentUser
                                          ? "font-semibold"
                                          : ""
                                      } truncate`}
                                    >
                                      {player.name}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  {player.utr}
                                </TableCell>
                              </TableRow>
                            );
                          })}
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
                        <h2 className="text-2xl font-bold text-gray-900">
                          {currentUser.name}
                        </h2>
                        <p className="text-lg text-gray-600">
                          Categoría {currentUser.category}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">
                          Posición en categoría
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          #{currentUser.categoryRank}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">
                          Posición general
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          #{currentUser.overallRank}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Selector de categoría */}
                <div className="flex gap-2 overflow-x-auto pb-4">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        activeCategory === category ? "default" : "outline"
                      }
                      onClick={() => setActiveCategory(category)}
                      className={`flex-shrink-0 font-semibold min-w-[100px] ${
                        activeCategory === category
                          ? "bg-green-600 hover:bg-green-700 text-white shadow-md"
                          : "border-green-600 text-green-600 hover:bg-green-50"
                      }`}
                    >
                      {category === "MAYOR" ? "Mayor" : `Categoría ${category}`}
                    </Button>
                  ))}
                </div>

                {/* Tabla de ranking */}
                <Card className="bg-white shadow-md rounded-xl overflow-hidden">
                  <CardContent className="p-0">
                    {loadingUsers ? (
                      <div className="flex justify-center items-center py-4">
                        Loading...
                      </div>
                    ) : error ? (
                      <div className="flex justify-center items-center py-4 text-red-500">
                        {error}
                      </div>
                    ) : filteredUsers.length === 0 ? (
                      <div className="flex justify-center items-center py-4">
                        No hay jugadores en esta categoría
                      </div>
                    ) : (
                      <div>
                        <Table>
                          <TableHeader className="bg-white">
                            <TableRow>
                              <TableCell className="w-12 px-3 text-center">#</TableCell>
                              <TableCell className="min-w-[200px] px-3">Jugador</TableCell>
                              <TableCell className="w-20 px-6 text-right">UTR</TableCell>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredUsers
                              .sort((a, b) => (b.utr || 0) - (a.utr || 0))
                              .map((user, index) => (
                                <TableRow
                                  key={user.id}
                                  className={`${
                                    user.id === currentUser.id
                                      ? "bg-green-100"
                                      : ""
                                  } cursor-pointer hover:bg-gray-50`}
                                  onClick={() => handlePlayerClick(user.id)}
                                >
                                  <TableCell className="w-12 px-3 text-center">
                                    {index + 1}
                                  </TableCell>
                                  <TableCell className="min-w-[200px] px-3">
                                    <div className="flex items-center gap-2">
                                      <div className="relative flex-shrink-0">
                                        <Image
                                          src={user.photo || "/placeholder.svg"}
                                          alt={user.name}
                                          width={28}
                                          height={28}
                                          className="rounded-full w-7 h-7 object-cover"
                                        />
                                        {user.id === currentUser.id && (
                                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-2.5 h-2.5 border-2 border-white"></div>
                                        )}
                                      </div>
                                      <span
                                        className={`${
                                          user.id === currentUser.id
                                            ? "font-semibold"
                                            : ""
                                        } truncate text-sm`}
                                      >
                                        {user.name}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="w-20 px-6 text-right text-sm">
                                    {user.utr}
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
