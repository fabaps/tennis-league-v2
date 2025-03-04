"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface VerificationStepProps {
  onSubmit: (code: string) => void
  onResend: () => void
  isLoading: boolean
}

export default function VerificationStep({ onSubmit, onResend, isLoading }: VerificationStepProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0]
    }

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    if (newCode.every((digit) => digit) && value) {
      onSubmit(newCode.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    const digits = pastedData.split("")

    const newCode = [...code]
    digits.forEach((digit, index) => {
      if (index < 6 && /^\d$/.test(digit)) {
        newCode[index] = digit
      }
    })
    setCode(newCode)

    const nextEmptyIndex = newCode.findIndex((digit) => !digit)
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }

    if (newCode.every((digit) => digit)) {
      onSubmit(newCode.join(""))
    }
  }

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-2">
        {code.map((digit, index) => (
          <motion.input
            key={index}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none bg-white/50"
            disabled={isLoading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          />
        ))}
      </div>
      <Button
        type="button"
        variant="link"
        onClick={onResend}
        className="w-full text-green-700 hover:text-green-800"
        disabled={isLoading}
      >
        Reenviar código
      </Button>
      <Button
        type="button"
        onClick={() => onSubmit(code.join(""))}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        disabled={isLoading || code.some((digit) => !digit)}
      >
        {isLoading ? "Verificando..." : "Continuar"}
      </Button>
    </div>
  )
}

