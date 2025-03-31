import { useContext, useEffect, useState } from "react";

import { Rank } from "@/types/rank";
import { getRanks, getUserRank } from "@/services/rank";
import { UserContext } from "@/providers/user";

export const useRanks = () => {
  const { rank } = useContext(UserContext);
  const [rankData, setRankData] = useState<Rank[] | null | undefined>();

  const refresh = async () => {
    const ranks = await getRanks();
    setRankData(ranks ?? null);
  };

  const userWallet = rank?.wallet_address
  const userRanking = rank?.ranking
  const trigger = `${userWallet}-${userRanking}`

  useEffect(() => {
    refresh();
  }, [trigger]);

  return {
    setRankData,
    rankData,
    refresh,
  };
};

interface UseUseRank {
  wallet?: string | null;
}
export const useUserRank = ({ wallet }: UseUseRank) => {
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
    userRank,
    setUserRank,
  };
};
