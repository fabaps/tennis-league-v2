import React, { useEffect, useState } from "react";

import { MOTION_BACKGROUND } from "@/config";

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

  if (randomBacks.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 z-1 min-h-screen w-full">
      <div
        style={{
          animation: !MOTION_BACKGROUND
            ? ""
            : "scale 180s ease-out alternate infinite",
          backgroundImage: `url(/images/${randomBacks[0]}/layer1.png)`,
        }}
        className={`fixed h-full w-full bg-repeat-x bg-cover bg-center animate-fade animate-delay-[600ms]`}
      ></div>
      <div
        style={{
          animation: !MOTION_BACKGROUND
            ? ""
            : "scale 150s ease-out alternate infinite",
          backgroundImage: `url(/images/${randomBacks[1]}/layer2.png)`,
        }}
        className={`fixed h-full w-full bg-repeat-x bg-cover bg-center animate-fade animate-delay-[400ms]`}
      ></div>
      <div
        style={{
          animation: !MOTION_BACKGROUND
            ? ""
            : "scale 90s ease-out alternate infinite",
          backgroundImage: `url(/images/${randomBacks[2]}/layer3.png)`,
        }}
        className={`fixed h-full w-full bg-repeat-x bg-cover bg-center animate-fade animate-delay-[200ms]`}
      ></div>
      <div
        style={{
          animation: !MOTION_BACKGROUND
            ? ""
            : "scale 50s ease-out alternate infinite",
          backgroundImage: `url(/images/${randomBacks[3]}/layer4.png)`,
        }}
        className={`fixed h-full w-full bg-repeat-x bg-cover bg-center animate-fade`}
      ></div>
    </div>
  );
};

export default Environment;
