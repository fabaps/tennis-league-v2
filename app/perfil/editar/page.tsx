"use client";

import type React from "react";

import useUserDefaultData from "@/app/auth/components/form/components/personalInfo/hooks";
import View from "@/components/layout/view";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuthStore } from "@/store/auth";

import EditProfileForm from "./components/form";
import useFormSubmit from "./hooks";
import { Save } from "lucide-react";

const EditProfilePage = () => {
  const { form } = useUserDefaultData();
  const { currentUser } = useAuthStore();

  const firstNameLetter = currentUser?.firstName?.substring(0, 1);
  const lastNameLetter = currentUser?.lastName?.substring(0, 1);
  const avatarFallback = `${firstNameLetter ?? ""}${
    lastNameLetter ?? ""
  }`.toUpperCase();

  const { handler: handleSubmit, isLoading } = useFormSubmit({
    selectedPhoto: null,
  });

  return (
    <View className="bg-gray-50">
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-sm overflow-scroll">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-7 w-full"
              >
                <div
                  data-id="profile-header"
                  className="bg-gradient-to-r from-green-500 to-green-400 pt-8 pb-12 px-6 relative mb-19"
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 bottom-0">
                    <div className="p-1 bg-input rounded-full">
                      <Avatar className="size-25 animate-fade-down">
                        <AvatarImage
                          src={
                            currentUser?.picture ??
                            "/images/avatars/avatar_2.webp"
                          }
                          alt={`picture_${currentUser?.name}`}
                          className="object-cover"
                        />

                        <AvatarFallback>
                          <p className="text-primary text-3xl font-bold">
                            {avatarFallback ?? ""}
                          </p>
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>

                <div className="pb-6 px-6 space-y-7">
                  <EditProfileForm form={form} />

                  <Button
                    type="submit"
                    variant="green"
                    disabled={isLoading}
                    className="w-full animate-fade-up animate-delay-300"
                  >
                    <Save />
                    {isLoading ? "Guardando..." : "Guardar cambios"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </View>
  );
};

export default EditProfilePage;
