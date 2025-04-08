"use client";

import View from "@/components/layout/view";

import ProfileHeader from "./components/header";
import Stats from "./components/stats";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import ROUTES from "@/routes";
import { useRouter } from "next/navigation";

const PerfilPage: React.FC = () => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const logoutAndGoToAuth = () => {
    logout();
    router.push(ROUTES["AUTH"].path);
  };

  return (
    <View className="bg-gray-50 flex flex-col justify-between">
      <div className="w-full">
        <ProfileHeader />
        <Stats />
      </div>

      <Button variant="outline" className="animate-fade-up" onClick={logoutAndGoToAuth}>
        <LogOut />
        Cerrar sesión
      </Button>
    </View>
  );
};

export default PerfilPage;
