// Tipo base para usuarios autenticados
export interface AuthUser {
  uid: string;
  email: string;
  provider: string;
  phone?: string;
  picture?: string;
}

// Tipo para usuarios en el ranking
export interface RankingUser {
  id: string;
  name: string;
  photo?: string;
  category: string;
  categoryRank: number;
  overallRank: number;
  utr: number;
  isCurrentUser?: boolean;
}

// Tipo completo que combina ambos
export type User = Partial<AuthUser> & RankingUser;
