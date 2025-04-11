"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";

import {
  CATEGORIES,
  getCategoriesArray,
  getCategory,
} from "./utils/categories";

import { useUsersStore } from "@/store/users";
import { RankingTable } from "./components/RankingTable";
import { UserProfileCard } from "./components/UserProfileCard";
import { CategorySelector } from "./components/CategorySelector";
import Header from "@/components/header";
import { useAuthStore } from "@/store/auth";
import { RankingUser } from "@/types/user";
import { useTournamentStore } from "@/store/tournament";
import { calculateRankingByUTR } from "@/utils/ranking";

export default function RankingPage() {
  const router = useRouter();
  const {
    error,
    loading: loadingUsers,
    fetchUsers,
    users,
  } = useUsersStore((state) => state);
  const {fetchTournaments} = useTournamentStore((state) => state)
  const { currentUser } = useAuthStore((state) => state);
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

      fetchTournaments();
    }
  }, [fetchUsers, fetchTournaments, mounted]);

  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
    if (isSearching) {
      setSearchQuery("");
    }
  };

  const handlePlayerClick = (playerId: string) => {
    router.push(`/profile?id=${playerId}`);
  };

  const rankingUsers: RankingUser[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    picture: typeof user.photo === 'string' ? user.photo : undefined,
    category: getCategory(user),
    utr: user.utr,
    firstName: user.firstName,
    lastName: user.lastName,
    isCurrentUser: user.id === currentUser?.id
  }));

  const filteredUsers = rankingUsers.filter(
    (user) => user.category === activeCategory
  );
  const usersInCategory = rankingUsers.filter(
    (user) => user.category === getCategory(currentUser as RankingUser)
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
        <div>
          {isSearching ? (
            <div
              key="search"
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
                    currentUser={currentUser || undefined}
                    onPlayerClick={handlePlayerClick}
                  />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div
              key="ranking"
              className="space-y-1"
            >
              {currentUser && (
                <UserProfileCard
                  user={currentUser}
                  userCategoryRank={calculateRankingByUTR(
                    String(currentUser.utr || 0),
                    usersInCategory.map(user => ({ utr: String(user.utr || 0) }))
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
                      currentUser={currentUser || undefined}
                      onPlayerClick={handlePlayerClick}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}