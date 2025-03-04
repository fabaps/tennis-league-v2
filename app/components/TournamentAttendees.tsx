import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Attendee {
  id: number
  name: string
  avatar: string
}

interface TournamentAttendeesProps {
  totalAttendees: number
  displayedAttendees: Attendee[]
}

export default function TournamentAttendees({ totalAttendees, displayedAttendees }: TournamentAttendeesProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Asistentes</h3>
        <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
          {totalAttendees} confirmados
        </span>
      </div>
      <div className="flex -space-x-2 overflow-hidden">
        {displayedAttendees.map((attendee) => (
          <Avatar key={attendee.id} className="inline-block border-2 border-white">
            <AvatarImage src={attendee.avatar} alt={attendee.name} />
            <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
          </Avatar>
        ))}
        {totalAttendees > displayedAttendees.length && (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-xs font-medium text-gray-600 border-2 border-white">
            +{totalAttendees - displayedAttendees.length}
          </div>
        )}
      </div>
    </div>
  )
}

