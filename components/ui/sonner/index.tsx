"use client";

import { useTheme } from "next-themes";

import dynamic from "next/dynamic";
import type { ToasterProps } from "sonner";

const ToasterSonner = dynamic(
  () => import("sonner").then((mod) => mod.Toaster),
  { ssr: false }
);

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <ToasterSonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export default Toaster;
