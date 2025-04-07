/* eslint-disable react-hooks/exhaustive-deps */
import { onAuthStateChanged, User as UserFirebase } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { createUserCookie } from "@/app/actions";
import { auth } from "@/config";
import { useAuthStore } from "@/store/auth";
import { USER_ROLE } from "@/types/user";

import { AuthContext } from "../";
import { LOGIN_STEP } from "@/app/auth/components/form/utils";
import { createOrUpdateUser } from "@/firebase/users";

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

export const useSendAndRedirect = () => {
  const { step, personalInfo, category, utr } = useAuthContext();
  const { getCurrentUser } = useAuthStore();

  useEffect(() => {
    const validateUser = async () => {
      const isResult = step === LOGIN_STEP.RESULT;

      if (isResult) {
        const user = getCurrentUser();

        if (!user) {
          return;
        }

        createOrUpdateUser(user.uid, {
          ...personalInfo,
          category,
          utr: Number(utr) || 0,
          name: `${personalInfo.firstName} ${personalInfo.lastName}`,
        });
      }
    };

    validateUser();
  }, [step]);
};

export default useAuthChange;
