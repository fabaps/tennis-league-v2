"use client";
import { UserContext } from "@/providers/user";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface GoToSearchProps {
  isSearchOpen: boolean;
  wallet: string | null;
}
export const useGoToSearch = ({ isSearchOpen }: GoToSearchProps) => {
  const navigation = useRouter();

  const handler = () => {
    if (isSearchOpen) {
      const params = new URLSearchParams();
      navigation.push("?" + params.toString());
      return;
    }

    const params = new URLSearchParams();
    params.append("search", "");

    navigation.push("?" + params.toString());
  };

  return handler;
};

export const useOnChangeSearch = () => {
  const navigation = useRouter();

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams();
    params.append("search", e.target.value);
    navigation.push("?" + params.toString());
  };

  return handler;
};

export const useLogout = () => {
  const navigation = useRouter();
  const { setUserRank } = useContext(UserContext);

  const handler = () => {
    localStorage.removeItem("wallet");
    setUserRank(undefined);
    navigation.push("/");
  };

  return handler;
};
