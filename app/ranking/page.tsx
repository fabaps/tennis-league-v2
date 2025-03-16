"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { RankingTable } from "./components/RankingTable";
import { CategorySelector } from "./components/CategorySelector";
import { UserProfileCard } from "./components/UserProfileCard";
import { CATEGORIES, getCategoriesArray, getCategory } from "./utils/categories";
import Image from "next/image";
import { useUsersStore } from "@/store/useUsers";
import Header from "../components/Header";
import { RankingData } from "./utils/types";

// Mock del usuario actual mientras se implementa la funcionalidad real
const currentUser: RankingData = {
  id: "1",
  name: "Juan Pérez",
  photo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.39%20-%20An%20eleventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20-oJWiw24SazV4nI40VBn9FGsHL4XYPr.webp",
  category: "A",
  // categoryRank: 8,
  // overallRank: 8,
  utr: 9.5,
  // isCurrentUser: true
};

export default function RankingPage() {
  const router = useRouter();
  const {
    error,
    loading: loadingUsers,
    fetchUsers,
    users,
  } = useUsersStore((state) => state);
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchUsers();
    }
  }, [fetchUsers, mounted]);

  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
    if (isSearching) {
      setSearchQuery("");
    }
  };

  const handlePlayerClick = (playerId: string) => {
    router.push(`/profile?id=${playerId}`);
  };

  // Mock data temporal mientras se implementa la funcionalidad real
  const rankingUsers: RankingData[] = users.map(user => ({
    id: user.id,
    name: user.name,
    photo: user.photo,
    category: getCategory(user),
    // categoryRank: 0,
    // overallRank: 0,
    utr: user.utr,
    // isCurrentUser: false
  }));

  const filteredUsers = rankingUsers.filter(
    (user) => user.category === activeCategory
  );

  return (
    <div className="bg-gray-50">
      <Header 
        title="Ranking"
        showSearch={true}
        onSearchToggle={handleSearchToggle}
        isSearching={isSearching}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main className="container mx-auto px-4 pt-[20px]">
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <Card>
                <CardContent className="p-2">
                  <RankingTable
                    users={rankingUsers.filter(player =>
                      player.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )}
                    currentUser={currentUser}
                    onPlayerClick={handlePlayerClick}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="ranking"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-1"
            >
              <UserProfileCard user={currentUser} />
              <CategorySelector
                categories={getCategoriesArray()}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
              <Card>
                <CardContent className="p-2">
                  {loadingUsers ? (
                    <div className="py-1">
                      <p className="text-center">Cargando jugadores...</p>
                    </div>
                  ) : error ? (
                    <div className="py-1">
                      <p className="text-red-500 text-center">Error al cargar jugadores</p>
                    </div>
                  ) : (
                    <RankingTable
                      users={filteredUsers}
                      currentUser={currentUser}
                      onPlayerClick={handlePlayerClick}
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
