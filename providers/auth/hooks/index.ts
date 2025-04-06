import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { createUserCookie } from "@/app/actions";
import { auth } from "@/config";
import ROUTES from "@/routes";
import { useAuthStore } from "@/store/auth";
import { USER_ROLE } from "@/types/user";

import { AuthContext } from "../";

const useAuthChange = () => {
  const { fetchCurrentUserData } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push(ROUTES["AUTH"].path);
        setTimeout(() => {
          setLoading(false);
        }, 500);
        return;
      }

      createUserCookie(USER_ROLE.PLAYER);
      fetchCurrentUserData();
      router.push(ROUTES["HOME"].path);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    });

    return () => unsubscribe();
  }, [fetchCurrentUserData, router]);

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
