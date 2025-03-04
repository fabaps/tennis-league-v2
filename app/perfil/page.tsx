"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Header from "../components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Trophy, CheckCircle, XCircle } from "lucide-react"

// Datos de ejemplo (en una aplicación real, estos datos vendrían de una API o base de datos)
const playerData = {
  name: "Juan Pérez",
  profilePic:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.39%20-%20An%20eleventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20-oJWiw24SazV4nI40VBn9FGsHL4XYPr.webp",
  stats: {
    tournaments: 15,
    matches: 45,
    utr: 8.5,
  },
  pendingValidation: {
    opponent: "María García",
    score: "6-4, 7-5",
    date: "10 Nov 2023",
  },
  nextMatch: {
    opponent: "Carlos Rodríguez",
    opponentPic:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.34%20-%20A%20tenth%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20The%20-xq7jwBypIZm1U78YD4UdHZoWNIfLgP.webp",
    date: "15 Nov 2023",
    time: "14:00",
    location: "Club de Tenis Central",
    whatsapp: "+50212345678",
  },
  tournaments: [
    { id: 1, name: "Open Maya 2023", date: "15 Ene 2023", result: "Semifinalista" },
    { id: 2, name: "Torneo Primavera", date: "10 Mar 2023", result: "Campeón" },
    { id: 3, name: "Copa Verano", date: "5 Jul 2023", result: "Cuartos de final" },
    { id: 4, name: "Torneo Otoño", date: "20 Sep 2023", result: "Finalista" },
    { id: 5, name: "Copa Fin de Año", date: "15 Dic 2023", result: "Octavos de final" },
  ],
  matches: [
    {
      id: 1,
      opponent: "Carlos Rodríguez",
      date: "20 Ago 2023",
      result: "Victoria 6-4, 7-5",
      tournament: "Torneo Otoño",
    },
    { id: 2, opponent: "Ana García", date: "15 Sep 2023", result: "Derrota 3-6, 4-6", tournament: "Torneo Otoño" },
    {
      id: 3,
      opponent: "Luis Martínez",
      date: "1 Oct 2023",
      result: "Victoria 6-3, 6-2",
      tournament: "Copa Fin de Año",
    },
    { id: 4, opponent: "María López", date: "10 Oct 2023", result: "Victoria 7-6, 6-4", tournament: "Copa Fin de Año" },
    {
      id: 5,
      opponent: "Pedro Sánchez",
      date: "20 Oct 2023",
      result: "Derrota 4-6, 5-7",
      tournament: "Copa Fin de Año",
    },
  ],
  ranking: 1,
}

export default function PerfilPage() {
  const router = useRouter()

  const handleValidation = (isValid: boolean) => {
    // Aquí iría la lógica para validar o rechazar el marcador
    console.log(isValid ? "Marcador validado" : "Marcador rechazado")
    // En una aplicación real, aquí se haría una llamada a la API
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Perfil" className="bg-[#245A4C]" />
      <main className="flex-grow py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src={playerData.profilePic || "/placeholder.svg"}
                alt={playerData.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h1 className="text-3xl font-bold text-green-700">{playerData.name}</h1>
            <Button
              onClick={() => router.push("/perfil/edit")}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              Editar Perfil
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {Object.entries(playerData.stats).map(([key, value]) => (
              <Card key={key} className="bg-white shadow-md rounded-xl overflow-hidden">
                <CardContent className="p-4 text-center">
                  <p className="text-lg font-semibold text-gray-600 capitalize">{key}</p>
                  <p className="text-3xl font-bold text-green-600">{value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {playerData.pendingValidation && (
            <section className="mb-8">
              <Card className="bg-white shadow-md rounded-xl overflow-hidden">
                <CardHeader className="bg-yellow-100">
                  <CardTitle className="text-xl font-semibold text-yellow-700">
                    Validación de Marcador Pendiente
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="mb-2">Tienes un marcador pendiente de validación:</p>
                  <p className="font-semibold">Oponente: {playerData.pendingValidation.opponent}</p>
                  <p>Resultado: {playerData.pendingValidation.score}</p>
                  <p>Fecha: {playerData.pendingValidation.date}</p>
                  <div className="mt-4 flex justify-end space-x-4">
                    <Button
                      onClick={() => handleValidation(true)}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" /> Validar
                    </Button>
                    <Button
                      onClick={() => handleValidation(false)}
                      variant="outline"
                      className="text-red-500 hover:text-red-600"
                    >
                      <XCircle className="mr-2 h-4 w-4" /> Rechazar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Próximo Partido</h2>
            <Card className="bg-white shadow-md rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={playerData.nextMatch.opponentPic || "/placeholder.svg"}
                      alt={playerData.nextMatch.opponent}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-700">vs. {playerData.nextMatch.opponent}</h3>
                    <p className="text-gray-600">
                      {playerData.nextMatch.date} - {playerData.nextMatch.time}
                    </p>
                    <p className="text-gray-600">{playerData.nextMatch.location}</p>
                  </div>
                </div>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => window.open(`https://wa.me/${playerData.nextMatch.whatsapp}`, "_blank")}
                >
                  Contactar por WhatsApp
                </Button>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Torneos</h2>
            <ScrollArea className="w-full whitespace-nowrap rounded-md border">
              <div className="flex w-max space-x-4 p-4">
                {playerData.tournaments.map((tournament) => (
                  <Card key={tournament.id} className="w-[250px] flex-shrink-0">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-green-700">{tournament.name}</h3>
                      <p className="text-gray-600">{tournament.date}</p>
                      <p className="text-gray-800 font-medium">{tournament.result}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Partidos</h2>
            <ScrollArea className="w-full whitespace-nowrap rounded-md border">
              <div className="flex w-max space-x-4 p-4">
                {playerData.matches.map((match) => (
                  <Card key={match.id} className="w-[300px] flex-shrink-0">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-green-700">vs. {match.opponent}</h3>
                      <p className="text-gray-600">{match.date}</p>
                      <p className="text-gray-800 font-medium">{match.result}</p>
                      <p className="text-sm text-gray-500 mt-2">Torneo: {match.tournament}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Ranking</h2>
            <Card className="bg-white shadow-md rounded-xl overflow-hidden">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="text-center">
                  <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <p className="text-4xl font-bold text-green-700">#{playerData.ranking}</p>
                  <p className="text-xl text-gray-600">en Categoría A</p>
                </div>
                <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={() => router.push("/ranking")}>
                  Ver ranking completo
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}

