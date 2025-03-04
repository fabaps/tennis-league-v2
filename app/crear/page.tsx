"use client"

import { useState } from "react"
import { ArrowLeft, Users2, User, Lock, CheckCircle2, Info, Plus, ChevronRight, MapPin, Calendar } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import LocationDialog from "../components/LocationDialog"
import DateTimeDialog from "../components/DateTimeDialog"

export default function CrearPartidoPage() {
  const [showLocationDialog, setShowLocationDialog] = useState(true)
  const [showDateTimeDialog, setShowDateTimeDialog] = useState(false)
  const [isReserved, setIsReserved] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)
  const [matchType, setMatchType] = useState<"singles" | "dobles">("singles")
  const [selectedClub, setSelectedClub] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const handleLocationSelect = (locationType: "club" | "private", clubName?: string) => {
    setShowLocationDialog(false)
    if (locationType === "club" && clubName) {
      setSelectedClub(clubName)
      setIsReserved(true)
    }
  }

  const handleDateTimeSelect = (date: Date | undefined, time: string) => {
    if (date) {
      setSelectedDate(date)
      setSelectedTime(time)
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })
  }

  return (
    <>
      <LocationDialog
        isOpen={showLocationDialog}
        onClose={() => setShowLocationDialog(false)}
        onLocationSelect={handleLocationSelect}
      />
      <DateTimeDialog
        isOpen={showDateTimeDialog}
        onClose={() => setShowDateTimeDialog(false)}
        onDateTimeSelect={handleDateTimeSelect}
      />

      <div className="min-h-screen bg-white">
        {/* Top Navigation */}
        <div className="flex items-center px-4 py-3 border-b">
          <Link href="/" className="p-2 -ml-2">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold ml-2">Nuevo partido</h1>
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* Match Type Selection */}
          <div className="flex gap-3">
            <button
              className={`flex-1 border rounded-xl py-2 px-3 flex items-center justify-center gap-2 ${
                matchType === "singles" ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
              onClick={() => setMatchType("singles")}
            >
              <User className={`h-5 w-5 ${matchType === "singles" ? "text-blue-500" : "text-gray-700"}`} />
              <span className={`text-sm ${matchType === "singles" ? "text-blue-500 font-medium" : "text-gray-700"}`}>
                Singles
              </span>
            </button>

            <button
              className={`flex-1 border rounded-xl py-2 px-3 flex items-center justify-center gap-2 ${
                matchType === "dobles" ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
              onClick={() => setMatchType("dobles")}
            >
              <Users2 className={`h-5 w-5 ${matchType === "dobles" ? "text-blue-500" : "text-gray-700"}`} />
              <span className={`text-sm ${matchType === "dobles" ? "text-blue-500 font-medium" : "text-gray-700"}`}>
                Dobles
              </span>
            </button>
          </div>

          {/* Players Selection */}
          <div className="border border-gray-200 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center">
              {matchType === "singles" ? (
                <User className="h-5 w-5 text-gray-700" />
              ) : (
                <Users2 className="h-5 w-5 text-gray-700" />
              )}
              <span className="text-sm ml-2">{matchType === "singles" ? "1 vs 1" : "2 vs 2"}</span>
            </div>
            <div className="flex items-center -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.39%20-%20An%20eleventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20-oJWiw24SazV4nI40VBn9FGsHL4XYPr.webp"
                  alt="Player"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              {[...(matchType === "singles" ? [1] : [1, 2, 3])].map((_, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white"
                >
                  <Plus className="h-4 w-4 text-blue-600" />
                </button>
              ))}
            </div>
          </div>

          {/* Date and Time */}
          <button
            className="w-full bg-gray-50 rounded-xl p-3 flex items-center justify-between"
            onClick={() => setShowDateTimeDialog(true)}
          >
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-700 mr-2" />
              <span className="text-sm">
                {selectedDate && selectedTime ? `${formatDate(selectedDate)} - ${selectedTime}` : "Fecha y Hora"}
              </span>
            </div>
            {selectedDate && selectedTime ? (
              <span className="text-xs text-green-600 font-medium">Completa</span>
            ) : (
              <Plus className="h-5 w-5" />
            )}
          </button>

          {/* Location */}
          <button
            className="w-full bg-gray-50 rounded-xl p-3 flex items-center justify-between"
            onClick={() => setShowLocationDialog(true)}
          >
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-700 mr-2" />
              <span className="text-sm">{selectedClub ? selectedClub : "Localización"}</span>
            </div>
            {selectedClub ? (
              <span className="text-xs text-green-600 font-medium">Completa</span>
            ) : (
              <Plus className="h-5 w-5" />
            )}
          </button>

          {/* Match Details */}
          <div className="pt-2">
            <h2 className="text-lg font-bold mb-2">Detalles de partido</h2>

            <button className="w-full py-3 flex items-center justify-between border-b">
              <div className="flex items-center">
                <Users2 className="h-5 w-5 text-gray-700" />
                <span className="text-sm ml-2">Tipo de partido</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="text-sm mr-1">Competitivo</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </button>

            <div className="py-3 flex items-center justify-between border-b">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-gray-700" />
                <span className="text-sm ml-2">Marcar pista como reservada</span>
              </div>
              <Switch checked={isReserved} onCheckedChange={setIsReserved} />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-gray-700" />
                <span className="text-sm ml-2">Marcar partido como privado</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
                <button className="p-1">
                  <Info className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Create Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-base rounded-full">
            Crear partido
          </Button>
        </div>
      </div>
    </>
  )
}

