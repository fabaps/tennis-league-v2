import { useEffect, useState } from "react";
import { auth } from "@/config";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "@/store/useAuth";
import { usePathname, useRouter } from "next/navigation";
import GTLLoader from "../components/GTLLoader";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { fetchCurrentUserData } = useAuthStore();
  const { currentUser } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCurrentUserData();
      }
      setLoading(false); // Cambiar el estado de carga después de la verificación
    });

    return () => unsubscribe();
  }, [fetchCurrentUserData]);


  const pathname = usePathname()

  if(pathname === "/auth") {
    return <>{children}</>;
  }

  if (loading) {
    return <GTLLoader />; // Mostrar cargando mientras se verifica
  }

  if (!currentUser) {
    router.replace("/auth");
    return null; // No retornar nada para evitar que se quede en la página
  }
 
  return <>{children}</>;
}