"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const GTLLoader: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <div className="mb-8">
          <Image
            src="/images/logo.png"
            alt="GTL Logo"
            width={200}
            height={200}
          />
        </div>

        <div className="relative w-12 h-12 mb-6">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-white/20 border-t-white"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        <motion.p
          className="text-white text-lg font-medium"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          Cargando...
        </motion.p>
      </div>
    </div>
  );
};

export default GTLLoader;
