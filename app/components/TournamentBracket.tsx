"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface Player {
  id: number
  name: string
}

interface Match {
  id: number
  round: number
  player1: Player | null
  player2: Player | null
  winner: Player | null
}

const generateBracket = (players: Player[]): Match[] => {
  const totalRounds = Math.log2(players.length)
  const matches: Match[] = []
  let matchId = 1

  for (let round = 1; round <= totalRounds; round++) {
    const matchesInRound = players.length / 2 ** round
    for (let i = 0; i < matchesInRound; i++) {
      if (round === 1) {
        matches.push({
          id: matchId++,
          round,
          player1: players[i * 2],
          player2: players[i * 2 + 1],
          winner: null,
        })
      } else {
        matches.push({
          id: matchId++,
          round,
          player1: null,
          player2: null,
          winner: null,
        })
      }
    }
  }

  return matches
}

export default function TournamentBracket({ currentUserId }: { currentUserId: number }) {
  const [matches, setMatches] = useState<Match[]>([])

  useEffect(() => {
    // Simular la obtención de jugadores del servidor
    const players: Player[] = Array.from({ length: 32 }, (_, i) => ({
      id: i + 1,
      name: `Jugador ${i + 1}`,
    }))

    const initialBracket = generateBracket(players)
    setMatches(initialBracket)
  }, [])

  const renderMatch = (match: Match, roundIndex: number) => {
    const isCurrentUser = (player: Player | null) => player?.id === currentUserId

    return (
      <div key={match.id} className="relative">
        <Card className="mb-2 w-40">
          <CardContent className="p-2">
            <div className={`text-xs ${isCurrentUser(match.player1) ? "font-bold text-green-600" : ""}`}>
              {match.player1?.name || "TBD"}
            </div>
            <div className={`text-xs ${isCurrentUser(match.player2) ? "font-bold text-green-600" : ""}`}>
              {match.player2?.name || "TBD"}
            </div>
          </CardContent>
        </Card>
        {roundIndex < 4 && (
          <div className="absolute top-1/2 right-0 w-4 h-px bg-gray-300 transform translate-x-full"></div>
        )}
        {roundIndex > 0 && (
          <div className="absolute top-1/2 left-0 w-4 h-px bg-gray-300 transform -translate-x-full"></div>
        )}
      </div>
    )
  }

  const roundNames = ["Primera Ronda", "Segunda Ronda", "Cuartos de Final", "Semifinales", "Final"]

  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)]">
      <div className="flex space-x-8 p-4">
        {Array.from({ length: Math.log2(32) }, (_, roundIndex) => (
          <div key={roundIndex} className="flex flex-col">
            <h3 className="text-sm font-semibold mb-4 text-green-700 text-center">{roundNames[roundIndex]}</h3>
            <div className={`space-y-${2 ** (roundIndex + 1)} flex flex-col items-center`}>
              {matches.filter((match) => match.round === roundIndex + 1).map((match) => renderMatch(match, roundIndex))}
            </div>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

