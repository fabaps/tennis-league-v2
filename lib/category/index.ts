export const CATEGORIES = ["MAYOR", "A", "B", "C", "D"] as const;
export type Category = (typeof CATEGORIES)[number];

export const getCategory = (user: { utr: string | number }): Category => {
  if (!user || typeof user.utr !== "number") {
    return "D";
  }

  const utr = Number(user.utr);

  if (utr >= 13) {
    return "MAYOR";
  } else if (utr > 10.5) {
    return "A";
  } else if (utr > 8.5) {
    return "B";
  } else if (utr > 6) {
    return "C";
  }
  return "D";
};

export const getCategoriesArray = (): string[] => {
  return [...CATEGORIES];
};
