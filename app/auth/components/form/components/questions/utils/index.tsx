import { Calendar, Clock, PlayCircle, Trophy } from "lucide-react";

import { LoginQuestion } from "../types";

const questions: LoginQuestion[] = [
  {
    title: "¿Cuál es el nivel más alto de tenis que has jugado?",
    description: "Selecciona tu nivel más alto de juego",
    icon: Trophy,
    type: "radio",
    name: "nivel",
    options: [
      { label: "No juego pero quiero empezar", value: 0, icon: "🎾" },
      {
        label: "Tenis Recreativo (casual, con amigos)",
        value: 1.5,
        icon: "🏸",
      },
      {
        label: "Torneos de Club (torneos internos fuera de la federacion)",
        value: 2.1,
        icon: "🏆",
      },
      {
        label: "Torneos Ranking Nacional en la Federacion",
        value: 2.8,
        icon: "🥇",
      },
      {
        label: "Torneos Nacionales (Circuitos federados privados)",
        value: 5.1,
        icon: "🏅",
      },
      {
        label: "Torneos Internacionales (ITF, COSAT, regionales de alto nivel)",
        value: 6.5,
        icon: "🌎",
      },
      { label: "Profesional (ATP/WTA/PTT/ITF)", value: 8, icon: "⭐" },
    ],
  },
  {
    title: "¿Con qué frecuencia juegas tenis?",
    description: "Indica tu frecuencia habitual de juego",
    icon: Calendar,
    type: "radio",
    name: "frecuencia",
    options: [
      { label: "No juego pero quiero empezar", value: 0, icon: "🆕" },
      { label: "Algunas veces al año", value: 0.5, icon: "📅" },
      { label: "Algunas veces al mes", value: 1, icon: "📆" },
      { label: "Algunas veces a la semana", value: 2.21, icon: "📊" },
      { label: "Casi todos los días", value: 3, icon: "🔥" },
    ],
  },
  {
    title: "¿Cuántos partidos de 2 o más sets has jugado en tu vida?",
    description: "Selecciona el rango que mejor represente tu experiencia",
    icon: PlayCircle,
    type: "radio",
    name: "partidos",
    options: [
      { label: "No juego partidos", value: 0, icon: "❌" },
      { label: "1-5 partidos", value: 0.5, icon: "1️⃣" },
      { label: "6-25 partidos", value: 1.5, icon: "2️⃣" },
      { label: "26+ partidos", value: 3, icon: "3️⃣" },
    ],
  },
  {
    title: "¿Cuántos años llevas jugando tenis?",
    description: "Indica tu tiempo de experiencia en el deporte",
    icon: Clock,
    type: "radio",
    name: "experiencia",
    options: [
      { label: "Menos de 1 año", value: 0, icon: "🌱" },
      { label: "1-3 años", value: 0.5, icon: "🌿" },
      { label: "4-6 años", value: 1, icon: "🌳" },
      { label: "7-10 años", value: 1.5, icon: "🌲" },
      { label: "Más de 10 años", value: 2, icon: "🏛️" },
    ],
  },
];

export const animationDelay = [
  "animate-delay-0",
  "animate-delay-100",
  "animate-delay-200",
  "animate-delay-300",
  "animate-delay-400",
  "animate-delay-500",
  "animate-delay-600",
  "animate-delay-700",
  "animate-delay-800",
  "animate-delay-900",
]

export default questions;
