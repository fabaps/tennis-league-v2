import clsx from "clsx";
import React from "react";

import { Card } from "@/components/ui/card";

interface ProfileStatItemProps {
  label: string;
  icon: React.ReactNode;
  value: number | string;
  className?: string;
}
const ProfileStatItem: React.FC<ProfileStatItemProps> = ({
  label,
  icon,
  value,
  className,
}) => {
  return (
    <Card
      className={clsx(
        "justify-center animate-fade-down items-center space-y-2",
        className
      )}
    >
      <div className="flex flex-col items-center space-y-1">
        {icon}

        <p className="text-md text-gray-500">{label}</p>
      </div>

      <h2 className="font-bold text-2xl text-primary leading-none">{value}</h2>
    </Card>
  );
};

export default ProfileStatItem;
