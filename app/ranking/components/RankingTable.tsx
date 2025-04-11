import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";



import { RankingUser } from "@/types/user";
import { RebelAvatar } from "@/components/rebelUI/RebelAvatar";
  
  export interface RankingTableProps {
    users: RankingUser[];
    currentUser: RankingUser | undefined;
    onPlayerClick: (id: string) => void;
  }
  
  const truncateName = (name: string, maxLength: number = 15) => {
    if (name.length <= maxLength) return name;
    return `${name.substring(0, maxLength)}...`;
  };
  
  export function RankingTable({
    users,
    currentUser,
    // onPlayerClick,
  }: RankingTableProps) {
    if (users.length === 0) {
      return (
        <div className="py-2">
          <p className="text-gray-500 text-center">
            No hay jugadores en esta categoría
          </p>
        </div>
      );
    }
  
    return (
      <Table >
        <TableHeader>
          <TableRow>
            <TableCell className="font-semibold w-12">#</TableCell>
            <TableCell className="font-semibold max-w-[calc(100%-96px)]">
              Jugador
            </TableCell>
            <TableCell className="font-semibold w-16 text-right">GTR</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users
              .sort((a, b) => (Number(b.utr) || 0) - (Number(a.utr) || 0))
              .map((player, index) => (
                <tr
                  key={player.id}
                  className={`cursor-pointer hover:bg-gray-50 whitespace-nowrap ${
                    player.id === (currentUser?.id || null) ? "bg-green-50" : ""
                  }`}
                  // onClick={() => onPlayerClick(player.id)}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="flex items-center gap-2">
                   
                      <div
                      
                      >
                        <RebelAvatar user={player} />
                      </div>
                
                    <span
                    >
                      {truncateName(player.name)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                    >
                      {Number(player.utr || 0).toFixed(2)}
                    </span>
                  </TableCell>
                </tr>
              ))}
        </TableBody>
      </Table>
    );
  }