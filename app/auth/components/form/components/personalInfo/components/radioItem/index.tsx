import React from "react";

import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radioGroup";
import clsx from "clsx";

interface RadioItemProps {
  isActive?: boolean;
  label?: string;
  icon?: React.ReactNode;
}
const RadioItem: React.FC<RadioItemProps> = ({ isActive, label, icon }) => {
  return (
    <>
      <RadioGroupItem
        id={`gender-${label?.toLowerCase()}`}
        value={label?.toLowerCase() || ""}
        className="hidden"
      />

      <Label
        htmlFor={`gender-${label?.toLowerCase()}`}
        className="cursor-pointer text-center w-full"
      >
        <div
          className={clsx(
            "w-full flex flex-col items-center justify-center p-6 rounded-lg border-2 cursor-pointer transition-colors duration-200",
            isActive
              ? "border-green-500"
              : "border-input hover:border-gray-400",
            isActive ? "bg-green-50" : "bg-white",
            isActive ? "shadow-md" : "shadow-xs",
            isActive ? "text-green-500" : "text-gray-600"
          )}
        >
          {icon}
          <p className="text-[1rem] mt-2">{label}</p>
        </div>
      </Label>
    </>
  );
};

export default RadioItem;
