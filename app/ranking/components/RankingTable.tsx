import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RankingData } from "../utils/types";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { calculateRankingByUTR } from "@/utils/ranking";
import { UserAvatar } from "@/components/ui/user-avatar";

interface RankingTableProps {
  users: RankingData[];
  currentUser: RankingData;
  onPlayerClick: (id: string) => void;
}

const truncateName = (name: string, maxLength: number = 15) => {
  if (name.length <= maxLength) return name;
  return `${name.substring(0, maxLength)}...`;
};

export function RankingTable({
  users,
  currentUser,
  onPlayerClick,
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell className="font-semibold w-12">#</TableCell>
          <TableCell className="font-semibold max-w-[calc(100%-96px)]">
            Jugador
          </TableCell>
          <TableCell className="font-semibold w-16 text-right">UTR</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AnimatePresence mode="popLayout">
          {users
            .sort((a, b) => (b.utr || 0) - (a.utr || 0))
            .map((player, index) => (
              <motion.tr
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                className={`cursor-pointer hover:bg-gray-50 whitespace-nowrap ${
                  player.id === (currentUser?.id || null) ? "bg-green-50" : ""
                }`}
                // onClick={() => onPlayerClick(player.id)}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell className="flex items-center gap-2">
                 
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: index * 0.05 + 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <UserAvatar
                    name={player.name}
                    photo={player.photo}
                    size={32}
                    className="ring-4 ring-white"
                  />
                    </motion.div>
              
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  >
                    {truncateName(player.name)}
                  </motion.span>
                </TableCell>
                <TableCell className="text-right">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.3 }}
                  >
                    {player.utr}
                  </motion.span>
                </TableCell>
              </motion.tr>
            ))}
        </AnimatePresence>
      </TableBody>
    </Table>
  );
}
