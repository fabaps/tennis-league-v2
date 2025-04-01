import { Torneo } from "@/app/torneos/types";
import { db } from "@/config";
import { collection, DocumentData, getDocs, QuerySnapshot, Timestamp } from "firebase/firestore";
/**
   * Formatea una Timestamp de Firebase en una cadena de fecha en formato dd de MMMM [de] yyyy [a las hh:mm]
   * @param timestamp Timestamp de Firebase
   * @param showTime Mostrar hora en el formato de salida
   * @param showYear Mostrar año en el formato de salida (opcional, por defecto true)
   */

export function formatFirebaseTimestamp(timestamp: Timestamp, showTime = false, showYear = true) {

  
  
  if (!timestamp || !timestamp.seconds || !timestamp.nanoseconds) {
      return "Fecha inválida";
    }
  
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
  
    // Formatear fecha en español
    const formattedDate = date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: showYear ? "numeric" : undefined,
    });
  
    if (showTime) {
      const formattedTime = date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
  
      return `${formattedDate} a las ${formattedTime}`;
    }
  
    return formattedDate;
  }
export async function getAllTournaments(): Promise<Torneo[]> {
    try {
      const tournamentsCollection = collection(db, 'tournaments');
      const tournamentsSnapshot: QuerySnapshot<DocumentData> = await getDocs(tournamentsCollection);
  
      const tournaments: Torneo[] = [];
  
      tournamentsSnapshot.forEach((doc) => {
        const tournamentData = doc.data();
        tournaments.push({
          id: doc.id,
          name: tournamentData.name || '', 
          image: tournamentData.image || '',
          startDate: tournamentData.startDate as Timestamp,
          openRegistration: tournamentData.openRegistration || false,
          price: tournamentData.price || '',
          promotionPrice: tournamentData.promotionPrice || '',
          promotion: tournamentData.promotion || null,
          description: tournamentData.description || '',
          organizer: tournamentData.organizer || '',
          format: tournamentData.format || '',
          stages: tournamentData.stages || [],
          registeredPlayers: tournamentData.registeredPlayers || []
        });
      });
  
      return tournaments;
    } catch (error) {
      console.error("Error al obtener torneos:", error);
      return [];
    }
  }