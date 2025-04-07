import {
  BarChart3,
  Calendar,
  ShoppingBag,
  Smartphone,
  Trophy,
  Users,
} from "lucide-react";

import { FeatureReel } from "../types";

const featureReels: FeatureReel[] = [
  {
    icon: <Trophy className="w-6 h-6 text-white" />,
    title: "Torneos",
    badge: "Próximamente",
    description:
      "Sigue el bracket en tiempo real, revisa resultados y conoce a tus próximos rivales.",
    image: "/images/banner/tournaments.webp",
    showArrow: true,
    index: 1,
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-white" />,
    title: "Estadísticas H2H",
    badge: "Próximamente",
    description:
      "Compara tu historial contra cualquier rival y analiza tu rendimiento en la cancha.",
    image: "/images/banner/analytics.webp",
    showArrow: true,
    index: 2,
    customStyle: true,
  },
  {
    icon: <ShoppingBag className="w-6 h-6 text-white" />,
    title: "Marketplace",
    badge: "Próximamente",
    description:
      "Compra y vende artículos de tenis fácilmente dentro de la comunidad.",
    image: "/images/banner/market.webp",
    showArrow: true,
    index: 3,
  },
  {
    icon: <Calendar className="w-6 h-6 text-white" />,
    title: "Reserva de clases",
    badge: "Próximamente",
    description:
      "Encuentra entrenadores, agenda sesiones y mejora tu juego sin complicaciones.",
    image: "/images/banner/calendar.webp",
    showArrow: true,
    index: 4,
  },
  {
    icon: <Users className="w-6 h-6 text-white" />,
    title: "Comunidad GTL",
    badge: "Próximamente",
    description:
      "Conéctate con jugadores, organiza partidos y sé parte del tenis en un solo lugar.",
    image: "/images/banner/community.webp",
    showArrow: true,
    index: 5,
  },
  {
    icon: <Smartphone className="w-6 h-6 text-white" />,
    description: "Pronto en todas partes",
    badge: "Próximamente",
    title: "Disponible para iOS y Android 🚀",
    image: "/images/banner/app.webp",
    showArrow: false,
    index: 6,
  },
];

export default featureReels;

export const scrollToReel = (index: number) => () => {
  window.scrollTo({
    top: index * window.innerHeight * 2,
    behavior: "smooth",
  });
};
