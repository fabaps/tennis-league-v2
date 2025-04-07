export interface AuthUser {
  [index: string]: string | number | undefined | null;
  uid: string;
  role: USER_ROLE;
  email: string;
  phone?: string;
  provider: string;
  gender: string;
  picture?: string;
  lastName: string;
  firstName: string;
}

export enum USER_ROLE {
  ADMIN = "admin",
  PLAYER = "player",
}

export interface RankingUser {
  [index: string]: string | number | undefined | null | boolean;
  id: string;
  utr: string | number;
  name: string;
  photo?: string;
  category: string;
  isCurrentUser?: boolean;
}

export type User = Partial<AuthUser> & RankingUser;
