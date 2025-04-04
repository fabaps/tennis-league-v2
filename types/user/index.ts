export interface AuthUser {
  uid: string;
  email: string;
  provider: string;
  phone?: string;
  picture?: string;
  gender: string;
  lastName: string;
  firstName: string;
  role: string;
}

export interface RankingUser {
  id: string;
  utr: string | number;
  name: string;
  photo?: string;
  category: string;
  isCurrentUser?: boolean;
}

export type User = Partial<AuthUser> & RankingUser;
