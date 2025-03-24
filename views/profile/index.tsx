"use client";
import {
  BadgeDollarSign,
  ChartSpline,
  CircleDollarSign,
  ArrowLeftToLine,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { TwitterShareButton } from "react-share";

import View from "@/components/layout/view";
import Background from "@/components/ui/background";
import { Button } from "@/components/ui/button";
import { SHARE_DOMAIN } from "@/config";
import { useUserRank } from "@/hooks/rank";
import { formatCurrency, trimWallet } from "@/lib/utils";

import StatItem from "./components/statItem";
import getOGTitle from "./tools";
import { useCurrentWalletAddress } from "@/hooks/wallet";
import Link from "next/link";
import ROUTES from "@/routes";

interface ProfileViewProps {
  wallet?: string | null;
}
const ProfileView: React.FC<ProfileViewProps> = ({ wallet }) => {
  const { userRank } = useUserRank({ wallet });
  const { wallet: currentWallet } = useCurrentWalletAddress();

  const profileURL = `${SHARE_DOMAIN}${ROUTES.PROFILE}/${wallet}`;
  const isTheSameUser = currentWallet === wallet;

  return (
    <>
      <Background bDir="t" />

      <View className="pt-15 items-center justify-center">
        <div className="animate-fade-up w-full">
          <Link href={ROUTES.LEADERBOARD}>
            <Button className="mb-2">
              <ArrowLeftToLine className="text-primary" />
              Back to leaderboard
            </Button>
          </Link>

          <div className="p-5 w-full bg-black/50 border-2 rounded-md backdrop-blur-xs tracking-wide border-[white] shadow-[0_0_5px_white,_inset_0_0_5px_white]">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="rounded-full overflow-hidden border-2 border-white w-[150px] h-[150px]">
                <Image
                  src="/images/avatar/avatar1.png"
                  alt="Profile"
                  width={150}
                  height={150}
                />
              </div>

              <div className="flex flex-col items-start justify-center gap-4">
                <div>
                  <h1 className="text-white text-xl">
                    {trimWallet(wallet, 3)}
                  </h1>
                  <p className="text-white text-xs">
                    {`Last Update: ${new Date(
                      userRank?.stat_date ?? 0
                    ).toLocaleString()}`}
                  </p>
                </div>

                <div className="flex flex-col items-center sm:flex-row gap-4">
                  <TwitterShareButton
                    url={profileURL}
                    title={getOGTitle({ rank: userRank?.ranking })}
                    className="flex flex-row h-10 items-center justify-center rounded-md overflow-hidden"
                    style={{
                      backgroundColor: "#000",
                      minWidth: "140px",
                      width: "100%",
                      height: "35px",
                      border: "2px solid white",
                    }}
                  >
                    <span className="text-white text-xs">Share in</span>
                    <Image
                      src="/images/logo_x.png"
                      alt="Twitter Logo"
                      width={24}
                      height={24}
                    />
                  </TwitterShareButton>

                  {isTheSameUser && (
                    <Button variant="outline">Update wallet</Button>
                  )}
                </div>
              </div>
            </div>

            <div
              className="grid gap-4 mt-6 w-full justify-between sm:justify-center"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              }}
            >
              <StatItem
                main
                title="Rank"
                value={`#${userRank?.ranking}`}
                icon={<Trophy className="text-white" />}
              />
              <StatItem
                title="Realized Gains"
                value={formatCurrency(userRank?.total_realized_gains)}
                icon={<CircleDollarSign className="text-white" />}
              />
              <StatItem
                title="Unrealized Gains"
                value={formatCurrency(userRank?.total_realized_gains)}
                icon={<BadgeDollarSign className="text-white" />}
              />
              <StatItem
                title="PNL"
                value={formatCurrency(userRank?.total_pnl)}
                icon={<ChartSpline className="text-white" />}
              />
            </div>
          </div>
        </div>
      </View>
    </>
  );
};

export default ProfileView;
