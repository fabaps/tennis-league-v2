import { Flame, LandPlot, Trophy } from "lucide-react";
import React from "react";

import { useAuthStore } from "@/store/auth";

import ProfileStatItem from "./item";

const ProfileStats: React.FC = () => {
  const { currentUser } = useAuthStore();

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <ProfileStatItem
        icon={<Trophy className="text-gray-500 size-5" />}
        label="Torneos"
        value={0}
      />

      <ProfileStatItem
        icon={<LandPlot className="text-gray-500 size-5" />}
        className="animate-delay-100"
        label="Partidos"
        value={0}
      />

      <ProfileStatItem
        value={Number(currentUser?.utr ?? 0).toFixed(2) || 0}
        icon={<Flame className="text-gray-500 size-5" />}
        className="animate-delay-200"
        label="GTR"
      />
    </div>
  );
};

export default ProfileStats;
