import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, Clock, Share2 } from "lucide-react";
import Image from "next/image";
import { Torneo } from "../../types";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuth";
import { formatFirebaseTimestamp } from "@/firebase/tournaments";
import { shareLink } from "@/utils/share";

export const HeaderTournament = ({ tournament}: { tournament: Torneo }) => {
    const router = useRouter();
    const { currentUser } = useAuthStore(
        (state) => state
      );

    const handleInscripcion = (Tournament: Torneo) => {
        if (Tournament.openRegistration) {
            window.location.href = `https://app.recurrente.com/checkout-session/ch_922imgolss3twdhd`;
        }
    }
    
    return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold flex-1">{tournament.name}</h1>
        <Button variant="ghost" size="icon" onClick={() => {
          const url = typeof window !== "undefined" ? window.location.href : "";
          shareLink(url);
        }}>
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="relative rounded-xl overflow-hidden h-48 mb-4">
        <Image src={tournament.image || "/placeholder.svg"} alt={tournament.name} fill className="object-cover" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2 text-green-600" />
          <span>{formatFirebaseTimestamp(tournament?.startDate)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2 text-green-600" />
          <span>Inscripciones {tournament.openRegistration ? "abiertas" : "cerradas"}</span>
        </div>
        {/* Información de promoción si está activa */}
        {tournament.promotion?.active && (
          <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm font-medium text-yellow-800">
              ¡Promoción especial! {tournament.promotion.discount}% de descuento hasta el {formatFirebaseTimestamp(tournament.promotion.limitDate)}
            </p>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-500 line-through mr-2">Q{(tournament.price / 100).toFixed(2)}</span>
              {tournament.promotionPrice && (
                <span className="text-base font-bold text-green-600">Q{(tournament.promotionPrice / 100).toFixed(2)}</span>
              )}
            </div>
          </div>
        )}
        {/* Mensaje de categoría permitida */}
        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm font-medium text-blue-800">
            Únicamente puedes participar en la categoría {currentUser?.category || 'D'} según tu nivel actual.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          disabled={!tournament.openRegistration}
          onClick={() => handleInscripcion(tournament)}
        >
          {tournament.openRegistration
            ? `Inscribirse - Q${tournament.promotion?.active ? tournament.promotionPrice && (tournament.promotionPrice / 100).toFixed(2) : (tournament.price / 100).toFixed(2)}`
            : "Inscripciones cerradas"}
        </Button>
      </div>
    </div>
  )}