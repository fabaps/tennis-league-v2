import { User } from "@/types/user";

export const calculateRankingByUTR = (loguedUserUtr: string, users: User[]) => {
  const userUtrNumber = parseFloat(loguedUserUtr);
  const sortedUsers = users
    .map((user) => Number(user.utr))
    .sort((a, b) => b - a);
  const rankingPosition = sortedUsers.indexOf(userUtrNumber) + 1;

  return rankingPosition;
};
