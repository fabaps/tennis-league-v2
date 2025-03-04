import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PremiumSection() {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Membresía Premium</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white rounded-2xl shadow-md overflow-hidden">
            <CardHeader className="bg-blue-500 text-white py-4">
              <CardTitle className="text-xl font-semibold">Beneficios Premium</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="text-left space-y-2">
                <li>• Acceso prioritario a torneos</li>
                <li>• Entrenamiento personalizado</li>
                <li>• Análisis de rendimiento avanzado</li>
                <li>• Descuentos en equipamiento</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-2xl shadow-md overflow-hidden">
            <CardHeader className="bg-blue-500 text-white py-4">
              <CardTitle className="text-xl font-semibold">Únete Ahora</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-4">
                Obtén acceso exclusivo a nuestros servicios premium y lleva tu juego al siguiente nivel.
              </p>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">
                Hazte Premium
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

