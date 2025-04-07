import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Button } from "../ui/button";

interface HeroProps {
  scrollToReel: (reelIndex: number) => () => void;
}
const Hero: React.FC<HeroProps> = ({ scrollToReel }) => {
  return (
    <div
      data-id="hero"
      className="h-full w-full snap-start relative overflow-hidden"
    >
      <div
        data-id="hero-image"
        className="absolute inset-0 bg-cover bg-top z-1"
        style={{
          backgroundImage: "url(/images/hero.png)",
        }}
      />

      <div
        data-id="hero-shadow"
        className="absolute inset-0 bg-gradient-to-t from-transparent via-black/70 to-transparent z-2"
      />

      <div
        data-id="hero-content"
        className="h-full w-full flex items-center relative z-3"
      >
        <div
          data-id="hero-body"
          className="flex w-full flex-col items-center justify-center space-y-8"
        >
          <div
            data-id="hero-image"
            className="flex justify-center animate-fade-right"
          >
            <Image
              src="/images/logo.png"
              alt="GTL Logo"
              width={120}
              height={120}
              className="drop-shadow-md"
            />
          </div>

          <div
            data-id="hero-text"
            className="flex flex-col items-center animate-fade animate-delay-200"
          >
            <p className="text-lg font-regular text-white/80">
              Descubre lo que se viene en
            </p>

            <h1 className="text-2xl max-w-80 text-center font-bold text-white">
              Guatemala Tennis League (GTL)
            </h1>
          </div>

          <Button
            onClick={scrollToReel(1)}
            className="animate-bounce animate-duration-800 inline-block w-10 h-10 hover:bg-transparent"
            aria-label="Ver más"
            variant="ghost"
          >
            <ChevronDown className="text-white/80 size-5 ml-[-2px]" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
