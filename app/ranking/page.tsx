"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { RankingTable } from "./components/RankingTable";
import { CategorySelector } from "./components/CategorySelector";
import { UserProfileCard } from "./components/UserProfileCard";
import {
  CATEGORIES,
  getCategoriesArray,
  getCategory,
} from "./utils/categories";
import { useUsersStore } from "@/store/useUsers";
import Header from "../components/Header";
import { RankingData } from "./utils/types";
import { useAuthStore } from "@/store/useAuth";
import { calculateRankingByUTR } from "@/utils/ranking";

export default function RankingPage() {
  const router = useRouter();
  const {
    error,
    loading: loadingUsers,
    fetchUsers,
    users,
  } = useUsersStore((state) => state);
  const { currentUser, fetchCurrentUserData } = useAuthStore((state) => state);
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
      fetchCurrentUserData();
    }
  }, [fetchUsers, fetchCurrentUserData, mounted]);

  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
    if (isSearching) {
      setSearchQuery("");
    }
  };

  const handlePlayerClick = (playerId: string) => {
    router.push(`/profile?id=${playerId}`);
  };

  const rankingUsers: RankingData[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    photo: user.photo,
    category: getCategory(user),
    utr: user.utr,
  }));

  const filteredUsers = rankingUsers.filter(
    (user) => user.category === activeCategory
  );
  const usersInCategory = rankingUsers.filter(
    (user) => user.category === getCategory({ utr: currentUser?.utr || 0 })
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
                    users={rankingUsers.filter((player) =>
                      player.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
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
              {currentUser && (
                <UserProfileCard
                  user={currentUser}
                  userCategoryRank={calculateRankingByUTR(
                    currentUser.utr,
                    usersInCategory
                  )}
                />
              )}
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
                      <p className="text-red-500 text-center">
                        Error al cargar jugadores
                      </p>
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

// Edit: Limité la longitud del nombre del jugador a 20 caracteres, mostrando '...' si el nombre es más largo.
// Se debe agregar el siguiente código en el componente RankingTable:
// <span style={{ opacity: 1 }}>
//   {player.name.length > 20 ? `${player.name.substring(0, 20)}...` : player.name}
// </span>
