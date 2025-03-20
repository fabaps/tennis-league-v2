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
import { useAuthStore } from "@/store/useAuth";
import { createOrUpdateUser, getUserById, User } from "@/firebase/users";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getCurrentUser } from "@/firebase/auth";

const auth = getAuth();



type Step = "phone" | "personal-info" | "questions" | "result";


const ConditionalCard = ({children, step}: {children: React.ReactNode, step: Step}) => {
  if (step === "phone") {
    return <>{children}</>
  }
  return   <Card className="backdrop-blur-sm bg-white/95 shadow-xl overflow-hidden">{children}</Card>
};


export default function AuthPage() {
  const router = useRouter();
  const { sendOTP, verifyOTP, loading, error, setPhoneNumber, getCurrentUser } =
    useAuthStore();
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

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("502")) {
      return `+${cleaned}`;
    }
    return `+502${cleaned}`;
  };

  const handlePhoneSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formattedPhone = formatPhoneNumber(phone);
      console.log("Enviando OTP a:", formattedPhone);
      setPhoneNumber(formattedPhone);
      await sendOTP(formattedPhone);
      // setStep("verification");
    } catch (error) {
      console.error("Error al enviar OTP:", error);
    }
  };


  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account' // Obliga a mostrar el selector de cuentas
    });
  
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
     
      try {
       
        const user = getCurrentUser();
        if (!user) {
          throw new Error("No se pudo obtener el usuario actual");
        }
  
        const userData = await getUserById(user.uid);
        console.log("Datos del usuario:", userData);
        if (userData && userData.firstName && userData.lastName) {
          setPersonalInfo({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email || "",
            gender: userData.gender || "",
          });
          setRanking(Number(userData.utr) || 0);
          setCategory(userData.category || "");
          setStep("result");
        } else {
          setStep("personal-info");
        }
      } catch (error) {
        console.error("Error al verificar OTP:", error);
      }
  
      console.log("Usuario logueado con Google:", user);
    } catch (error) {
      console.error("Error durante el inicio de sesión con Google:", error);
    }
  };

  const handleVerificationSubmit = async (code: string) => {
    try {
      await verifyOTP(code);
      const user = getCurrentUser();
      if (!user) {
        throw new Error("No se pudo obtener el usuario actual");
      }

      const userData = await getUserById(user.uid);
      if (userData && userData.firstName && userData.lastName) {
        setPersonalInfo({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email || "",
          gender: userData.gender || "",
        });
        setRanking(Number(userData.utr) || 0);
        setCategory(userData.category || "");
        setStep("result");
      } else {
        setStep("personal-info");
      }
    } catch (error) {
      console.error("Error al verificar OTP:", error);
    }
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

  const handleRankingSubmit = async (
    calculatedRanking: number,
    calculatedCategory: string
  ) => {
    setRanking(calculatedRanking);
    setCategory(calculatedCategory);

    const user = getCurrentUser();
    if (!user) {
      console.error("No se pudo obtener el usuario actual");
      alert("Error: No se pudo obtener el usuario actual. Por favor, intenta iniciar sesión nuevamente.");
      router.push("/auth");
      return;
    }

    try {
      await createOrUpdateUser(user.uid, {
        ...personalInfo,
        phone: formatPhoneNumber(phone),
        utr: calculatedRanking.toString(),
        category: calculatedCategory,
        name: `${personalInfo.firstName} ${personalInfo.lastName}`,
      });

      setStep("result");
    } catch (error) {
      console.error("Error al guardar los datos del usuario:", error);
      alert("Error: No se pudieron guardar los datos del usuario. Por favor, intenta nuevamente.");
    }
  };

  useEffect(() => {
    if (step === "result") {
      const timer = setTimeout(() => {
        router.push(`/ranking?ranking=${ranking}&category=${category}`);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [step, ranking, category, router]);

  const getBackgroundClass = () => {
    if (step === "phone") {
      return "bg-black bg-opacity-70";
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
            src="/authvideo.mov"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center p-4 -mt-10">
        <div className="w-full max-w-md">
          <div
            className={`flex justify-center mt-4 ${
              step === "questions" ? "scale-75 " : ""
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
        <ConditionalCard step={step}>
            <CardHeader className="text-center ">
              {step !== "phone" ?
               <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent ">
               {step !== "questions" && "Bienvenido a la GTL"}
             </CardTitle>
              :
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent text-white">
              Bienvenido a la GTL
            </CardTitle>
              }
             
              <CardDescription>
                {step === "phone" && ""}
                {/* {step === "verification" && "Ingresa el código de verificación"} */}
                {step === "personal-info" && "Completa tus datos personales"}
                {/* {step === "questions" && "Cuéntanos sobre tu experiencia en tenis"} */}
                {/* {step === "result" && "¡Tu ranking está listo!"} */}
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
                    <div className="flex justify-center" ><button 
                    onClick={handleGoogleSignIn}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '10px 16px',
                      backgroundColor: '#fff',
                      color: '#000',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f7f7f7'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                  >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" width="18" height="18" />
                    Entrar con Google
                  </button></div>
                  )}
                  {/* {step === "phone" && (
                    <form
                      onSubmit={handlePhoneSubmit}
                      className="space-y-4 px-4"
                    >
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
                          disableDropdown
                          enableSearch={false}
                          countryCodeEditable={false}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Ingresa tu número sin guiones ni espacios
                        </p>
                      </div>
                      {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                      )}
                      <div id="sign-in-button" />
                      <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        disabled={loading}
                      >
                        {loading ? "Enviando..." : "Continuar"}
                      </Button>
                    </form>
                  )} */}
                  {/* {step === "verification" && (
                    <div className="p-4">
                      <VerificationStep
                        onSubmit={handleVerificationSubmit}
                        onResend={() => sendOTP(formatPhoneNumber(phone))}
                        isLoading={loading}
                      />
                    </div>
                  )} */}
                  {step === "personal-info" && (
                    <PersonalInfoStep onSubmit={handlePersonalInfoSubmit} />
                  )}
                  {step === "questions" && (
                    <RankingQuestions onSubmit={handleRankingSubmit} />
                  )}
                  {step === "result" && (
                    <div className="text-center py-8">
                      <div className="mb-4">
                        <div className="text-4xl font-bold text-green-600">
                          {ranking}
                        </div>
                        <div className="text-xl text-gray-600">{category}</div>
                      </div>
                      <p className="text-gray-500">
                        Redirigiendo al ranking en unos segundos...
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </ConditionalCard>
        </div>
      </div>
    </div>
  );
}
