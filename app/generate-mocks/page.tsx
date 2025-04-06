'use client'
import { useEffect, useState } from 'react'



import { collection, addDoc } from "firebase/firestore";
import { db } from '@/config';
import { useRouter } from 'next/navigation';

// Puedes definir el tipo si lo necesitas, aquí va un ejemplo genérico:
type Tournament = {
  name: string;
  location?: string;
  date?: string;
  [key: string]: any; // Para permitir campos adicionales
};

export async function createTournament(tournamentData: Tournament): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "tournaments"), tournamentData);
 
    return docRef.id;
  } catch (error) {
    console.error("❌ Error al crear el torneo:", error);
    throw error;
  }
}



const generateMocks = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initMocks = async () => {
        const res = await createTournament({
            "description": "Se viene el primer ranking GTL, este evento es para reunir a la comunidad de tenistas y proporcionarles una aplicación para recopilar datos y estadísticas que permitan mejorar la experiencia del tenis en Guatemala.",
            "format": "Round Robin + Eliminación directa",
            "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92a8bdb0-94d8-488a-a82c-c311d8a06366.jpg-TQfZLagSUReUH6XRtC2fyvm3287mxm.jpeg",
            "name": "Primer Ranking GTL",
            "openRegistration": true,
            "organizer": "Guatemalan Tennis League",
            "price": 15000,
            "promotion": {
              "active": true,
              "discount": 25,
              "limitDate": "2025-04-18T06:00:00.000Z",
              "promotionPrice": 12000
            },
            "registeredPlayers": ["abcd123"],
            "stages": [
              {
                "date": "2025-05-18T06:00:00.000Z",
                "name": "Round Robin",
                "note": "Jugadores eligen canchas y horarios"
              },
              {
                "date": "2025-05-21T06:00:00.000Z",
                "name": "Cuartos de Final",
                "note": "Jugadores eligen canchas y horarios"
              },
              {
                "date": "2025-05-23T06:00:00.000Z",
                "name": "Semifinales",
                "note": "Jugadores eligen canchas y horarios"
              },
              {
                "date": "2025-05-25T06:00:00.000Z",
                "name": "Final",
                "note": "En canchas patrocinadas"
              }
            ],
            "startDate": "2025-05-05T06:00:00.000Z"
          })
          if (res) {
            setLoading(false)
          }
          return res
    }
    if (process.env.NODE_ENV === 'development') {
      initMocks();
    } else {
      router.replace('/')
    }
  }, [])

  return (
    <div className="flex items-center justify-center h-screen">
      {loading && <h1 className="text-2xl font-bold">Generando mocks... 🛠️</h1>}
      {!loading && <h1 className="text-2xl font-bold">Mocks generados</h1>}
    </div>
  )
}

export default generateMocks