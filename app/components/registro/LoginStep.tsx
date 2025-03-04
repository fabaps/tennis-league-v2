import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

interface LoginStepProps {
  formData: {
    email: string
    phone: string
    password: string
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  nextStep: () => void
}

export default function LoginStep({ formData, handleInputChange, nextStep }: LoginStepProps) {
  const router = useRouter()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        nextStep()
      }}
      className="space-y-4"
    >
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
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
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
        Siguiente
      </Button>
      <div className="mt-4 text-center">
        <Button
          type="button"
          variant="link"
          className="text-green-600 hover:text-green-700"
          onClick={() => router.push("/iniciar-sesion")}
        >
          ¿Ya tienes una cuenta? Iniciar sesión
        </Button>
      </div>
    </form>
  )
}

