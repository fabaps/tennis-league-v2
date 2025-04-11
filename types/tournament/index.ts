import { Timestamp } from "firebase/firestore";

export interface BasicTournament {
  id: string;
  name: string;
  startDate: Timestamp | string;
  image: string;
  openRegistration: boolean;
  price: number;
  promotionPrice?: number;
  promotion?: Promocion;
  description: string;
  organizer: string;
  format: string;
  stages: Etapa[];
  registeredPlayers: string[];
}

export interface Tournament extends Omit<BasicTournament, "registeredPlayers"> {
  registeredPlayers: string[];
}

interface Etapa {
  name: string;
  date: Timestamp | string;
  note: string;
}

interface Promocion {
  active: boolean;
  discount: string | number;
  limitDate: Timestamp | string;
  promotionPrice?: number;
}
