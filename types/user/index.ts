// Tipo base para usuarios autenticados
export interface User {
  uid: string;
  name: string;
  lastName?: string;
  email: string;
  provider: string;
  phone: string | null;
  picture: string | null;
  gender?: string;
  ranking?: string;
  category?: string;
  location?: {
    department: string;
    address: string;
  };
}

// Tipo para usuarios en el ranking
export interface RankingData {
  id: string;
  name: string;
  photo?: string;
  category: string;
  categoryRank: number;
  overallRank: number;
  utr: number;
  isCurrentUser?: boolean;
}

// Mock data para desarrollo
export const mockCurrentUser: RankingData = {
  id: "1",
  name: "Juan Pérez",
  photo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.39%20-%20An%20eleventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20-oJWiw24SazV4nI40VBn9FGsHL4XYPr.webp",
  category: "A",
  categoryRank: 8,
  overallRank: 8,
  utr: 9.5,
};
