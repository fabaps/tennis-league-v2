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
