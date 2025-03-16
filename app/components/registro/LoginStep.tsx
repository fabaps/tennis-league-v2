import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuth"
import { useEffect } from "react"

interface LoginStepProps {
  formData: {
    phone: string
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  nextStep: () => void
}

export default function LoginStep({ formData, handleInputChange, nextStep }: LoginStepProps) {
  const router = useRouter()
  const { sendOTP, loading, error, setPhoneNumber } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setPhoneNumber(formData.phone)
      await sendOTP(formData.phone)
      nextStep()
    } catch (error) {
      // Error ya manejado por el store
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleInputChange}
          className="mt-1"
          placeholder="+502XXXXXXXX"
        />
        <p className="text-sm text-gray-500 mt-1">
          Ingresa tu número con código de país (ej: +502)
        </p>
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
      >
        {loading ? "Enviando código..." : "Enviar código"}
      </Button>
      <div id="sign-in-button" />
    </form>
  )
}
