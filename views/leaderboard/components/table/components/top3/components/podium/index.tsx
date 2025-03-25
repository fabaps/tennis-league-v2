import { formatCurrency, trimWallet } from "@/lib/utils";
import ROUTES from "@/routes";
import { Rank } from "@/types/rank";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface PodiumProps {
  data?: Rank[] | null;
}
const Podium: React.FC<PodiumProps> = ({ data }) => {
  const navigation = useRouter();

  const goToProfile = (wallet?: string) => () =>
    navigation.push(`${ROUTES.PROFILE}/${wallet}`);

  const top1 = data?.[0];
  const top2 = data?.[1];
  const top3 = data?.[2];

  return (
    <div className="flex flex-col items-center animate-fade-up animate-delay-[200ms] bg-[url(/images/podium.png)] w-[400px] sm:w-[500px] h-[300px] bg-contain bg-center bg-no-repeat mt-25">
      <div
        className="absolute bottom-30 left-6 sm:left-12 flex flex-col items-center justify-center gap-7 sm:gap-10 cursor-pointer"
        onClick={goToProfile(top1?.wallet_address)}
      >
        <div className="flex flex-col items-center justify-center gap-2 animate-fade-down hover:translate-y-[-10px] transition-transform animate-delay-[1300ms]">
          <div className="border-2 w-[100px] h-[100px] bg-black/40 overflow-hidden rounded-full flex flex-col items-center justify-center">
            <Image
              src="/images/avatar/avatar1.png"
              width={200}
              height={200}
              alt="2td"
            />
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-[var(--primary)] text-xs">
              {trimWallet(top1?.wallet_address)}
            </p>
            <p className="whitespace-nowrap text-sm text-white">
              {formatCurrency(top1?.total_realized_gains)}
            </p>
          </div>
        </div>

        <p className="pointer-events-none text-[#ddd] text-3xl [text-shadow:_0_2px_4px_rgba(0,0,0,.4)]">
          2
        </p>
      </div>

      <div
        className="absolute w-[100px] sm:top-[-85px] top-[-65px] left-38 sm:left-50 flex flex-col items-center justify-center gap-12 cursor-pointer"
        onClick={goToProfile(top1?.wallet_address)}
      >
        <div className="flex flex-col items-center justify-center gap-2 animate-fade-down hover:translate-y-[-10px] transition-transform animate-delay-[1600ms]">
          <div className="border-2 w-[100px] h-[100px] bg-black/40 overflow-hidden rounded-full flex flex-col items-center justify-center">
            <Image
              src="/images/avatar/avatar4.png"
              width={200}
              height={200}
              alt="1st"
            />
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-[var(--primary)] text-xs">
              {trimWallet(top2?.wallet_address)}
            </p>
            <p className="whitespace-nowrap text-sm text-white">
              {formatCurrency(top2?.total_realized_gains)}
            </p>
          </div>
        </div>

        <p className="pointer-events-none text-[#ddd] text-5xl [text-shadow:_0_2px_4px_rgba(0,0,0,.4)]">
          1
        </p>
      </div>

      <div
        className="absolute bottom-30 right-6 sm:right-12 flex flex-col items-center justify-center gap-7 sm:gap-10 cursor-pointer"
        onClick={goToProfile(top1?.wallet_address)}
      >
        <div className="flex flex-col items-center justify-center gap-2 animate-fade-down hover:translate-y-[-10px] transition-transform animate-delay-[1000ms]">
          <div className="border-2 w-[100px] h-[100px] bg-black/40 overflow-hidden rounded-full flex flex-col items-center justify-center">
            <Image
              src="/images/avatar/avatar2.png"
              width={200}
              height={200}
              alt="3td"
            />
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-[var(--primary)] text-xs">
              {trimWallet(top3?.wallet_address)}
            </p>
            <p className="whitespace-nowrap text-sm text-white">
              {" "}
              {formatCurrency(top3?.total_realized_gains)}
            </p>
          </div>
        </div>

        <p className="pointer-events-none text-[#ddd] text-3xl [text-shadow:_0_2px_4px_rgba(0,0,0,.4)]">
          3
        </p>
      </div>

      <h1 className="text-xl text-[#ddd] animate-fade-up animate-delay-[300ms] [text-shadow:_0_2px_4px_rgba(0,0,0,.9)] absolute pointer-events-none bottom-0">
        LEADERBOARD
      </h1>
    </div>
  );
};

export default Podium;
