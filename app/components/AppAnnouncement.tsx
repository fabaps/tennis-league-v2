import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AppAnnouncement() {
  return (
    <section className="py-16 px-4 bg-gray-200">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Próximamente en tu Dispositivo</h2>
        <p className="text-xl text-gray-600 mb-8">
          Prepárate para la mejor experiencia de tenis en Guatemala. ¡Nuestra app se lanzará pronto!
        </p>
        <div className="flex justify-center space-x-4 mb-12">
          <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-6 py-3 flex items-center space-x-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
            </svg>
            <span>App Store</span>
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-6 py-3 flex items-center space-x-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.5 12.92 20.16 13.19L17.74 14.6L15.17 12.03L17.74 9.46L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
            </svg>
            <span>Google Play</span>
          </Button>
        </div>
        <div className="relative w-64 h-128 mx-auto">
          <Image
            src="/placeholder.svg?height=512&width=256"
            alt="Vista previa de la app de la Liga de Tenis de Guatemala"
            layout="fill"
            objectFit="cover"
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}

