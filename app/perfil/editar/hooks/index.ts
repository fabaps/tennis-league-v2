"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import formSchema from "@/app/auth/components/form/components/personalInfo/utils";
import { createOrUpdateUser, uploadUserPicture } from "@/firebase/users";
import { useAuthStore } from "@/store/auth";

interface UseFormSubmitProps {
  selectedPhoto?: File | null;
}
const useFormSubmit = ({ selectedPhoto }: UseFormSubmitProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, fetchCurrentUserData } = useAuthStore();
  const router = useRouter();

  const handler = async (values: z.infer<typeof formSchema>) => {
    if (!currentUser?.id || !values) return;

    setIsLoading(true);

    try {
      let photoUrl = values.picture;
      if (selectedPhoto) {
        photoUrl = await uploadUserPicture(currentUser.id, selectedPhoto);
      }

      const success = await createOrUpdateUser(currentUser.id, {
        name: `${values.firstName} ${values.lastName}`,
        picture: photoUrl?.toString(),
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
      });

      if (success) {
        await fetchCurrentUserData();
        toast.success("Los cambios se han guardado correctamente");
        router.push("/perfil");
      } else {
        throw new Error("No se pudo actualizar el perfil");
      }
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      toast.error(
        "No se pudo actualizar el perfil. Por favor intenta de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handler,
    isLoading,
  };
};

export default useFormSubmit;
