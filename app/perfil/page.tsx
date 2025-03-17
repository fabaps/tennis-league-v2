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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header title="Perfil" className="bg-[#245A4C]" />
      <main className="flex-grow py-16 px-4">
        <div className="max-w-md mx-auto">
          {/* Tarjeta Principal */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
            {/* Encabezado con Gradiente */}
            <div className="bg-gradient-to-r from-[#245A4C] to-green-500 pt-8 pb-12 px-6 relative">
              {/* Avatar con borde */}
              <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 bottom-0">
                <div className="p-1 bg-white rounded-full">
                  <UserAvatar
                    name={currentUser.name}
                    photo={currentUser.photo}
                    size={120}
                    className="ring-4 ring-white"
                  />
                </div>
              </div>
            </div>
            
            {/* Contenido */}
            <div className="pt-16 pb-6 px-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                  {currentUser.name}
                </h1>
                <p className="text-sm text-gray-500 mb-4">
                  Categoría {currentUser.category || 'D'}
                </p>
                <Button
                  onClick={() => router.push("/perfil/edit")}
                  className="bg-[#245A4C] hover:bg-[#1e4b40] text-white text-sm font-medium px-6 py-2 rounded-full shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  Editar Perfil
                </Button>
              </div>
            </div>
          </div>

          {/* Tarjetas de Estadísticas */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-[#245A4C] text-2xl font-bold mb-1">0</div>
              <div className="text-gray-600 text-sm font-medium">Torneos</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-[#245A4C] text-2xl font-bold mb-1">0</div>
              <div className="text-gray-600 text-sm font-medium">Partidos</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-[#245A4C] text-2xl font-bold mb-1">
                {currentUser.utr || 0}
              </div>
              <div className="text-gray-600 text-sm font-medium">UTR</div>
            </div>
          </div>

          {/* Botón de Cerrar Sesión */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => logout()}
              className="text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-red-600 hover:border-red-100 font-medium transition-colors duration-200"
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
