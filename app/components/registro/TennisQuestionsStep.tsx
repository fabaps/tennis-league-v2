import type React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TennisQuestionsStepProps {
  formData: {
    playingTime: string
    playingFrequency: string
    competitiveMatches: string
    tournamentExperience: string
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  nextStep: () => void
  prevStep: () => void
}

export default function TennisQuestionsStep({
  formData,
  handleInputChange,
  nextStep,
  prevStep,
}: TennisQuestionsStepProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        nextStep()
      }}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="playingTime">¿Cuánto tiempo llevas jugando tenis?</Label>
        <Select
          value={formData.playingTime}
          onValueChange={(value) => handleInputChange({ target: { name: "playingTime", value } } as any)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Selecciona el tiempo que llevas jugando" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="menos_1_anio">Menos de 1 año</SelectItem>
            <SelectItem value="1_3_anios">1-3 años</SelectItem>
            <SelectItem value="3_5_anios">3-5 años</SelectItem>
            <SelectItem value="5_10_anios">5-10 años</SelectItem>
            <SelectItem value="mas_10_anios">Más de 10 años</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="playingFrequency">Frecuencia de juego</Label>
        <Select
          value={formData.playingFrequency}
          onValueChange={(value) => handleInputChange({ target: { name: "playingFrequency", value } } as any)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Selecciona tu frecuencia de juego" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ocasional">Ocasionalmente</SelectItem>
            <SelectItem value="semanal">Semanalmente</SelectItem>
            <SelectItem value="varias_veces">Varias veces por semana</SelectItem>
            <SelectItem value="diario">Diariamente</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="competitiveMatches">¿Cuántos partidos competitivos has jugado en los últimos 12 meses?</Label>
        <Select
          value={formData.competitiveMatches}
          onValueChange={(value) => handleInputChange({ target: { name: "competitiveMatches", value } } as any)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Selecciona el número de partidos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0_5">0-5 partidos</SelectItem>
            <SelectItem value="6_10">6-10 partidos</SelectItem>
            <SelectItem value="11_20">11-20 partidos</SelectItem>
            <SelectItem value="21_30">21-30 partidos</SelectItem>
            <SelectItem value="mas_30">Más de 30 partidos</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="tournamentExperience">Experiencia en torneos</Label>
        <Select
          value={formData.tournamentExperience}
          onValueChange={(value) => handleInputChange({ target: { name: "tournamentExperience", value } } as any)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Selecciona tu experiencia en torneos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ninguna">Ninguna</SelectItem>
            <SelectItem value="local">Torneos locales</SelectItem>
            <SelectItem value="regional">Torneos regionales</SelectItem>
            <SelectItem value="nacional">Torneos nacionales</SelectItem>
            <SelectItem value="internacional">Torneos internacionales</SelectItem>
          </SelectContent>
        </Select>
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
          Siguiente
        </Button>
      </div>
    </form>
  )
}

