import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Liga de Tenis de Guatemala</h3>
            <p className="text-green-100">Conectando la comunidad del tenis guatemalteco.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/torneos" className="text-green-100 hover:text-white">
                  Torneos
                </Link>
              </li>
              <li>
                <Link href="/jugadores" className="text-green-100 hover:text-white">
                  Jugadores
                </Link>
              </li>
              <li>
                <Link href="/estadisticas" className="text-green-100 hover:text-white">
                  Estadísticas
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-green-100 hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Descarga la App</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-green-100 hover:text-white">
                <span className="sr-only">App Store</span>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.75 14.35a.5.5 0 01-.75.43l-3-1.73-3 1.73a.5.5 0 01-.75-.43V7.65a.5.5 0 01.75-.43l3 1.73 3-1.73a.5.5 0 01.75.43v8.7z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-green-100 hover:text-white">
                <span className="sr-only">Google Play</span>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.86 9.073l-2.82 2.82a.75.75 0 01-1.06-1.06l2.82-2.82-2.82-2.82a.75.75 0 011.06-1.06l2.82 2.82 2.82-2.82a.75.75 0 111.06 1.06l-2.82 2.82 2.82 2.82a.75.75 0 11-1.06 1.06l-2.82-2.82z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-green-600 pt-8 text-center text-green-100">
          <p>&copy; 2023 Liga de Tenis de Guatemala. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

