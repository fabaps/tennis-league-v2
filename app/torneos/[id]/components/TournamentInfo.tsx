"use client"

import { Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Torneo, Tournament } from "../../types"
import { formatFirebaseTimestamp } from "@/firebase/tournaments"

export const TournamentInfo = ({ tournament }: { tournament: Tournament }) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Acerca del torneo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{tournament.description}</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold">Organizador</h3>
            <p className="text-sm text-gray-600">{tournament.organizer}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Formato</h3>
            <p className="text-sm text-gray-600">{tournament.format}</p>
          </div>
        </div>

        {/* Calendario del torneo */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2">Calendario del torneo</h3>
          <div className="space-y-2">
            {tournament.stages.map((etapa, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium">{etapa.name}</span>
                  <span className="text-green-600">{formatFirebaseTimestamp(etapa.date)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{etapa.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-blue-50 rounded-lg p-3 text-sm">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-blue-600">
              Durante las etapas de Round Robin, Cuartos de Final y Semifinales, los jugadores deberán coordinar entre
              sí para elegir las canchas y horarios de sus partidos. Solo las finales se jugarán en las canchas
              patrocinadas.
            </p>
          </div>
        </div>

        {/* Información de promoción detallada */}
        {tournament.promotion?.active && (
          <div className="bg-yellow-50 rounded-lg p-3 text-sm mt-4">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-yellow-800 font-medium">Aprovecha nuestra promoción especial</p>
                <p className="text-yellow-700 mt-1">
                  Inscríbete antes del {formatFirebaseTimestamp(tournament.promotion.limitDate)} y obtén un {tournament.promotion.discount}% de
                  descuento. Precio normal: Q{(tournament.price / 100).toFixed(2)}, {tournament.promotionPrice && `precio promocional: Q${(tournament.promotionPrice / 100).toFixed(2)}`}.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
