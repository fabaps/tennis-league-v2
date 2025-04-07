import { createContext, useState } from "react";

import { LOGIN_STEP } from "@/app/auth/components/form/utils";

import useAuthChange from "./hooks";

export interface AuthContextType {
  step: LOGIN_STEP;
  ranking: number;
  category: string;
  setStep: React.Dispatch<React.SetStateAction<LOGIN_STEP>>;
  setRanking: React.Dispatch<React.SetStateAction<number>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType>({
  step: LOGIN_STEP.START,
  ranking: 0,
  category: "",
  setStep: () => {},
  setRanking: () => {},
  setCategory: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [category, setCategory] = useState<string>("");
  const [ranking, setRanking] = useState<number>(0);
  const [step, setStep] = useState<LOGIN_STEP>(LOGIN_STEP.START);

  useAuthChange({ setStep });

  return (
    <AuthContext.Provider
      value={{
        step,
        ranking,
        category,
        setStep,
        setRanking,
        setCategory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
