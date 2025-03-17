import { create } from "zustand";
import { 
  sendOTP as sendOTPFirebase, 
  verifyOTP as verifyOTPFirebase,
  getCurrentUser as getCurrentUserFirebase,
  logoutUser as logoutUserFirebase
} from "@/firebase/auth";
import { getUserById } from "@/firebase/users";
import { User } from "@/types/user";
import { RankingData } from "@/app/ranking/utils/types";
import { getCategory } from "@/app/ranking/utils/categories";

interface AuthState {
  loading: boolean;
  error: string | null;
  phoneNumber: string | null;
  currentUser: (RankingData & { 
    firstName: string;
    lastName: string;
  }) | null;
  isAuthenticated: boolean;
  getCurrentUser: () => any;
  getPersonalInfo: (id: string) => Promise<User | null>;
  fetchCurrentUserData: () => Promise<void>;
  setPhoneNumber: (phone: string) => void;
  sendOTP: (phone: string) => Promise<boolean>;
  verifyOTP: (code: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  loading: false,
  error: null,
  phoneNumber: null,
  currentUser: null,
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
            photo: userData.photo || "",
            category: getCategory(userData),
            utr: userData.utr,
          },
          isAuthenticated: true,
          loading: false,
          error: null
        });
      } else {
        set({ 
          loading: false, 
          error: "No se encontraron datos del usuario",
          isAuthenticated: true,
          currentUser: null
        });
      }
    } catch (error) {
      console.error("Error fetching current user data:", error);
      set({ 
        loading: false, 
        error: "Error al obtener datos del usuario",
        currentUser: null,
        isAuthenticated: true
      });
    }
  },
  sendOTP: async (phone) => {
    set({ loading: true, error: null });
    try {
      const result = await sendOTPFirebase(phone);
      set({ loading: false });
      return result;
    } catch (error: any) {
      set({ 
        loading: false, 
        error: error.message || "Error al enviar OTP" 
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
    } catch (error: any) {
      set({ 
        loading: false, 
        error: error.message || "Error al verificar OTP" 
      });
      throw error;
    }
  },
  logout: async () => {
    set({ loading: true, error: null });
    try {
      const result = await logoutUserFirebase();
      set({ 
        loading: false, 
        phoneNumber: null, 
        currentUser: null,
        isAuthenticated: false,
        error: null
      });
      return result;
    } catch (error: any) {
      set({ 
        loading: false, 
        error: error.message || "Error al cerrar sesión" 
      });
      return false;
    }
  },
  setError: (error) => set({ error })
}));
