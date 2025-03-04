"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion } from "framer-motion"

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
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <Label htmlFor="firstName">Nombre</Label>
        <Input
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="lastName">Apellido</Label>
        <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="gender" className="block mb-2">
          Género
        </Label>
        <RadioGroup value={gender} onValueChange={setGender} required className="space-y-2">
          <div className="flex items-center space-x-2 border rounded-md p-2 hover:bg-gray-50">
            <RadioGroupItem value="hombre" id="gender-hombre" />
            <Label htmlFor="gender-hombre" className="cursor-pointer">
              Hombre
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-2 hover:bg-gray-50">
            <RadioGroupItem value="mujer" id="gender-mujer" />
            <Label htmlFor="gender-mujer" className="cursor-pointer">
              Mujer
            </Label>
          </div>
        </RadioGroup>
      </div>
      <Button
        type="submit"
        disabled={!firstName || !lastName || !email || !gender}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Continuar
      </Button>
    </motion.form>
  )
}

