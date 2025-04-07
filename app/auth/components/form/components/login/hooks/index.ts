import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "@/config";
import { getUserById } from "@/firebase/users";
import { useAuthContext } from "@/providers/auth/hooks";
import { useAuthStore } from "@/store/auth";

import { LOGIN_STEP } from "../../../utils";
import { useRouter } from "next/navigation";
import ROUTES from "@/routes";
import { useState } from "react";

const useGoogleLogin = () => {
  const { setUtr, setCategory, setStep } = useAuthContext();
  const { getCurrentUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handler = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({ prompt: "select_account" });

    try {
      await signInWithPopup(auth, provider);

      const user = getCurrentUser();
      if (!user) {
        throw new Error("No se pudo obtener el usuario actual");
      }

      const userData = await getUserById(user.uid);

      if (!userData || !userData.firstName || !userData.lastName) {
        setStep(LOGIN_STEP.PERSONAL_INFO);
        return;
      }

      setUtr(Number(userData.utr) || 0);
      setCategory(userData.category || "");
      setStep(LOGIN_STEP.RESULT);
      router.push(ROUTES["HOME"].path);
    } catch (error) {
      console.error("Error durante el inicio de sesión con Google:", error);
    }
  };

  return { handler, loading };
};

export default useGoogleLogin;
