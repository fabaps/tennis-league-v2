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
  wallet?: string;
}
export const getUserRank = async ({ wallet }: GetUserRank) => {
  try {
    if (!wallet) return null;

    const request = await fetch(`${API_URL}/users/get/${wallet}`);
    const data = (await request.json()) as Rank[];
    return data?.[0];
  } catch (error) {
    console.error(error);
  }
};
