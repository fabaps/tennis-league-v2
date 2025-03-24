import React from "react";

import { Rank } from "@/types/rank";

import Podium from "./components/podium";

interface Top3Props {
  hide?: boolean;
  data?: Rank[];
}
const Top3: React.FC<Top3Props> = ({ hide, data }) => {
  if (hide) return null;
  if (!data) return null;

  return (
    <div className="relative flex flex-col w-full max-w-[1000px] px-6 justify-center items-center">
      <Podium data={data} />
    </div>
  );
};

export default Top3;
