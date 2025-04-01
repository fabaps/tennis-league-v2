import { Torneo } from "@/app/torneos/types";
import { getAllTournaments } from "@/firebase/tournaments";
import { getAllUsers } from "@/firebase/users";
import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface UserStoreType {
  tournaments: Torneo[];
  loading: boolean;
  error: string | null;
  fetchTournaments: () => Promise<void>;
  clearTournaments: () => void
}

export const useTournamentStore = create<UserStoreType>()(
  persist(
    (set) => ({
      tournaments: [],
      loading: true,
      error: null,
      fetchTournaments: async () => {
        set({ loading: true, error: null }); // Indica que la carga ha comenzado
        try {
          const fetchedTournaments = await getAllTournaments();
          set({ tournaments: fetchedTournaments, loading: false }); // Actualiza las tareas y loading a false
        } catch (error) {
          console.error("Error fetching tournaments in store:", error);
          set({
            tournaments: [],
            loading: false,
            error: error instanceof Error ? error.message : "Failed to load tournaments",
          }); // Maneja el error y actualiza el estado
        }
      },
      clearTournaments: () => {
        set({
          tournaments: [],
          loading: false,
          error: null,
        });
      },
    }),
    
    {
      name: "users-storage", // Nombre para persistir los datos
      getStorage: () => localStorage, // Usa localStorage para la persistencia
    }
  )
);

export const useTournament = () => {
  const { tournaments, loading, error, fetchTournaments, clearTournaments } = useTournamentStore();
  return { tournaments, loading, error, fetchTournaments, clearTournaments };
};
