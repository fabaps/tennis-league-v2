import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Cover() {
  return (
    <div className="relative h-[50vh] mb-8">
      <Image src="/cover-image.jpg" alt="Liga de Tenis de Guatemala" layout="fill" objectFit="cover" priority />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center space-y-4 px-4">
          <h1 className="text-3xl font-bold tracking-tight text-white">Liga de Tenis de Guatemala</h1>
          <p className="text-sm max-w-md mx-auto text-white">
            Conecta con la comunidad de tenis, participa en torneos y mejora tu juego.
          </p>
          <Button className="bg-white text-green-700 hover:bg-gray-100 rounded-full px-6 py-2 text-sm font-semibold shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Ver Torneos
          </Button>
        </div>
      </div>
    </div>
  )
}

