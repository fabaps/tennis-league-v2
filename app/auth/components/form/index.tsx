"use client";
import type React from "react";
import { useAuthContext } from "@/providers/auth/hooks";

import Login from "./components/login";
import { LOGIN_STEP } from "./utils";
import PersonalInfoStep from "./components/personalInfo";

const AuthForm = () => {
  const { step } = useAuthContext();

  return (
    <div className="h-full w-full relative overflow-hidden bg-black bg-opacity-70">
      {step === LOGIN_STEP.START && <Login />}
      {step === LOGIN_STEP.PERSONAL_INFO && <PersonalInfoStep />}
    </div>
  );
};

export default AuthForm;
