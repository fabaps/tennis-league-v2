import { cn } from "@/lib/utils";
import React from "react";

interface ViewProps {
  className?: string;
  children: React.ReactNode;
}
const View: React.FC<ViewProps> = ({ children, className }) => {
  return <div className={cn("flex p-5 h-full w-full", className)}>{children}</div>;
};

export default View;
