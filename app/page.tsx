"use client";

import type React from "react";

import Hero from "@/components/hero";
import Reels from "@/components/reels";
import { scrollToReel } from "@/components/reels/utils";

const Home = () => {
  return (
    <div data-id="home" className="bg-black text-white">
      <div
        data-id="snap-container"
        style={{ height: "calc(100dvh - calc(var(--spacing) * 28))" }}
        className="snap-y snap-mandatory overflow-y-scroll scrollbar-hide"
      >
        <Hero scrollToReel={scrollToReel} />
        <Reels scrollToReel={scrollToReel} />
      </div>
    </div>
  );
};

export default Home;
