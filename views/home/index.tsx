"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import Logo from "@/components/logo";
import Background from "@/components/ui/background";
import { Button } from "@/components/ui/button";
import { PRESS_ANY_KEY_TO_START, SOUNDS } from "@/config";
import { play8BitSound } from "@/sounds";
import View from "@/components/layout/view";
import ROUTES from "@/routes";

const HomeView: React.FC = () => {
  const router = useRouter();

  const handleContinue = useCallback(() => {
    if (SOUNDS) {
      play8BitSound();
    }

    router.push(ROUTES.LEADERBOARD);
  }, [router]);

  useEffect(() => {
    if (PRESS_ANY_KEY_TO_START)
      window.addEventListener("keydown", handleContinue);

    return () => {
      window.removeEventListener("keydown", handleContinue);
    };
  }, [handleContinue]);

  return (
    <>
      <Background bDir="t" />

      <View>
        <Logo />

        <div className="animate-fade-up animate-delay-[1000ms]">
          <Button
            className="w-75 animate-pulse animate-infinite"
            onClick={handleContinue}
            variant="outline"
          >
            PRESS ANY KEY TO CONTINUE
          </Button>
        </div>
      </View>
    </>
  );
};

export default HomeView;
