"use client";
import { createContext } from "react";

import { Rank } from "@/types/rank";
import { useCurrentUserRankData } from "@/hooks/wallet";

interface UserContextProps {
  wallet?: string | null;
  setUserRank: React.Dispatch<React.SetStateAction<Rank | null | undefined>>;
  rank?: Rank | null;
}

const defaultUserContext: UserContextProps = {
  wallet: undefined,
  setUserRank: () => null,
  rank: undefined,
};

export const UserContext = createContext<UserContextProps>(defaultUserContext);

interface UserProviderProps {
  children: React.ReactNode;
}
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { wallet, userRank, setUserRank } = useCurrentUserRankData();

  return (
    <UserContext.Provider
      value={{
        wallet,
        setUserRank,
        rank: userRank,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
