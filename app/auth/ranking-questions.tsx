"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { ChevronRight, Trophy, Calendar, PlayCircle, Clock } from "lucide-react"

interface RankingQuestionsProps {
  onSubmit: (ranking: number, category: string) => void
}

const questions = [
  {
    title: "¿Cuál es el nivel más alto de tenis que has jugado?",
    description: "Selecciona tu nivel más alto de juego",
    icon: Trophy,
    type: "radio",
    name: "nivel",
    options: [
      { label: "No juego pero quiero empezar", value: 0, icon: "🎾" },
      { label: "Tenis Recreativo (casual, con amigos)", value: 1.5, icon: "🏸" },
      { label: "Ligas de Club (torneos internos, sin ranking nacional)", value: 2.1, icon: "🏆" },
      { label: "Torneos Locales (torneos ranqueados en la federación)", value: 2.8, icon: "🥇" },
      { label: "Torneos Nacionales (Circuitos federados privados)", value: 5.1, icon: "🏅" },
      { label: "Torneos Internacionales (ITF, COSAT, regionales de alto nivel)", value: 6.5, icon: "🌎" },
      { label: "Profesional (ATP/WTA/PTT/ITF)", value: 8, icon: "⭐" },
    ],
  },
  {
    title: "¿Con qué frecuencia juegas tenis?",
    description: "Indica tu frecuencia habitual de juego",
    icon: Calendar,
    type: "radio",
    name: "frecuencia",
    options: [
      { label: "No juego pero quiero empezar", value: 0, icon: "🆕" },
      { label: "Algunas veces al año", value: 0.5, icon: "📅" },
      { label: "Algunas veces al mes", value: 1, icon: "📆" },
      { label: "Algunas veces a la semana", value: 2.21, icon: "📊" },
      { label: "Casi todos los días", value: 3, icon: "🔥" },
    ],
  },
  {
    title: "¿Cuántos partidos de 2 o más sets has jugado en tu vida?",
    description: "Selecciona el rango que mejor represente tu experiencia",
    icon: PlayCircle,
    type: "radio",
    name: "partidos",
    options: [
      { label: "No juego partidos", value: 0, icon: "❌" },
      { label: "1-5 partidos", value: 0.5, icon: "1️⃣" },
      { label: "6-25 partidos", value: 1.5, icon: "2️⃣" },
      { label: "26+ partidos", value: 3, icon: "3️⃣" },
    ],
  },
  {
    title: "¿Cuántos años llevas jugando tenis?",
    description: "Indica tu tiempo de experiencia en el deporte",
    icon: Clock,
    type: "radio",
    name: "experiencia",
    options: [
      { label: "Menos de 1 año", value: 0, icon: "🌱" },
      { label: "1-3 años", value: 0.5, icon: "🌿" },
      { label: "4-6 años", value: 1, icon: "🌳" },
      { label: "7-10 años", value: 1.5, icon: "🌲" },
      { label: "Más de 10 años", value: 2, icon: "🏛️" },
    ],
  },
]

export default function RankingQuestions({ onSubmit }: RankingQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const handleAnswer = (name: string, value: number) => {
    const newAnswers = { ...answers, [name]: value }
    setAnswers(newAnswers)
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      let total = 0
      Object.values(newAnswers).forEach(value => {
        total += value
      })

      let category = "Principiante"
      if (total > 13) category = "Mayor"
      else if (total > 10) category = "A"
      else if (total > 8) category = "B"
      else if (total > 5) category = "C"
      else if (total > 2) category = "D"

      onSubmit(total, category)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const question = questions[currentQuestion]
  const Icon = question.icon

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 bg-white z-10">
        <div className="h-1 bg-gray-100">
          <div 
            className="h-full bg-green-500 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="px-4 py-2 text-sm text-gray-500">
          Pregunta {currentQuestion + 1} de {questions.length}
        </div>
      </div>

      <div className="px-4 pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="text-center">
              <div className="inline-flex p-2 bg-green-100 rounded-full mb-2">
                <Icon className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{question.title}</h3>
              <p className="text-sm text-gray-500">{question.description}</p>
            </div>

            <RadioGroup
              onValueChange={(value) => handleAnswer(question.name, Number(value))}
              value={answers[question.name]?.toString()}
              className="space-y-2"
            >
              {question.options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: index * 0.03 }}
                >
                  <Card
                    className={`transition-colors ${
                      answers[question.name] === option.value
                        ? "ring-1 ring-green-500 bg-green-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <label className="flex items-center p-3 cursor-pointer">
                      <RadioGroupItem
                        value={option.value.toString()}
                        id={`${question.name}-${index}`}
                        className="h-4 w-4 border-green-500 text-green-500"
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
    </div>
  )
}
