"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Calendar, Clock, ChevronLeft, Share2, Info, Users } from "lucide-react"
import Header from "../../components/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Torneo, Tournament } from "../types"
import { HeaderTournament } from "./components/HeaderTournament"
import { ParticipatsList } from "./components/ParticipatsList"
import { TournamentInfo } from "./components/TournamentInfo"
import { useUsers, useUsersStore } from "@/store/useUsers"
import { User } from "@/types/user"
import { useTournamentStore } from "@/store/useTournamentStore"

// Definición de tipos para mejorar la legibilidad




/**
 * Datos de torneos disponibles
 * En una aplicación real, estos datos vendrían de una API
 */

export default function DetalleTorneoPage() {
  const params = useParams()
  const id = String(params.id)

  const { users } = useUsersStore()

  const { tournaments, fetchTournaments} = useTournamentStore()
    console.log("tournaments    ", tournaments)
    const addUserInfoToTournament = (tournament: Torneo, users: User[]): Tournament => {
        
      return {
        ...tournament,
        registeredPlayers: tournament?.registeredPlayers.map((userId) => users.find((u) => u.id === userId)).filter(Boolean) as User[],
      }
    }



  
    useEffect(() => {
      fetchTournaments()
    }, [])


    const tournamentData = addUserInfoToTournament(tournaments.find((t) => t.id === id) as Torneo, users)


  const [activeTab, setActiveTab] = useState("informacion")

  // Buscar el torneo por ID
  const torneo = tournaments.find((t) => t.id === id)

  // Si no se encuentra el torneo, mostrar mensaje
  if (!torneo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Torneo no encontrado</p>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Detalle del Torneo" />
      <main className="pt-8 pb-20 px-4">
        <HeaderTournament tournament={torneo} />
        <Tabs defaultValue="informacion" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="informacion" className={`${activeTab === 'informacion' ? '!bg-green-600 !text-white font-bold' : 'text-gray-500'}`}>Información</TabsTrigger> 
          <TabsTrigger value="participantes" className={`${activeTab === 'participantes' ? '!bg-green-600 !text-white font-bold' : 'text-gray-500'}`}>Participantes</TabsTrigger>
          </TabsList>
          <TabsContent value="informacion" className="mt-4">
            <TournamentInfo tournament={tournamentData} />
          </TabsContent>
          <TabsContent value="participantes" className="mt-4">
            <ParticipatsList tournament={tournamentData} />
          </TabsContent>  
        </Tabs>
      </main>
    </div>
  )
}