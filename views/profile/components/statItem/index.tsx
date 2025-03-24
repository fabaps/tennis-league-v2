import React from "react";
import { border_color_$ } from "./styles";

interface StatItemProps {
  title?: string;
  main?: boolean;
  value?: string | number;
  icon?: React.ReactNode;
}
const StatItem: React.FC<StatItemProps> = ({ main, title, value, icon }) => {
  return (
    <div
      className={`bg-black/50 p-4 rounded-md border-2 flex flex-col items-center justify-between gap-4 ${
        border_color_$[main ? "main" : "secondary"]
      }`}
    >
      {icon}
      <div className="flex flex-col items-center text-center w-full">
        <h2 className="text-white text-xs">{title}</h2>
        <div className="w-full">
          <p className="text-white text-md break-words">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatItem;
