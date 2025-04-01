import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from "@/components/ui/badge"
import { Calendar } from 'lucide-react'
import { Torneo } from '../../types'
import { formatFirebaseTimestamp } from '@/firebase/tournaments'

export const TournamentCard = ({ torneoActivo }: { torneoActivo: Torneo }) => {
    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          {/* Gradiente oscuro sobre la imagen para mejorar legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

          {/* Imagen del torneo */}
          <Image
            src={torneoActivo.image || "/placeholder.svg"}
            alt={torneoActivo.name}
            width={800}
            height={400}
            priority
            className="w-full h-64 object-cover"
          />

          {/* Información del torneo */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
            {torneoActivo.openRegistration && <Badge className="bg-green-500 mb-2">¡Inscripciones Abiertas!</Badge>}
            <h1 className="text-2xl font-bold mb-1">{torneoActivo.name}</h1>
            <div className="flex items-center text-sm mb-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatFirebaseTimestamp(torneoActivo.startDate)}</span>
            </div>

            {/* Botón para ver detalles del torneo */}
            <Link href={`/torneos/${torneoActivo.id}`} className="block">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Inscribirse</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    )
}
