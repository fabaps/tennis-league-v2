"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import VerificationStep from "./verification-step";
import PersonalInfoStep from "./personal-info-step";
import RankingQuestions from "./ranking-questions";
import { TennisRacketIcon, TennisBallIcon } from "../components/icons";
import { saveNewUser } from "@/services/user";

type Step = "phone" | "verification" | "personal-info" | "questions" | "result";

export default function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<Step>("phone");
  const [ranking, setRanking] = useState(0);
  const [category, setCategory] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });

  const handlePhoneSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep("verification");
  };

  const handleVerificationSubmit = async (code: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep("personal-info");
  };

  const handlePersonalInfoSubmit = (data: {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
  }) => {
    setPersonalInfo(data);
    setStep("questions");
  };

  const handleRankingSubmit = (
    calculatedRanking: number,
    calculatedCategory: string
  ) => {
    setRanking(calculatedRanking);
    setCategory(calculatedCategory);
    saveNewUser({
      ...personalInfo,
      phone,
      ranking: calculatedRanking.toString(),
      category: calculatedCategory,
    });
    setStep("result");
  };

  useEffect(() => {
    if (step === "result") {
      const timer = setTimeout(() => {
        router.push(`/ranking?ranking=${ranking}&category=${category}`);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [step, ranking, category, router]);

  const getBackgroundClass = () => {
    if (step === "phone") {
      return "bg-black bg-opacity-50";
    }
    return "bg-gradient-to-br from-green-400 via-green-500 to-green-600";
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${getBackgroundClass()}`}
    >
      {step === "phone" && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recording%202025-02-11%20212348-kqZhk5R8tu6H9qyXyU7JF21YuXbDtW.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md">
          <div
            className={`mb-8 flex justify-center ${
              step === "questions" ? "scale-75" : ""
            }`}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1cf5f92e-5e26-41b6-815e-3493a942424c_removalai_preview_edited-ffpgDzMtzo9lF0IyY4cT18mb3gCTjj.png"
              alt="GTL Logo"
              width={150}
              height={150}
              className="drop-shadow-xl transition-transform duration-300"
            />
          </div>
          <Card className="backdrop-blur-sm bg-white/95 shadow-xl overflow-hidden">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                {step === "questions"
                  ? "Experiencia en Tenis"
                  : "Bienvenido a la GTL"}
              </CardTitle>
              <CardDescription>
                {step === "phone" && "Ingresa tu número para comenzar"}
                {step === "verification" && "Ingresa el código de verificación"}
                {step === "personal-info" && "Completa tus datos personales"}
                {step === "questions" &&
                  "Cuéntanos sobre tu experiencia en tenis"}
                {step === "result" && "¡Tu ranking está listo!"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === "phone" && (
                    <form onSubmit={handlePhoneSubmit} className="space-y-4">
                      <div>
                        <Label
                          htmlFor="phone"
                          className="text-sm font-medium text-gray-700"
                        >
                          Número de Teléfono
                        </Label>
                        <PhoneInput
                          country={"gt"}
                          value={phone}
                          onChange={setPhone}
                          inputProps={{
                            name: "phone",
                            required: true,
                            autoFocus: true,
                          }}
                          containerClass="mt-1 w-full"
                          inputClass="!w-full !h-[42px] !text-base !pl-[52px] border border-gray-200 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500"
                          buttonClass="!w-[42px] !h-[42px] !border-r-0 !border-gray-200 hover:!bg-gray-50"
                          dropdownClass="!bg-white"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        disabled={isLoading}
                      >
                        {isLoading ? "Enviando..." : "Continuar"}
                      </Button>
                    </form>
                  )}
                  {step === "verification" && (
                    <VerificationStep
                      onSubmit={handleVerificationSubmit}
                      onResend={() => console.log("Reenviando código...")}
                      isLoading={isLoading}
                    />
                  )}
                  {step === "personal-info" && (
                    <PersonalInfoStep onSubmit={handlePersonalInfoSubmit} />
                  )}
                  {step === "questions" && (
                    <RankingQuestions onSubmit={handleRankingSubmit} />
                  )}
                  {step === "result" && (
                    <div className="text-center space-y-8">
                      <div className="bg-green-50 rounded-xl p-6 shadow-inner">
                        <p className="text-5xl font-bold text-green-600 mb-2">
                          {ranking.toFixed(2)}
                        </p>
                        <p className="text-lg text-green-700 font-medium">
                          puntos
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-6 shadow-inner">
                        <p className="text-3xl font-bold text-green-700 mb-2">
                          Categoría
                        </p>
                        <p className="text-4xl font-extrabold text-green-600">
                          {category}
                        </p>
                      </div>
                      <div className="flex justify-center items-center space-x-6 pt-4">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{
                              y: [0, -12, 0],
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.2,
                            }}
                          >
                            {i % 2 === 0 ? (
                              <TennisRacketIcon className="w-16 h-16 text-green-600" />
                            ) : (
                              <TennisBallIcon className="w-12 h-12 text-green-600" />
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
