import { cn } from "@/lib/utils";
import React from "react";

interface LogoProps {
  classNameTop?: string;
  classNameBottom?: string;
  classNameContainer?: string;
  disableEntryAnimation?: boolean;
}
const Logo: React.FC<LogoProps> = ({
  disableEntryAnimation,
  classNameTop,
  classNameContainer,
  classNameBottom,
}) => {
  return (
    <div
      className={cn(
        disableEntryAnimation
          ? undefined
          : `animate-fade-down animate-delay-[500ms]`,
        classNameContainer
      )}
    >
      <div className="animate-fade-down animate-delay-[300ms]">
        <div
          className={cn(
            "animate-wiggle animate-duration-2000 animate-infinite bg-[url(/images/logo.png)] h-30 w-90 bg-cover bg-no-repeat bg-top",
            classNameTop
          )}
        />
      </div>
      <div
        className={cn(
          "bg-[url(/images/logo.png)] h-64 w-90 bg-cover bg-bottom",
          classNameBottom
        )}
      />
    </div>
  );
};

export default Logo;
