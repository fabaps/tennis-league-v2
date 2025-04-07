import { createContext, useState } from "react";

import { LOGIN_STEP } from "@/app/auth/components/form/utils";

import useAuthChange from "./hooks";
import { User } from "@/types/user";

export interface AuthContextType {
  step: LOGIN_STEP;
  ranking: number;
  category: string;
  personalInfo: Partial<User>;
  setStep: React.Dispatch<React.SetStateAction<LOGIN_STEP>>;
  setRanking: React.Dispatch<React.SetStateAction<number>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setPersonalInfo: React.Dispatch<React.SetStateAction<Partial<User>>>;
}

export const AuthContext = createContext<AuthContextType>({
  step: LOGIN_STEP.START,
  ranking: 0,
  category: "",
  personalInfo: {},
  setStep: () => {},
  setRanking: () => {},
  setPersonalInfo: () => {},
  setCategory: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [category, setCategory] = useState<string>("");
  const [ranking, setRanking] = useState<number>(0);
  const [step, setStep] = useState<LOGIN_STEP>(LOGIN_STEP.START);
  const [personalInfo, setPersonalInfo] = useState<Partial<User>>({});

  useAuthChange({ setStep });

  return (
    <AuthContext.Provider
      value={{
        step,
        ranking,
        personalInfo,
        category,
        setStep,
        setRanking,
        setPersonalInfo,
        setCategory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
