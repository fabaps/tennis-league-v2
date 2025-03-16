"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuth"
import Header from "../components/Header"
import Footer from "../components/Footer"
import LoginStep from "../components/registro/LoginStep"
import OTPStep from "../components/registro/OTPStep"
import TennisQuestionsStep from "../components/registro/TennisQuestionsStep"
import UTRCategoryStep from "../components/registro/UTRCategoryStep"

export default function RegistroPage() {
  const router = useRouter();
  const { getCurrentUser } = useAuthStore();
  const user = getCurrentUser();

  useEffect(() => {
    if (user) {
      router.push("/ranking");
    }
  }, [user, router]);

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    phone: "",
    playingTime: "",
    playingFrequency: "",
    competitiveMatches: "",
    tournamentExperience: "",
    selectedCategory: "",
  })

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleCategorySelection = () => {
    // Aquí puedes agregar la lógica para enviar los datos al servidor o realizar otras acciones necesarias
    console.log("Registro completado:", formData)
  }

  if (user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow py-16 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-green-700">Registro para Open Maya</h1>
          {step === 1 && (
            <LoginStep 
              formData={formData} 
              handleInputChange={handleInputChange} 
              nextStep={nextStep} 
            />
          )}
          {step === 2 && (
            <OTPStep />
          )}
          {step === 3 && (
            <TennisQuestionsStep
              formData={formData}
              handleInputChange={handleInputChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 4 && (
            <UTRCategoryStep 
              formData={formData} 
              prevStep={prevStep} 
              onComplete={handleCategorySelection} 
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
