// Tipo para usuarios en el ranking
export interface RankingData {
  id: string;
  name: string;
  photo?: string;
  category: string;
  // categoryRank: number;
  // overallRank: number;
  utr: number;
  // isCurrentUser?: boolean;
}
