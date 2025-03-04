import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tournament = {
  id: 1,
  name: "Open Maya",
  date: "20 de enero - 5 de febrero, 2024",
  location: "Ciudad de Guatemala",
}

export default function UpcomingTournaments() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Próximo Torneo</h2>
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white rounded-2xl shadow-md overflow-hidden">
          <CardHeader className="bg-blue-500 text-white py-4">
            <CardTitle className="text-xl font-semibold">{tournament.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-600">{tournament.date}</p>
            <p className="text-gray-600">{tournament.location}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

