import { Trophy } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext } from "react";

import { formatCurrency, trimWallet } from "@/lib/utils";
import { UserContext } from "@/providers/user";
import ROUTES from "@/routes";

const ProfileCard: React.FC = () => {
  const navigation = useRouter();
  const searchParams = useSearchParams();
  const { rank } = useContext(UserContext);

  const search = searchParams.get("search");

  const isSearchOpen = (search?.length ?? -1) >= 0;

  const goToProfile = () =>
    navigation.push(`${ROUTES.PROFILE}/${rank?.wallet_address}`);

  if (isSearchOpen) return null;

  if (!rank) return null;

  return (
    <div
      onClick={goToProfile}
      className="bg-black/60 animate-fade-up rounded-md overflow-hidden border-2 border-[var(--primary)] backdrop-blur-xs shadow-[0_0_20px_var(--primary)] p-4"
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-[0_0_15px_var(--primary)] flex-shrink-0">
          <Image
            src={rank?.user_profile_picture ?? "/images/avatar/avatar1.png"}
            alt={`profile_${rank?.wallet_address}`}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
            <h2 className="text-md text-white">
              {trimWallet(rank?.wallet_address) || "Loading..."}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-row items-center gap-1">
              <Trophy className="w-4 h-4 text-[yellow]" />
              <span className="text-white text-xs">Rank: #{rank?.ranking}</span>
            </div>

            <div className="flex flex-row items-center gap-1">
              <span className="text-white text-xs">
                Gains: {formatCurrency(rank?.total_realized_gains)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
