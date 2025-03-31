"use client";

import View from "@/components/layout/view";
import Logo from "@/components/logo";
import Background from "@/components/ui/background";
import ProfileCard from "./components/profileCard";
import Table from "./components/table";

const LeaderboardView: React.FC = () => {
  return (
    <>
      <Background bDir="t" extraShadow />

      <View>
        <div className="mt-5 sm:mt-[0]">
          <Logo
            disableEntryAnimation
            classNameContainer="animate-fade-down animate-delay-[0]"
            classNameTop="w-70 h-24"
            classNameBottom="w-70 h-50"
          />
        </div>

        <ProfileCard />

        <Table />
      </View>
    </>
  );
};

export default LeaderboardView;
