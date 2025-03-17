"use client";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuth";
import { UserAvatar } from "@/components/ui/user-avatar";

export default function PerfilPage() {
  const router = useRouter();
  const { currentUser, isAuthenticated, loading } = useAuthStore(
    (state) => state
  );

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Perfil" className="bg-[#245A4C]" />
        <main className="flex-grow py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg mb-4">
              Debes iniciar sesión para ver tu perfil
            </p>
            <Button
              onClick={() => router.push("/auth")}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Iniciar Sesión
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Perfil" className="bg-[#245A4C]" />
        <main className="flex-grow py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p>No se encontraron datos del usuario</p>
          </div>
        </main>
      </div>
    );
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
        </div>
      </main>
    </div>
  );
}
