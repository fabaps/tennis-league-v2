"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

interface RankingQuestionsProps {
  onSubmit: (ranking: number, category: string) => void
}

const questions = [
  {
    title: "¿Cuál es el nivel más alto de tenis que has jugado?",
    type: "radio", // Cambiado de "checkbox" a "radio"
    name: "nivel",
    options: [
      { label: "No juego pero quiero empezar", value: 0 },
      { label: "Tenis Recreativo (casual, con amigos)", value: 1.5 },
      { label: "Ligas de Club (torneos internos, sin ranking nacional)", value: 2.1 },
      { label: "Torneos Locales (torneos ranqueados en la federación)", value: 2.8 },
      { label: "Torneos Nacionales (Circuitos federados privados)", value: 5.1 },
      { label: "Torneos Internacionales (ITF, COSAT, regionales de alto nivel)", value: 6.5 },
      { label: "Profesional (ATP/WTA/PTT/ITF)", value: 8 },
    ],
  },
  {
    title: "¿Con qué frecuencia juegas tenis?",
    type: "radio",
    name: "frecuencia",
    options: [
      { label: "No juego pero quiero empezar", value: 0 },
      { label: "Algunas veces al año", value: 0.5 },
      { label: "Algunas veces al mes", value: 1 },
      { label: "Algunas veces a la semana", value: 2.21 },
      { label: "Casi todos los días", value: 3 },
    ],
  },
  {
    title: "¿Cuántos partidos de 2 o más sets has jugado en tu vida?",
    type: "radio",
    name: "partidos",
    options: [
      { label: "No juego partidos", value: 0 },
      { label: "1-5 partidos", value: 0.5 },
      { label: "6-25 partidos", value: 1.5 },
      { label: "26+ partidos", value: 3 },
    ],
  },
  {
    title: "¿Cuántos años llevas jugando tenis?",
    type: "radio",
    name: "experiencia",
    options: [
      { label: "Menos de 1 año", value: 0 },
      { label: "1-3 años", value: 0.5 },
      { label: "4-6 años", value: 1 },
      { label: "7-10 años", value: 1.5 },
      { label: "Más de 10 años", value: 2 },
    ],
  },
]

export default function RankingQuestions({ onSubmit }: RankingQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [isCalculated, setIsCalculated] = useState(false)

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateRanking()
    }
  }

  const handleAnswer = (name: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [name]: value }))
  }

  const calculateRanking = () => {
    let total = 0
    Object.entries(answers).forEach(([_, value]) => {
      total += value
    })

    let category = "Principiante"
    if (total > 13) category = "Mayor"
    else if (total > 10) category = "A"
    else if (total > 8) category = "B"
    else if (total > 5) category = "C"
    else if (total > 2) category = "D"

    setIsCalculated(true)
    onSubmit(total, category)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 p-2 bg-white/80 backdrop-blur-sm z-10">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-green-600 mt-1 font-medium">
          Pregunta {currentQuestion + 1} de {questions.length}
        </p>
      </div>

      <div className="px-4 pt-14 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-gray-900">{question.title}</h3>
              {question.name === "nivel" && (
                <p className="text-sm text-gray-500">Selecciona tu nivel más alto de juego</p>
              )}
            </div>

            <RadioGroup
              onValueChange={(value) => handleAnswer(question.name, Number(value))}
              value={answers[question.name]?.toString()}
              className="space-y-2"
            >
              {question.options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card
                    className={`transition-all duration-200 ${
                      answers[question.name] === option.value ? "ring-2 ring-green-600 bg-green-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <label className="flex items-center p-2.5 cursor-pointer">
                      <RadioGroupItem
                        value={option.value.toString()}
                        id={`${question.name}-${index}`}
                        className="h-4 w-4 border-2 border-green-600 text-green-600"
                      />
                      <span className="ml-3 text-sm text-gray-900">{option.label}</span>
                    </label>
                  </Card>
                </motion.div>
              ))}
            </RadioGroup>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t">
        <Button
          type="button"
          onClick={handleNext}
          disabled={!Object.prototype.hasOwnProperty.call(answers, question.name)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-medium text-base"
        >
          {currentQuestion === questions.length - 1 ? (
            "Finalizar"
          ) : (
            <>
              Siguiente
              <ChevronRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

