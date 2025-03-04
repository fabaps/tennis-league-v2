import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  { title: "Registro de Partidos", description: "Lleva un registro detallado de todos tus partidos y estadísticas." },
  { title: "Torneos en Vivo", description: "Sigue los resultados de los torneos en tiempo real." },
  { title: "Comunidad de Tenis", description: "Conecta con otros jugadores y organiza partidos amistosos." },
  { title: "Análisis de Rendimiento", description: "Obtén insights sobre tu juego y áreas de mejora." },
]

export default function AppFeatures() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-700">Características de la App</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-50 rounded-3xl shadow-sm overflow-hidden border border-gray-200">
              <CardHeader className="bg-green-100 py-4">
                <CardTitle className="text-xl font-semibold text-green-700">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

