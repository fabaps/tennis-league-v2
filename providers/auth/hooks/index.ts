import { onAuthStateChanged, User as UserFirebase } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { createUserCookie } from "@/app/actions";
import { auth } from "@/config";
import { useAuthStore } from "@/store/auth";
import { USER_ROLE } from "@/types/user";

import { AuthContext } from "../";
import { LOGIN_STEP } from "@/app/auth/components/form/utils";

interface UseAuthChangeProps {
  setStep: React.Dispatch<React.SetStateAction<LOGIN_STEP>>;
}
const useAuthChange = ({ setStep }: UseAuthChangeProps) => {
  const { fetchCurrentUserData } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(false);

      if (!user) {
        return;
      }

      const currentUser = await fetchCurrentUserData(user as UserFirebase);

      if (!currentUser) {
        return setStep(LOGIN_STEP.PERSONAL_INFO);
      }

      if (currentUser) {
        if (!currentUser?.lastName || !currentUser?.firstName) {
          setStep(LOGIN_STEP.PERSONAL_INFO);
        } else {
          createUserCookie(USER_ROLE.PLAYER);
        }
      }
    });

    return () => unsubscribe();
  }, [fetchCurrentUserData, router, setStep]);

  return { loading };
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return ctx;
};

export default useAuthChange;
