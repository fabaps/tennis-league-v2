import { cn } from "@/lib/utils";
import React from "react";

interface ViewProps {
  className?: string;
  children: React.ReactNode;
}
const View: React.FC<ViewProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col z-3 items-center pb-20 pt-5 w-full max-w-[1000px] px-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export default View;
