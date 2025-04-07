"use client";
import type React from "react";
import { useAuthContext } from "@/providers/auth/hooks";

import Login from "./components/login";
import { LOGIN_STEP } from "./utils";
import PersonalInfoStep from "./components/personalInfo";
import Image from "next/image";

const AuthForm = () => {
  const { step } = useAuthContext();

  return (
    <div className="h-full w-full relative overflow-hidden bg-primary bg-opacity-70">
      {step === LOGIN_STEP.START && <Login />}
      <div className="flex flex-col items-center py-5 space-y-2">
        <Image src="/images/logo.png" className="drop-shadow-md" width={80} height={80} alt="Logo" />

        {step === LOGIN_STEP.PERSONAL_INFO && <PersonalInfoStep />}
      </div>
    </div>
  );
};

export default AuthForm;
