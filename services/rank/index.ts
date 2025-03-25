import { API_URL } from "@/config";
import { Rank } from "@/types/rank";

export const getRanks = async () => {
  try {
    const request = await fetch(`${API_URL}/users/ranks`);
    const data = await request.json();
    return data as Rank[];
  } catch (error) {
    console.error(error);
  }
};

interface GetUserRank {
  wallet?: string | null;
}
export const getUserRank = async ({ wallet }: GetUserRank) => {
  try {
    if (!wallet) throw new Error("Wallet address is required to get user rank");

    const request = await fetch(`${API_URL}/users/get/${wallet}`);
    const data = (await request.json()) as Rank[];
    return data?.[0];
  } catch (error) {
    console.error(error);
  }
};

export const updateUserRank = async ({ wallet }: GetUserRank) => {
  try {
    if (!wallet)
      throw new Error("Wallet address is required to update user rank");

    const request = await fetch(`${API_URL}/users/update/${wallet}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wallet_address: wallet }),
    });
    const data = (await request.json()) as Rank[];
    const userRank = data?.[0];

    return userRank;
  } catch (error) {
    console.error(error);
  }
};
