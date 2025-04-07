import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { useAuthStore } from "@/store/auth";

export const useShowWelcomeToast = () => {
  const { currentUser } = useAuthStore();
  const toastCounter = useRef(0);

  useEffect(() => {
    if (currentUser) {
      toastCounter.current += 1;

      if (toastCounter.current > 1) {
        return;
      }

      setTimeout(() => {
        toast.success(`Bienvenido ${currentUser.name}`);
      }, 500);
    }
  }, [currentUser]);
};
