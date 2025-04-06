"use client";

import type React from "react";

import Hero from "@/components/hero";
import Reels from "@/components/reels";
import { scrollToReel } from "@/components/reels/utils";

const Home = () => {
  return (
    <div
      data-id="home-container"
      className="h-full w-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide"
    >
      <Hero scrollToReel={scrollToReel} />
      <Reels scrollToReel={scrollToReel} />
    </div>
  );
};

export default Home;
