import { useSearchParams } from "next/navigation";
import React from "react";

import { useRanks } from "@/hooks/rank";

import List from "./components/list";
import Top3 from "./components/top3";

const Table: React.FC = () => {
  const { rankData } = useRanks();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const isSearchOpen = (search?.length ?? -1) >= 0;

  const sortedRankData = rankData?.sort(
    (a, b) => Number(a.ranking ?? 0) - Number(b.ranking ?? 0)
  );

  return (
    <main className="mt-8 flex flex-col items-center animate-fade-up w-full justify-center">
      <Top3 data={sortedRankData?.slice(0, 3)} hide={isSearchOpen} />
      <List data={sortedRankData} hide={isSearchOpen} />
    </main>
  );
};

export default Table;
