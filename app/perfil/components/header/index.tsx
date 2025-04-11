"use client";

import { BadgeCheck, Edit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ROUTES from "@/routes";
import { useAuthStore } from "@/store/auth";
import { RebelAvatar } from "@/components/rebelUI/RebelAvatar";

const ProfileHeader: React.FC = () => {
  const { currentUser } = useAuthStore();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div
        data-id="profile-header"
        className="bg-gradient-to-r from-green-500 to-green-400  pt-8 pb-12 px-6 relative"
      >
        <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 bottom-0">
          <div className="p-1 bg-input rounded-full">
          <RebelAvatar
            user={currentUser}
            size="xl"
          />
          </div>
        </div>
      </div>

      <div className="pt-16 pb-6 px-6">
        <div className="flex flex-col space-y-4 animate-fade-up">
          <div className="items-center flex flex-col space-y-4">
            {(currentUser?.name?.length ?? 0) > 0 ? (
              <div className="flex flex-col space-y-1 items-center">
                <div className="flex flex-row items-center space-x-2">
                  <h1 className="text-2xl font-bold text-primary">
                    {currentUser?.name}
                  </h1>

                  <BadgeCheck className="size-4 text-green-600" />
                </div>

                <p className="text-sm text-gray-500">{currentUser?.email}</p>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Skeleton className="w-[150px] h-[20px] rounded-full" />
                <Skeleton className="w-[150px] h-[10px] rounded-full" />
              </div>
            )}

            {(currentUser?.category?.length ?? 0) > 0 ? (
              <div className="flex flex-col">
                <p className="text-md text-gray-500">
                  {`Categoría ${currentUser?.category}`}
                </p>
              </div>
            ) : (
              <Skeleton className="w-[100px] h-[15px] rounded-full mt-3 mb-2" />
            )}
          </div>

          <Link href={ROUTES["EDITAR_PERFIL"].path} className="w-full">
            <Button variant="green" className="w-full">
              <Edit />
              Editar perfil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
