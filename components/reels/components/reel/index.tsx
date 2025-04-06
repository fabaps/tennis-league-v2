import React from "react";
import { FeatureReel } from "../../types";
import { ChevronDown } from "lucide-react";

interface ReelProps {
  reel: FeatureReel;
  index: number;
  scrollToReel: (index: number) => () => void;
}
const Reel: React.FC<ReelProps> = ({ reel, index, scrollToReel }) => {
  return (
    <div
      key={index}
      data-id={`reel-container-${index}"`}
      className="h-full w-full snap-start relative overflow-hidden"
    >
      <div
        data-id={`reel-image-${index}`}
        className="absolute inset-0 bg-cover bg-top"
        style={{
          backgroundImage: `url(${reel.image})`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/70 to-transparent" />

      <div className="h-full w-full flex flex-col items-center justify-center relative px-5">
        <div className="absolute top-0 left-0 flex flex-row items-center justify-between w-full px-5 py-5">
          <div className="bg-green-600 w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-lg">
            {reel.icon}
          </div>
          <span className="bg-yellow-500 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
            {reel.badge}
          </span>
        </div>

        <div className="flex flex-col justify-center w-full">
          <div className="w-full flex flex-col space-y-8">
            <div className="w-full flex flex-col space-y-1">
              <h2 className="text-3xl font-bold">{reel.title}</h2>

              {reel.description && (
                <p className="text-white/90 text-base leading-relaxed max-w-75">
                  {reel.description}
                </p>
              )}
            </div>

            {reel.showArrow && (
              <button
                aria-label="Ver más"
                onClick={scrollToReel(reel.index)}
                className="animate-bounce inline-block"
              >
                <ChevronDown className="w-7 h-7 text-white opacity-80" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reel;
