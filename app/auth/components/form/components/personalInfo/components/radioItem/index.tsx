import React from "react";

import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radioGroup";

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
          className={`w-full flex flex-col items-center justify-center p-6 rounded-md border-2 cursor-pointer transition-colors duration-200 ${
            isActive
              ? "border-primary"
              : "border-input hover:border-gray-300"
          }`}
        >
          {icon}
          <span className="block text-lg font-medium mt-2">{label}</span>
        </div>
      </Label>
    </>
  );
};

export default RadioItem;
