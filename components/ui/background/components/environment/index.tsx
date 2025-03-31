import React, { useEffect, useState } from "react";

import { MOTION_BACKGROUND } from "@/config";
import { cn } from "@/lib/utils";

const BACKGROUNDS = ["bg_1", "bg_2", "bg_3", "bg_4", "bg_5", "bg_6"];

const Environment: React.FC = () => {
  const [randomBacks, setRandomBacks] = useState<string[]>([]);

  useEffect(() => {
    const randomBack1 =
      BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
    const randomBack2 =
      BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
    const randomBack3 =
      BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
    const randomBack4 =
      BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];

    setRandomBacks([randomBack1, randomBack2, randomBack3, randomBack4]);
  }, []);

  const isMotionBackground = Number(MOTION_BACKGROUND) === 1;

  if (randomBacks.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 z-1 h-dvh w-full">
      <div
        style={{
          animation: !isMotionBackground
            ? ""
            : "scale 180s ease-out alternate infinite",
          backgroundImage: `url(/images/${randomBacks[0]}/layer1.png)`,
        }}
        className={cn(
          "fixed h-[110vh] w-full bg-repeat-x bg-cover bg-center animate-fade",
          "animate-delay-[600ms]"
        )}
      ></div>
      <div
        style={{
          animation: !isMotionBackground
            ? ""
            : "scale 150s ease-out alternate infinite",
          backgroundImage: `url(/images/${randomBacks[1]}/layer2.png)`,
        }}
        className={cn(
          "fixed h-[110vh] w-full bg-repeat-x bg-cover bg-center animate-fade",
          "animate-delay-[400ms]"
        )}
      ></div>
      <div
        style={{
          animation: !isMotionBackground
            ? ""
            : "scale 90s ease-out alternate infinite",
          backgroundImage: `url(/images/${randomBacks[2]}/layer3.png)`,
        }}
        className={cn(
          "fixed h-[110vh] w-full bg-repeat-x bg-cover bg-center animate-fade",
          "animate-delay-[200ms]"
        )}
      ></div>
      <div
        style={{
          animation: !isMotionBackground
            ? ""
            : "scale 50s ease-out alternate infinite",
          backgroundImage: `url(/images/${randomBacks[3]}/layer4.png)`,
        }}
        className={cn(
          "fixed h-[110vh] w-full bg-repeat-x bg-cover bg-center animate-fade"
        )}
      ></div>
    </div>
  );
};

export default Environment;
