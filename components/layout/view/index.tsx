import { cn } from "@/lib/utils";
import React from "react";

interface ViewProps {
  className?: string;
  children: React.ReactNode;
}
const View: React.FC<ViewProps> = ({ children, className }) => {
  return <div className={cn("flex", className)}>{children}</div>;
};

export default View;
