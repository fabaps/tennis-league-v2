"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UTRCategoryStepProps {
  formData: {
    playingTime: string
    playingFrequency: string
    competitiveMatches: string
    tournamentExperience: string
  }
  prevStep: () => void
  onComplete: (category: string) => void
}

export default function UTRCategoryStep({ formData, prevStep, onComplete }: UTRCategoryStepProps) {
  const router = useRouter()
  const [utr, setUtr] = useState(0)
  const [suggestedCategory, setSuggestedCategory] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    calculateUTR()
  }, [])

  const calculateUTR = () => {
    let score = 0

    // Tiempo jugando
    if (formData.playingTime === "mas_10_anios") score += 4
    else if (formData.playingTime === "5_10_anios") score += 3
    else if (formData.playingTime === "3_5_anios") score += 2
    else if (formData.playingTime === "1_3_anios") score += 1

    // Frecuencia de juego (se mantiene igual)
    if (formData.playingFrequency === "diario") score += 3
    else if (formData.playingFrequency === "varias_veces") score += 2
    else if (formData.playingFrequency === "semanal") score += 1

    // Partidos competitivos
    if (formData.competitiveMatches === "mas_30") score += 4
    else if (formData.competitiveMatches === "21_30") score += 3
    else if (formData.competitiveMatches === "11_20") score += 2
    else if (formData.competitiveMatches === "6_10") score += 1

    // Experiencia en torneos (se mantiene igual)
    if (formData.tournamentExperience === "internacional") score += 3
    else if (formData.tournamentExperience === "nacional") score += 2
    else if (formData.tournamentExperience === "regional") score += 1

    const calculatedUTR = Math.min(Math.max(score, 1), 10)
    setUtr(calculatedUTR)

    let category = "D"
    if (calculatedUTR >= 8) category = "A"
    else if (calculatedUTR >= 6) category = "B"
    else if (calculatedUTR >= 4) category = "C"

    setSuggestedCategory(category)
    setSelectedCategory(category)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCategory) {
      onComplete(selectedCategory)
      router.push("/bracket")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="bg-white shadow-md rounded-xl overflow-hidden border border-green-200">
        <CardHeader className="bg-green-500 text-white py-4">
          <CardTitle className="text-xl font-semibold">Tu Perfil de Tenis</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-700">Tu GTR calculado</p>
            <p className="text-4xl font-extrabold text-green-600">{utr.toFixed(1)}</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-green-700">Categoría sugerida</p>
            <p className="text-3xl font-bold text-green-600">{suggestedCategory}</p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-green-700 mb-4">Tu categoría asignada para el torneo</h3>
        <div className="space-y-2">
          {["A", "B", "C", "D"].map((category) => (
            <Button
              key={category}
              disabled={category !== selectedCategory}
              className={`w-full ${
                category === selectedCategory
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-200 text-gray-500"
              } font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out`}
            >
              Categoría {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-8">
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
          Confirmar Categoría
        </Button>
      </div>
    </form>
  )
}

