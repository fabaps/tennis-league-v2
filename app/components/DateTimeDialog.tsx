"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DateTimeDialogProps {
  isOpen: boolean
  onClose: () => void
  onDateTimeSelect: (date: Date | undefined, time: string) => void
}

export default function DateTimeDialog({ isOpen, onClose, onDateTimeSelect }: DateTimeDialogProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string>("")

  const handleConfirm = () => {
    if (date && time) {
      onDateTimeSelect(date, time)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md fixed bottom-0 top-auto rounded-t-[20px] rounded-b-none translate-y-0 animate-slide-up bg-white">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold">Seleccionar fecha y hora</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border mx-auto" />
          <div className="mt-2 px-4">
            <Select onValueChange={setTime} value={time}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar hora" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                  <SelectItem key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                    {`${hour.toString().padStart(2, "0")}:00`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="p-4 border-t">
          <Button onClick={handleConfirm} className="w-full" disabled={!date || !time}>
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

