export interface RankingData {
  [index: string]: string | number | undefined | null;
  id: string;
  name: string;
  picture?: string;
  category: string;
  utr: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  gender?: string;
}
