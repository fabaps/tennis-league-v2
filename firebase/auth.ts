import { auth } from "@/config";
import { 
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
  signOut
} from "firebase/auth";

let recaptchaVerifier: RecaptchaVerifier | null = null;
let confirmationResult: any = null;

export const clearRecaptcha = () => {
  if (recaptchaVerifier) {
    recaptchaVerifier.clear();
    recaptchaVerifier = null;
  }
};

export const initializeRecaptcha = () => {
  try {
    clearRecaptcha();

    if (typeof window !== 'undefined') {
      const container = document.getElementById('sign-in-button');
      if (!container) {
        throw new Error("No se encontró el contenedor del reCAPTCHA");
      }

      recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA resuelto');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expirado');
          clearRecaptcha();
        }
      });

      return recaptchaVerifier;
    }
    return null;
  } catch (error) {
    console.error('Error al inicializar reCAPTCHA:', error);
    return null;
  }
};

export const sendOTP = async (phoneNumber: string): Promise<boolean> => {
  try {
    console.log('Iniciando envío de OTP...');
    const verifier = initializeRecaptcha();
    if (!verifier) {
      throw new Error("No se pudo inicializar el reCAPTCHA");
    }
    console.log('reCAPTCHA inicializado');
    
    confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
    console.log('OTP enviado correctamente');
    return true;
  } catch (error) {
    console.error("Error al enviar OTP:", error);
    clearRecaptcha();
    throw error;
  }
};

export const verifyOTP = async (otp: string): Promise<boolean> => {
  try {
    if (!confirmationResult) {
      throw new Error("No se encontró resultado de confirmación");
    }
    const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, otp);
    await signInWithCredential(auth, credential);
    clearRecaptcha();
    return true;
  } catch (error) {
    console.error("Error al verificar OTP:", error);
    clearRecaptcha();
    throw error;
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    clearRecaptcha();
    return true;
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return false;
  }
};
