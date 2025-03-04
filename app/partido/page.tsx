"use client"

import { useState } from "react"
import { ArrowLeft, Lock, CheckCircle2, ChevronRight, Share2, MapPin, Info } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PartidoPage() {
  const [isJoined, setIsJoined] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleJoin = () => {
    setIsJoined(true)
  }

  const handleConfirm = () => {
    setIsConfirmed(true)
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="flex justify-between items-center p-4">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md">
          <ArrowLeft className="h-6 w-6 text-gray-800" />
        </Link>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md">
          <Share2 className="h-6 w-6 text-gray-800" />
        </button>
      </div>

      <div className="px-4 space-y-4">
        <div className="flex items-center gap-4">
          <Image src="/placeholder.svg?height=40&width=40" alt="Tennis" width={40} height={40} className="opacity-60" />
          <div>
            <h1 className="text-2xl font-bold">SINGLES</h1>
            <p className="text-base text-gray-600">Martes, 18 de Febrero 6:30 pm - 8:00 pm</p>
          </div>
        </div>

        <div className="flex items-center text-base">
          <MapPin className="h-5 w-5 text-gray-500 mr-2" />
          <p className="text-gray-700">Federación Z15</p>
          <span className="mx-2">•</span>
          <p className="text-gray-700">Nivel: Todos</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-3 text-sm">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-blue-600">
              Mejor de 3 sets. En caso de empate, se jugará un super tiebreak de 10 puntos.
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm mt-4">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-yellow-700">
              Nota del creador: La cancha es aquí en mi condominio, ya está reservada y es gratis.
            </p>
          </div>
        </div>

        <div className="flex justify-between text-base">
          <div className="flex items-center">
            <Lock className="h-5 w-5 text-gray-500 mr-2" />
            <span>Partido Privado</span>
          </div>
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
            <span>Pista reservada</span>
          </div>
        </div>

        <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg border text-base">
          <div>
            <h3 className="font-bold">Competitivo</h3>
            <p className="text-sm text-gray-600">Afecta al nivel</p>
          </div>
          <ChevronRight className="h-6 w-6 text-gray-400" />
        </button>

        <div>
          <h2 className="text-xl font-bold mb-3">Jugadores</h2>
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center w-1/3">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.39%20-%20An%20eleventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20-oJWiw24SazV4nI40VBn9FGsHL4XYPr.webp"
                alt="Player"
                width={48}
                height={48}
                className="rounded-full mb-2"
              />
              <p className="font-semibold text-sm">Luis</p>
              <div className="bg-[#DEFF0A] px-2 py-1 rounded-full text-sm font-bold mt-1">3.01</div>
            </div>
            <div className="text-2xl font-bold text-gray-400">VS</div>
            <div className="flex flex-col items-center w-1/3">
              {isJoined ? (
                <>
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Fabian"
                    width={48}
                    height={48}
                    className="rounded-full mb-2"
                  />
                  <p className="font-semibold text-sm">Fabian</p>
                  <div className="bg-[#DEFF0A] px-2 py-1 rounded-full text-sm font-bold mt-1">5.5</div>
                </>
              ) : (
                <>
                  <button
                    onClick={handleJoin}
                    className="w-12 h-12 bg-gray-200 rounded-full mb-2 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <span className="text-gray-400 text-2xl">?</span>
                  </button>
                  <p
                    className="font-semibold text-sm text-gray-400 cursor-pointer hover:text-gray-600"
                    onClick={handleJoin}
                  >
                    Unirse
                  </p>
                </>
              )}
            </div>
          </div>
          {!isJoined && <p className="text-center text-sm text-gray-500 mt-3">Esperando a que se una otro jugador</p>}
        </div>
      </div>

      {isJoined && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <div className="max-w-md mx-auto">
            {!isConfirmed ? (
              <button
                onClick={handleConfirm}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              >
                Confirmar Asistencia
              </button>
            ) : (
              <p className="text-center text-green-500 font-semibold py-3">Asistencia Confirmada</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

