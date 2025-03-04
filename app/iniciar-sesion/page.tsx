"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function IniciarSesionPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para autenticar al usuario
    console.log("Intento de inicio de sesión:", formData)
    // Por ahora, simplemente redirigimos al usuario a la página principal
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow py-16 px-4">
        <div className="max-w-md mx-auto">
          <Card className="bg-white shadow-md rounded-3xl overflow-hidden">
            <CardHeader className="bg-green-500 text-white py-4">
              <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Iniciar Sesión
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Button
                  type="button"
                  variant="link"
                  className="text-green-600 hover:text-green-700"
                  onClick={() => router.push("/registro")}
                >
                  ¿No tienes una cuenta? Regístrate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

