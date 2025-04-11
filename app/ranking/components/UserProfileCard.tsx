"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RankingUser } from "@/types/user";

import { RebelAvatar } from "@/components/rebelUI/RebelAvatar";
import { useUsersStore } from "@/store/users";
import { calculateRankingByUTR } from "@/utils/ranking";

interface UserProfileCardProps {
  user: RankingUser;
  userCategoryRank: string;
}

export function UserProfileCard({
  user,
  userCategoryRank = "0",
}: UserProfileCardProps) {
  
  const { users } = useUsersStore((state) => state);
  return (
    <Card className="mb-6 bg-white shadow-md rounded-xl overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <RebelAvatar
            user={user}
            size="md"
          />
          <div className="flex flex-row">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-lg text-gray-600">Categoría {user.category}</p>
            </div>
            <div className="self-end flex justify-end items-center">
              <div className="flex flex-row items-center gap-4">
                <p className="text-lg text-gray-600">GTR</p>
                <p className="text-2xl font-bold text-green-600 text-medium ">{user.utr.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex justify-between">
          <div className="text-center">
            <p className="text-sm text-gray-500">Posición en categoría</p>
            <p className="text-2xl font-bold text-green-600">
              #{userCategoryRank}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Posición general</p>
            <p className="text-2xl font-bold text-green-600">
              #{calculateRankingByUTR(String(user?.utr || 0), users.map(user => ({ utr: String(user.utr || 0)})))}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}