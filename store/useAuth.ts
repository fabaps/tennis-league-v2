import { create } from "zustand";
import { 
  sendOTP as sendOTPFirebase, 
  verifyOTP as verifyOTPFirebase,
  getCurrentUser as getCurrentUserFirebase,
  logoutUser as logoutUserFirebase
} from "@/firebase/auth";

interface AuthState {
  loading: boolean;
  error: string | null;
  phoneNumber: string | null;
  getCurrentUser: () => any;
  setPhoneNumber: (phone: string) => void;
  sendOTP: (phone: string) => Promise<boolean>;
  verifyOTP: (code: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,
  phoneNumber: null,
  getCurrentUser: getCurrentUserFirebase,
  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
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
      set({ loading: false, phoneNumber: null });
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
