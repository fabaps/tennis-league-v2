"use client"

import {Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CATEGORIES } from "@/app/ranking/utils/categories"
import { Tournament } from "../../types"


 export const ParticipatsList = ({ tournament }: { tournament: Tournament }) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Participantes por Categoría</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="MAYOR" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            {CATEGORIES.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {CATEGORIES.map((cat) => {
            const jugadoresCategoria = tournament.registeredPlayers.filter((j) => j.category === cat)
            return (
              <TabsContent key={cat} value={cat}>
                {jugadoresCategoria.length > 0 ? (
                  <div className="bg-gray-50 rounded-lg">
                    <div className="p-3 border-b bg-green-50">
                      <h3 className="font-medium flex items-center">
                        <Badge className="mr-2 bg-green-600">Categoría {cat}</Badge>
                        <span className="text-sm text-gray-500">
                          {jugadoresCategoria.length} {jugadoresCategoria.length === 1 ? "jugador" : "jugadores"}
                        </span>
                      </h3>
                    </div>
                    {/* Lista de jugadores en esta categoría */}
                    {jugadoresCategoria.map((jugador, idx) => (
                      <div key={idx} className="flex items-center p-3 border-b last:border-b-0">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage src={jugador.photo} alt={jugador.name} />
                          <AvatarFallback>{jugador.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{jugador.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                    <Users className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p>No hay participantes en la categoría {cat}</p>
                  </div>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </CardContent>
    </Card>
  )