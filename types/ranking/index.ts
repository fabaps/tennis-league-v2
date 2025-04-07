export interface RankingData {
  [index: string]: string | number | undefined | null;
  id: string;
  name: string;
  picture?: string;
  category: string;
  utr: string | number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  gender?: string;
}
