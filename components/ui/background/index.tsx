import React from "react";

import { GENERATIVE_BACKGROUND } from "@/config";

import Environment from "./components/environment";
import bg_gradient_to_$ from "./styles";

interface BackgroundProps {
  bDir?: "t" | "b";
  extraShadow?: boolean;
}
const Background: React.FC<BackgroundProps> = ({ bDir = "b", extraShadow }) => {
  const bgGradient = bg_gradient_to_$[bDir];
  const alternateBg = bDir === "t" ? "bg-gradient-to-b" : "bg-gradient-to-t";

  if (!GENERATIVE_BACKGROUND) return null;

  return (
    <>
      <Environment />

      <div className="h-dvh w-full fixed bottom-0 left-0 pointer-events-none opacity-35 z-10000">
        <svg
          height="100%"
          viewBox="0 0 1000 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.9"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>

          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <div
        className={`animate-fade ${bgGradient} from-transparent to-[rgba(0,0,0,.7)] fixed z-2 h-dvh w-dvw top-0 left-0`}
      />

      {extraShadow && (
        <div
          className={`animate-fade ${alternateBg} from-transparent to-[rgba(0,0,0,.7)] fixed z-2 h-dvh w-dvw top-0 left-0`}
        />
      )}
    </>
  );
};

export default Background;
