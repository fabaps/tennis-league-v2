"use client";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuth";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useEffect } from "react";

export default function PerfilPage() {
  const router = useRouter();
  const { currentUser, isAuthenticated, loading, logout } = useAuthStore(
    (state) => state
  );

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Perfil" className="bg-[#245A4C]" />
        <main className="flex-grow py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p>Cargando datos del usuario...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Perfil" className="bg-[#245A4C]" />
      <main className="flex-grow py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex justify-center items-center">
              <UserAvatar
                name={currentUser.name}
                photo={currentUser.photo}
                size={128}
              />
            </div>
            <h1 className="text-3xl font-bold text-green-700 mb-2">
              {currentUser.name}
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Categoría {currentUser.category}
            </p>
            <p className="text-lg text-gray-600 mb-4">UTR: {currentUser.utr}</p>
            <Button
              onClick={() => router.push("/perfil/edit")}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              Editar Perfil
            </Button>
          </div>
          <div className="flex justify-center  items-center">
            <Button
              variant="outline"
              onClick={() => logout()}
              className="mt-2 bg-red-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
