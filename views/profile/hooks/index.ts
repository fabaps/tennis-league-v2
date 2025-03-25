import { useState } from "react";

import { useCurrentWalletAddress } from "@/hooks/wallet";
import { updateUserRank } from "@/services/rank";
import { Rank } from "@/types/rank";

interface UseUpdateWallet {
  setUserRank: React.Dispatch<React.SetStateAction<Rank | null | undefined>>;
}
export const useUpdateWallet = ({ setUserRank }: UseUpdateWallet) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { wallet: currentWallet } = useCurrentWalletAddress();

  const handler = async () => {
    setIsUpdating(true);
    const request = await updateUserRank({ wallet: currentWallet });

    setUserRank(request);
    setIsUpdating(false);
  };

  return {
    handler,
    loading: isUpdating,
  };
};
