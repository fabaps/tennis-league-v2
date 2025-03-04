"use client"

import { ArrowLeft, Share2, MapPin, Info, Trophy, ChevronUp, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PartidoFinalizadoPage() {
  return (
    <div className="min-h-screen bg-white">
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
            <p className="text-base text-gray-600">Lunes, 17 de Febrero 2:00 pm - 3:30 pm</p>
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
            <p className="text-blue-600">Partido jugado al mejor de 3 sets.</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <Trophy className="h-5 w-5 text-green-500 mr-2" />
            Resultado Final
          </h2>

          <div className="bg-white rounded-lg overflow-hidden border">
            {/* Headers */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-b">
              <div className="p-2 text-gray-500 text-sm">Jugador</div>
              <div className="p-2 text-gray-500 text-sm text-center border-l">Set-1</div>
              <div className="p-2 text-gray-500 text-sm text-center border-l">Set-2</div>
              <div className="p-2 text-gray-500 text-sm text-center border-l">Set-3</div>
            </div>

            {/* Player 1 */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center border-b">
              <div className="p-2">
                <Link href="/perfil?id=luis" className="flex items-center gap-3">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.39%20-%20An%20eleventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20-oJWiw24SazV4nI40VBn9FGsHL4XYPr.webp"
                    alt="Luis"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <div>
                    <span className="text-base font-medium block hover:underline">Luis</span>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500">GTR: 3.01</span>
                      <ChevronUp className="h-4 w-4 text-green-500 ml-1" />
                      <span className="text-xs text-green-500">0.02</span>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="p-2 text-2xl font-light text-center border-l">6</div>
              <div className="p-2 text-2xl font-light text-center border-l">5</div>
              <div className="p-2 text-2xl font-light text-center border-l">4</div>
            </div>

            {/* Player 2 */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center">
              <div className="p-2">
                <Link href="/perfil?id=carlos" className="flex items-center gap-3">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.34%20-%20A%20tenth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-xq7jwBypIZm1U78YD4UdHZoWNIfLgP.webp"
                    alt="Carlos"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <div>
                    <span className="text-base font-medium block hover:underline">Carlos</span>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500">GTR: 2.98</span>
                      <ChevronDown className="h-4 w-4 text-red-500 ml-1" />
                      <span className="text-xs text-red-500">0.01</span>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="p-2 text-2xl font-light text-center border-l">4</div>
              <div className="p-2 text-2xl font-light text-center border-l">7</div>
              <div className="p-2 text-2xl font-light text-center border-l">6</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 mt-4">
          <h2 className="text-lg font-bold mb-4">Comentarios del Partido</h2>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.34%20-%20A%20tenth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-xq7jwBypIZm1U78YD4UdHZoWNIfLgP.webp"
                  alt="Carlos"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">Carlos</p>
                  <p className="text-sm text-gray-500">Hace 2 horas</p>
                </div>
              </div>
              <p className="text-gray-600">
                Gran partido contra Luis. Aunque perdí el primer set, pude mantener la calma y ajustar mi estrategia. La
                clave fue mejorar mi primer servicio y ser más agresivo en los momentos importantes.
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.39%20-%20An%20eleventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20-oJWiw24SazV4nI40VBn9FGsHL4XYPr.webp"
                  alt="Luis"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">Luis</p>
                  <p className="text-sm text-gray-500">Hace 1 hora</p>
                </div>
              </div>
              <p className="text-gray-600 mb-3">
                Excelente partido Carlos! Me ganaste bien en esos últimos dos sets. Aquí una foto de uno de mis
                backhands del primer set 😄
              </p>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WQ0loO1LpyGzRARucd4TN5s92Cp28R.png"
                  alt="Tennis backhand shot"
                  width={800}
                  height={450}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

