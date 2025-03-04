"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos del formulario
    console.log("Datos del formulario:", formData)
    // Normalmente, aquí enviarías los datos a tu backend
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Nombre completo</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="category">Categoría</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Selecciona tu categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="principiante">Principiante</SelectItem>
            <SelectItem value="intermedio">Intermedio</SelectItem>
            <SelectItem value="avanzado">Avanzado</SelectItem>
            <SelectItem value="profesional">Profesional</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
      >
        Registrarse
      </Button>
    </form>
  )
}

