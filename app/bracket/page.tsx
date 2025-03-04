import Header from "../components/Header"
import Footer from "../components/Footer"
import TournamentBracket from "../components/TournamentBracket"

export default function BracketPage() {
  // En una aplicación real, obtendrías el ID del usuario de la sesión o contexto
  const currentUserId = 1 // Este es un valor de ejemplo

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="Bracket del Torneo" className="bg-[#245A4C]" />
      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-green-700">Bracket del Torneo</h1>
          <TournamentBracket currentUserId={currentUserId} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

