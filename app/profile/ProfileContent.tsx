"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/useAuth"

interface ProfileContentProps {
  router: any
}

export default function ProfileContent({ router }: ProfileContentProps) {
  const searchParams = useSearchParams()
  const playerId = searchParams.get("id")
  const { currentUser, fetchCurrentUserData, getCurrentUser } = useAuthStore((state) => state)

  useEffect(() => {
    const firebaseUser = getCurrentUser()
    if (firebaseUser?.uid) {
      fetchCurrentUserData()
    }
  }, [fetchCurrentUserData, getCurrentUser])

  if (!getCurrentUser()) {
    return (
      <div className="text-center">
        <p className="text-lg mb-4">Debes iniciar sesión para ver tu perfil</p>
        <Button 
          onClick={() => router.push("/auth")}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Iniciar Sesión
        </Button>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="text-center">
        <p>Cargando datos del usuario...</p>
      </div>
    )
  }

  return (
    <>
      <div className="text-center mb-8">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={currentUser.photo || "/placeholder.svg"}
            alt={currentUser.name}
            width={128}
            height={128}
            className="rounded-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold text-green-700 mb-4">{currentUser.name}</h1>
        <Button 
          onClick={() => router.push("/profile/edit")}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Editar Perfil
        </Button>
      </div>
    </>
  );
}
