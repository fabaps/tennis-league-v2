"use client"

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { RankingData } from "../utils/types";

interface UserProfileCardProps {
  user: RankingData;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <Card className="mb-6 bg-white shadow-md rounded-xl overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Image
            src={user.photo || "/placeholder.svg"}
            alt={user.name}
            width={70}
            height={70}
            className="rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-lg text-gray-600">Categoría {user.category}</p>
          </div>
        </div>
        <div className="mt-3 flex justify-between">
          <div className="text-center">
            <p className="text-sm text-gray-500">Posición en categoría</p>
            <p className="text-2xl font-bold text-green-600">
              #0
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Posición general</p>
            <p className="text-2xl font-bold text-green-600">
              #0
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
