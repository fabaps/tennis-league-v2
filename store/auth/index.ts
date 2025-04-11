import { User as UserFirebase } from "firebase/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  getCurrentUser as getCurrentUserFirebase,
  logoutUser as logoutUserFirebase,
} from "@/firebase/auth";
import { getUserById } from "@/firebase/users";
import { getCategory } from "@/lib/category";
// import { RankingData } from "@/types/ranking";
import { RankingUser, User } from "@/types/user";

interface AuthState {
  loading: boolean;
  error: string | null;
  phoneNumber: string | null;
  currentUser:
    | RankingUser
    | null;
  firebaseUserData: User | null;
  isAuthenticated: boolean;
  getCurrentUser: () => UserFirebase | null;
  getPersonalInfo: (id: string) => Promise<User | null>;
  fetchCurrentUserData: (
    credential: Partial<User> | Partial<UserFirebase>
  ) => Promise<User | null>;
  setPhoneNumber: (phone: string) => void;
  logout: (callback?: () => void) => Promise<boolean>;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      loading: false,
      error: null,
      phoneNumber: null,
      currentUser: null,
      firebaseUserData: null,
      isAuthenticated: false,
      getCurrentUser: getCurrentUserFirebase,
      setPhoneNumber: (phone) => set({ phoneNumber: phone }),
      getPersonalInfo: async (id: string) => {
        try {
          return await getUserById(id);
        } catch (error) {
          console.error("Error getting user info:", error);
          return null;
        }
      },

      fetchCurrentUserData: async (
        credential: Partial<User> | Partial<UserFirebase> | null = null
      ) => {
        const firebaseUser = credential ?? getCurrentUserFirebase();

        if (!firebaseUser?.uid) {
          set({ isAuthenticated: false, currentUser: null });
          return null;
        }

        set({ loading: true, error: null });

        try {
          const userData = await getUserById(firebaseUser.uid as string);

          if (userData) {
            set({
              currentUser: {
                id: userData.id,
                utr: userData.utr,
                name: userData.name,
                phone: userData.phone,
                gender: userData.gender,
                lastName: userData.lastName,
                picture: userData.picture || "",
                firstName: userData.firstName,
                category: getCategory(userData),
                email: (firebaseUser.email as string) || "",
              },

              isAuthenticated: true,
              loading: false,
              error: null,
            });

            return userData;
          } else {
            set({
              loading: false,
              error: "No se encontraron datos del usuario",
              isAuthenticated: false,
              currentUser: null,
            });
            return null;
          }
        } catch (error) {
          console.error("Error fetching current user data:", error);
          set({
            loading: false,
            error: "Error al obtener datos del usuario",
            currentUser: null,
            isAuthenticated: false,
          });
          return null;
        }
      },

      logout: async (callback?: () => void) => {
        set({ loading: true, error: null });
        try {
          const result = await logoutUserFirebase();
          set({
            loading: false,
            phoneNumber: null,
            currentUser: null,
            isAuthenticated: false,
            error: null,
          });

          if (callback) callback();
          return result;
        } catch (error) {
          set({
            loading: false,
            error: (error as Error).message || "Error al cerrar sesión",
          });
          return false;
        }
      },

      setError: (error) => set({ error }),
    }),

    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        phoneNumber: state.phoneNumber,
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
