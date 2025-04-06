"use client";

import Image from "next/image";
import React from "react";

import { Spinner } from "@/components/ui/spinner";

const GTLLoader: React.FC = () => {
  return (
    <div
      data-id="loade"
      className="fixed inset-0 bg-background flex flex-col items-center justify-center min-h-screen animate-fade"
    >
      <div data-id="loader-content" className="flex flex-col items-center space-y-5">
        <div data-id="loader-logo">
          <Image
            src="/images/logo.png"
            alt="GTL Logo"
            width={100}
            height={100}
          />
        </div>

        <Spinner size="medium" className="text-white" show />
      </div>
    </div>
  );
};

export default GTLLoader;
