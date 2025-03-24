"use client";
import ROUTES from "@/routes";
import { getUserRank } from "@/services/rank";
import { Rank } from "@/types/rank";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useCurrentWalletAddress = () => {
  const [wallet, setWallet] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const storageWallet = localStorage.getItem("wallet") || "";
    setWallet(storageWallet);
  }, [pathname]);

  return { wallet, setWallet };
};

export const useProfileURL = () => {
  const { wallet } = useCurrentWalletAddress();
  const profileURL = `${ROUTES.PROFILE}/${wallet}`;

  return profileURL;
};

export const useCurrentUserRankData = () => {
  const { wallet } = useCurrentWalletAddress();
  const [userRank, setUserRank] = useState<Rank | null | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      if (!wallet) return;

      const rank = await getUserRank({ wallet });
      setUserRank(rank);
    };

    fetchData();
  }, [wallet]);

  return {
    wallet,
    userRank,
    setUserRank,
  };
};
