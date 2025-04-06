import { User as UserFirebase } from "firebase/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  getCurrentUser as getCurrentUserFirebase,
  logoutUser as logoutUserFirebase,
  sendOTP as sendOTPFirebase,
  verifyOTP as verifyOTPFirebase,
} from "@/firebase/auth";
import { getUserById } from "@/firebase/users";
import { getCategory } from "@/lib/category";
import { RankingData } from "@/types/ranking";
import { User } from "@/types/user";

interface AuthState {
  loading: boolean;
  error: string | null;
  phoneNumber: string | null;
  currentUser:
    | (RankingData & {
        firstName?: string;
        lastName?: string;
      })
    | null;
  firebaseUserData: User | null;
  isAuthenticated: boolean;
  getCurrentUser: () => UserFirebase | null;
  getPersonalInfo: (id: string) => Promise<User | null>;
  fetchCurrentUserData: () => Promise<void>;
  setPhoneNumber: (phone: string) => void;
  sendOTP: (phone: string) => Promise<boolean>;
  verifyOTP: (code: string) => Promise<boolean>;
  logout: (callback: () => void) => Promise<boolean>;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
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

      fetchCurrentUserData: async () => {
        const firebaseUser = getCurrentUserFirebase();

        if (!firebaseUser?.uid) {
          set({ isAuthenticated: false, currentUser: null });
          return;
        }

        set({ loading: true, error: null });

        try {
          const userData = await getUserById(firebaseUser.uid);

          if (userData) {
            set({
              currentUser: {
                id: userData.id,
                name: userData.name,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: firebaseUser.email || "",
                phone: userData.phone,
                photo: userData.photo || "",
                gender: userData.gender,
                category: getCategory(userData),
                utr: userData.utr,
              },

              isAuthenticated: true,
              loading: false,
              error: null,
            });
          } else {
            set({
              loading: false,
              error: "No se encontraron datos del usuario",
              isAuthenticated: false,
              currentUser: null,
            });
          }
        } catch (error) {
          console.error("Error fetching current user data:", error);
          set({
            loading: false,
            error: "Error al obtener datos del usuario",
            currentUser: null,
            isAuthenticated: false,
          });
        }
      },

      sendOTP: async (phone) => {
        set({ loading: true, error: null });
        try {
          const result = await sendOTPFirebase(phone);
          set({ loading: false });
          return result;
        } catch (error) {
          set({
            loading: false,
            error: (error as Error).message || "Error al enviar OTP",
          });
          throw error;
        }
      },

      verifyOTP: async (code) => {
        set({ loading: true, error: null });
        try {
          const result = await verifyOTPFirebase(code);
          if (result) {
            await get().fetchCurrentUserData();
          }
          set({ loading: false });
          return result;
        } catch (error) {
          set({
            loading: false,
            error: (error as Error).message || "Error al verificar OTP",
          });
          throw error;
        }
      },

      logout: async (callback: () => void) => {
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
          callback();
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
