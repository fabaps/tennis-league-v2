import { useContext, useEffect, useState } from "react";

import { UserContext } from "@/providers/user";
import { getUserRank } from "@/services/rank";
import { isValidSolanaAddress } from "@/lib/utils";

interface UseSubmitProps {
  callback?: (wallet: string) => void;
  closeRef: React.RefObject<HTMLButtonElement | null>;
}

export const useEnterWallet = ({ callback, closeRef }: UseSubmitProps) => {
  const [walletAddress, setWalletAddress] = useState("");
  const { rank, setUserRank } = useContext(UserContext);
  const [loading, setIsLoading] = useState(false);
  const currentWallet = rank?.wallet_address;
  const rankIsMoreThanZero = Number(rank?.ranking) > 0;

  const handler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (walletAddress.length === 0) return;

    if (!isValidSolanaAddress(walletAddress)) return;

    if (closeRef.current) closeRef.current.click();

    setUserRank({
      wallet_address: walletAddress,
      ranking: 0,
      user_id: 0,
      user_stat_id: 0,
      total_unrealized_gains: 0,
      total_pnl: 0,
      total_realized_gains: 0,
      stat_date: "",
      creation_date: "",
    });

    const request = await getUserRank({ wallet: walletAddress });
    setUserRank(request);

    setIsLoading(true);
    if (callback) callback(walletAddress);

    localStorage.setItem("wallet", walletAddress);

    setWalletAddress("");
    setIsLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("REQUEST");

      if (rankIsMoreThanZero) {
        clearInterval(interval);
        return;
      }

      const request = await getUserRank({ wallet: currentWallet });
      const isMoreThanZero = Number(request?.ranking) > 0;

      if (isMoreThanZero) {
        clearInterval(interval);
        setUserRank(request);
      }
    }, 1000);

    if (!currentWallet) {
      clearInterval(interval);
      return;
    }

    return () => clearInterval(interval);
  }, [rankIsMoreThanZero, currentWallet, setUserRank]);

  return {
    walletAddress,
    setWalletAddress,
    handler,
    loading,
  };
};
