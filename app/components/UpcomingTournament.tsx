import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TournamentAttendees from "./TournamentAttendees"

const tournament = {
  id: 1,
  name: "Open Maya",
  date: "20 de enero - 5 de febrero, 2024",
  location: "Ciudad de Guatemala",
}

const attendees = [
  { id: 1, name: "Ana García", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 2, name: "Carlos Rodríguez", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 3, name: "María López", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 4, name: "Juan Pérez", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 5, name: "Laura Martínez", avatar: "/placeholder.svg?height=32&width=32" },
]

export default function UpcomingTournament() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Próximo Torneo</h2>
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white rounded-3xl shadow-md overflow-hidden border-2 border-green-500">
          <CardHeader className="bg-green-500 text-white py-4">
            <CardTitle className="text-xl font-semibold">{tournament.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
              <div>
                <p className="text-gray-600 mb-2">{tournament.date}</p>
                <p className="text-gray-600">{tournament.location}</p>
              </div>
              <Link href="/registro">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                  Registrar
                </Button>
              </Link>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <TournamentAttendees totalAttendees={28} displayedAttendees={attendees} />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

