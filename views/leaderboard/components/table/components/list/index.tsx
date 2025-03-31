import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCurrentWalletAddress } from "@/hooks/wallet";
import { formatCurrency, trimWallet } from "@/lib/utils";
import ROUTES from "@/routes";
import { Rank } from "@/types/rank";

import { useSearchScroll } from "./hooks";
import { row_active_style, table_not_hidden } from "./styles";

interface ListProps {
  data?: Rank[] | null;
  hide?: boolean;
}
const List: React.FC<ListProps> = ({ data, hide }) => {
  const [showMore, setShowMore] = useState(false);
  const { wallet } = useCurrentWalletAddress();
  const navigation = useRouter();

  const goToProfile = (wallet: string) => () =>
    navigation.push(`${ROUTES.PROFILE}/${wallet}`);

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const toggleShowMore = () => setShowMore(!showMore);

  const searchWalletIndex = data?.findIndex((item) =>
    item.wallet_address.includes(search ?? "")
  );

  useSearchScroll({ searchWalletIndex });

  if (!data) return null;

  return (
    <div
      className={`overflow-x-auto ${
        table_not_hidden[hide ? "hide" : "show"]
      } animate-fade-up animate-delay-[1000ms] w-full sm:w-[55%] bg-black/50 border-2 rounded-md backdrop-blur-xs tracking-wide border-[white] shadow-[0_0_5px_white,_inset_0_0_5px_white]`}
    >
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-white px-6 uppercase underline">
              Rank
            </TableHead>
            <TableHead className="text-white px-6 uppercase underline">
              Wallet
            </TableHead>
            <TableHead className="text-white px-6 uppercase underline">
              PNL
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data
            ?.slice(hide ? 0 : 3, showMore ? data.length : 10)
            .map((entry) => {
              const wallets = data.filter((item) =>
                item.wallet_address.includes(search ?? "")
              );

              let isActive = false;

              if (wallets.length > 0) {
                isActive = wallets[0].wallet_address === entry.wallet_address;
              } else if (wallet) {
                isActive = entry.wallet_address === wallet;
              }

              return (
                <TableRow
                  key={entry.user_stat_id}
                  onClick={goToProfile(entry.wallet_address)}
                  title={`View profile of ${entry.wallet_address.toString()}`}
                  className={`${
                    row_active_style[isActive ? "active" : "inactive"]
                  } cursor-pointer`}
                >
                  <TableCell className="px-6 py-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white shadow-[0_0_5px_var(--primary  )]">
                      <Image
                        src={
                          entry.user_profile_picture ??
                          "/images/avatar/avatar1.png"
                        }
                        alt={`Rank ${entry.ranking} profile`}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>

                    <p className="text-white text-sm">{entry.ranking}</p>
                  </TableCell>

                  <TableCell className="px-6 py-3 text-white text-sm">
                    {trimWallet(entry.wallet_address)}
                  </TableCell>

                  <TableCell className="px-6 py-3 text-white text-sm">
                    {formatCurrency(entry.total_pnl)}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      {/* EXPAND */}
      <div className="p-4 text-center flex flex-row gap-4 items-center justify-center">
        <p className="text-[var(--neon-blue)] h-6">
          {
            <span className="text-white text-xs">
              {hide
                ? "Search results"
                : showMore
                ? "Showing all"
                : "Showing top 10"}
            </span>
          }
        </p>

        <Button variant="outline" onClick={toggleShowMore}>
          {<span>{showMore ? "Show less" : "Show more"}</span>}
        </Button>
      </div>
    </div>
  );
};

export default List;
