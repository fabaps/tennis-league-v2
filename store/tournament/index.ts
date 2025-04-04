import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getAllTournaments } from "@/firebase/tournaments";
import { Tournament } from "@/types/tournament";

interface UserStoreType {
  tournaments: Tournament[];
  loading: boolean;
  error: string | null;
  fetchTournaments: () => Promise<void>;
  clearTournaments: () => void;
}

export const useTournamentStore = create<UserStoreType>()(
  persist(
    (set) => ({
      tournaments: [],
      loading: true,
      error: null,
      fetchTournaments: async () => {
        set({ loading: true, error: null });
        try {
          const fetchedTournaments = await getAllTournaments();
          set({ tournaments: fetchedTournaments, loading: false });
        } catch (error) {
          console.error("Error fetching tournaments in store:", error);
          set({
            tournaments: [],
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to load tournaments",
          });
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
      name: "users-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useTournament = () => {
  const { tournaments, loading, error, fetchTournaments, clearTournaments } =
    useTournamentStore();
  return { tournaments, loading, error, fetchTournaments, clearTournaments };
};
