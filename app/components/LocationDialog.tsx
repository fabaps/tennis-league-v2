"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, Building2 } from "lucide-react"

interface LocationDialogProps {
  isOpen: boolean
  onClose: () => void
  onLocationSelect: (locationType: "club" | "private", clubName?: string) => void
}

const popularClubs = ["Federacion z15", "Club Delfines", "Camino Real", "Sporta"]

export default function LocationDialog({ isOpen, onClose, onLocationSelect }: LocationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md fixed bottom-0 top-auto rounded-t-[20px] rounded-b-none translate-y-0 animate-slide-up bg-white">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold">¿Dónde se juega el partido?</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Clubes más populares</h3>
            {popularClubs.map((club) => (
              <button key={club} className="w-full text-left" onClick={() => onLocationSelect("club", club)}>
                <div className="rounded-lg border border-gray-200 p-3 hover:bg-gray-50 bg-white transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-gray-50 p-2">
                      <Building2 className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{club}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <button className="w-full text-left" onClick={() => onLocationSelect("private")}>
            <div className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50 bg-white transition-colors">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-gray-50 p-2">
                  <MapPin className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Otro club o cancha privada</h3>
                  <p className="text-sm text-gray-600 mt-1">Cancha de tu condominio, club exclusivo y más.</p>
                </div>
              </div>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

