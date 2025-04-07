"use client";
import type React from "react";
import Image from "next/image";

import { useAuthContext, useSendAndRedirect } from "@/providers/auth/hooks";

import Login from "./components/login";
import PersonalInfoStep from "./components/personalInfo";
import QuestionsStep from "./components/questions";
import { LOGIN_STEP } from "./utils";

const AuthForm = () => {
  const { step } = useAuthContext();
  useSendAndRedirect();

  return (
    <div className="h-full w-full relative overflow-hidden bg-primary bg-opacity-70">
      {step === LOGIN_STEP.START && <Login />}
      <div className="flex flex-col items-center py-5 space-y-2">
        <Image
          alt="Logo"
          width={40}
          height={40}
          src="/images/logo.png"
          className="drop-shadow-md"
        />

        {step === LOGIN_STEP.PERSONAL_INFO && <PersonalInfoStep />}
        {step === LOGIN_STEP.QUESTIONS && <QuestionsStep />}
      </div>
    </div>
  );
};

export default AuthForm;
