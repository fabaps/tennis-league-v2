"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PaymentStepProps {
  formData: {
    cardNumber: string
    expiryDate: string
    cvv: string
    tennisExperience: string
    playingFrequency: string
    preferredSurface: string
    tournamentExperience: string
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  prevStep: () => void
}

export default function PaymentStep({ formData, handleInputChange, prevStep }: PaymentStepProps) {
  const [utr, setUtr] = useState(0)
  const [suggestedCategory, setSuggestedCategory] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)

  const calculateUTR = () => {
    // Esta es una lógica simplificada. En un caso real, el cálculo sería más complejo.
    let score = 0
    if (formData.tennisExperience === "profesional") score += 4
    else if (formData.tennisExperience === "avanzado") score += 3
    else if (formData.tennisExperience === "intermedio") score += 2
    else score += 1

    if (formData.playingFrequency === "diario") score += 3
    else if (formData.playingFrequency === "varias_veces") score += 2
    else if (formData.playingFrequency === "semanal") score += 1

    if (formData.tournamentExperience === "internacional") score += 3
    else if (formData.tournamentExperience === "nacional") score += 2
    else if (formData.tournamentExperience === "regional") score += 1

    setUtr(Math.min(Math.max(score, 1), 10))

    if (score >= 8) setSuggestedCategory("A")
    else if (score >= 6) setSuggestedCategory("B")
    else if (score >= 4) setSuggestedCategory("C")
    else setSuggestedCategory("D")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    calculateUTR()
    setShowConfirmation(true)
  }

  const handleConfirmation = () => {
    // Aquí iría la lógica para procesar el pago y completar el registro
    console.log("Registro completado:", { ...formData, utr, selectedCategory })
    // Normalmente, aquí enviarías los datos a tu backend
  }

  if (showConfirmation) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-700">Confirmación de Registro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Tu UTR calculado es: <strong>{utr}</strong>
          </p>
          <p>
            Categoría sugerida: <strong>{suggestedCategory}</strong>
          </p>
          <div>
            <Label htmlFor="category">Selecciona tu categoría</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecciona tu categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Categoría A</SelectItem>
                <SelectItem value="B">Categoría B</SelectItem>
                <SelectItem value="C">Categoría C</SelectItem>
                <SelectItem value="D">Categoría D</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleConfirmation}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Confirmar Participación
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="cardNumber">Número de tarjeta</Label>
        <Input
          id="cardNumber"
          name="cardNumber"
          type="text"
          required
          value={formData.cardNumber}
          onChange={handleInputChange}
          className="mt-1"
          placeholder="1234 5678 9012 3456"
        />
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor="expiryDate">Fecha de expiración</Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            type="text"
            required
            value={formData.expiryDate}
            onChange={handleInputChange}
            className="mt-1"
            placeholder="MM/AA"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            name="cvv"
            type="text"
            required
            value={formData.cvv}
            onChange={handleInputChange}
            className="mt-1"
            placeholder="123"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          onClick={prevStep}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Anterior
        </Button>
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Procesar Pago
        </Button>
      </div>
    </form>
  )
}

