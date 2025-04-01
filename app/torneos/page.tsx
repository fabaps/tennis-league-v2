"use client";
import React from "react";
import { TournamentCard } from "./[id]/components/TournamentCard";
import Header from "../components/Header";
import { useTournamentStore } from "@/store/useTournamentStore";


const TorneosPage = () => {
  const {tournaments} = useTournamentStore((state) => state)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Torneos" />
      <main className="pt-16 pb-20 px-4 flex items-center justify-center">
        {tournaments.map((torneo) => (
          <TournamentCard key={torneo.id} torneoActivo={torneo} />
        ))}
      </main>
    </div>
  );
};

export default TorneosPage;
