import { RankingData } from "./types";

export const CATEGORIES = ["MAYOR", "A", "B", "C", "D"] as const;
export type Category = (typeof CATEGORIES)[number];

export const getCategory = (user: { utr: number }): Category => {
  if (!user || typeof user.utr !== "number") {
    return "D";
  }

  const utr = user.utr;

  if (utr >= 11) {
    return "MAYOR";
  } else if (utr >= 9) {
    return "A";
  } else if (utr >= 7) {
    return "B";
  } else if (utr >= 5) {
    return "C";
  }
  return "D";
};

// Función auxiliar para obtener las categorías como array mutable
export const getCategoriesArray = (): string[] => {
  return [...CATEGORIES];
};
