/* eslint-disable react-hooks/exhaustive-deps */
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import GTLLoader from "@/components/gtlLoader";
import { auth } from "@/config";
import { useAuthStore } from "@/store/auth";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { fetchCurrentUserData } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCurrentUserData();
        setLoading(false);
      } else {
        console.log("User is not authenticated", router);
      }
    });

    return () => unsubscribe();
  }, [fetchCurrentUserData]);

  const pathname = usePathname();

  if (pathname === "/auth") {
    return <>{children}</>;
  }

  if (!loading) {
    return <GTLLoader />;
  }

  return <>{children}</>;
};

export default AuthProvider;
