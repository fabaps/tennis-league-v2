import { User } from "@/types/user"
import { Timestamp } from "firebase/firestore"

// Definición de tipos para mejorar la legibilidad
export interface Torneo {
    id: string
    name: string
    startDate: Timestamp
    image: string
    openRegistration: boolean
    price: number
    promotionPrice?: number
    promotion?: Promocion
    description: string
    organizer: string
    format: string
    stages: Etapa[]
    registeredPlayers: string[]
  }

  export interface Tournament extends Omit<Torneo, "registeredPlayers"> {
    registeredPlayers: User[]
  }

  interface Etapa {
    name: string
    date: Timestamp
    note: string
  }
  
  interface Promocion {
    active: boolean
    discount: string
    limitDate: Timestamp
  }
  
