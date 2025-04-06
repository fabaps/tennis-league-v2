import React from "react";

import Reel from "./components/reel";
import featureReels from "./utils";

interface ReelsProps {
  scrollToReel: (index: number) => () => void;
}
const Reels: React.FC<ReelsProps> = ({ scrollToReel }) => {
  return (
    <>
      {featureReels.map((reel, index) => (
        <Reel
          reel={reel}
          index={index}
          scrollToReel={scrollToReel}
          key={`reel-${index}`}
        />
      ))}
    </>
  );
};

export default Reels;
