"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion } from "framer-motion"
import { User2, Mail } from "lucide-react"

interface PersonalInfoStepProps {
  onSubmit: (data: { firstName: string; lastName: string; email: string; gender: string }) => void
}

export default function PersonalInfoStep({ onSubmit }: PersonalInfoStepProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ firstName, lastName, email, gender })
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User2 className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="pl-10 h-12 text-base"
            placeholder="Nombre"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User2 className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="pl-10 h-12 text-base"
            placeholder="Apellido"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10 h-12 text-base"
            placeholder="correo@ejemplo.com"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-medium text-gray-700">Género</Label>
        <RadioGroup value={gender} onValueChange={setGender} required className="grid grid-cols-2 gap-4">
          <div className={`
            flex flex-col items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all duration-200
            ${gender === "hombre" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"}
          `}>
            <RadioGroupItem value="hombre" id="gender-hombre" className="hidden" />
            <Label htmlFor="gender-hombre" className="cursor-pointer text-center">
              <span className="text-4xl mb-2">👨</span>
              <span className="block text-lg font-medium mt-2">Hombre</span>
            </Label>
          </div>

          <div className={`
            flex flex-col items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all duration-200
            ${gender === "mujer" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"}
          `}>
            <RadioGroupItem value="mujer" id="gender-mujer" className="hidden" />
            <Label htmlFor="gender-mujer" className="cursor-pointer text-center">
              <span className="text-4xl mb-2">👩</span>
              <span className="block text-lg font-medium mt-2">Mujer</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        type="submit"
        disabled={!firstName || !lastName || !email || !gender}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-xl h-14 text-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Continuar
      </Button>
    </motion.form>
  )
}
