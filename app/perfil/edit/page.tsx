"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuth";
import { createOrUpdateUser, uploadUserPhoto } from "@/firebase/users";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types/user";
import { UserAvatar } from "@/components/ui/user-avatar";
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css";

export default function EditProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { currentUser, fetchCurrentUserData } = useAuthStore((state) => state);

  const [formData, setFormData] = useState<User | null>(currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      setFormData(currentUser);
    } else {
      fetchCurrentUserData();
    }
  }, [currentUser, fetchCurrentUserData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      if (!prevState) return null;
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Crear URL temporal para la vista previa
    const previewUrl = URL.createObjectURL(file);
    setPhotoPreviewUrl(previewUrl);
    setSelectedPhoto(file);

    // Limpiar la URL temporal cuando el componente se desmonte
    return () => URL.revokeObjectURL(previewUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.id || !formData) return;

    setIsLoading(true);
    try {
      // Si hay una foto seleccionada, subirla primero
      let photoUrl = formData.photo;
      if (selectedPhoto) {
        photoUrl = await uploadUserPhoto(currentUser.id, selectedPhoto);
      }

      const success = await createOrUpdateUser(currentUser.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        photo: photoUrl, // Incluir la URL de la foto (nueva o existente)
      });

      if (success) {
        await fetchCurrentUserData();
        toast({
          title: "Perfil actualizado",
          description: "Los cambios se han guardado correctamente",
        });
        router.push("/perfil");
      } else {
        throw new Error("No se pudo actualizar el perfil");
      }
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Editar Perfil" />
      <main className="flex-grow py-16 px-4">
        <div className="max-w-md mx-auto">
          <Card className="bg-white shadow-md rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative flex items-center justify-center">
                  {photoPreviewUrl || formData?.photo ? ( <Image
                      src={photoPreviewUrl || formData?.photo || "/placeholder.svg"}
                      alt={formData?.name || ""}
                      width={128}
                      height={128}
                      className="w-32 h-32 rounded-full object-cover"
                  />) : (<UserAvatar
                    name={formData?.name || ""}
                    photo={""}
                    size={120}
                    className="ring-4 ring-white"
                  />)}
                   
                  <button
                    type="button"
                    className="absolute -bottom-4 right-10 mb-2 mr-2 h-10 w-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition duration-300 ease-in-out"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-camera"
                    >
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoSelect}
                    className="hidden"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData?.firstName || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData?.lastName || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData?.email || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Número de Teléfono
                  </Label>
                  <PhoneInput
                    country={'gt'}
                    value={formData?.phone || ''}
                    onChange={(phone) => setFormData((prevState) => {
                      if (!prevState) return null;
                      return {
                        ...prevState,
                        phone: phone,
                      };
                    })}
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
                  {/* <p className="text-sm text-gray-500 mt-1">
                    Ingresa tu número sin guiones ni espacios
                  </p> */}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Género</Label>
                  <Input
                    id="gender"
                    name="gender"
                    value={formData?.gender || ""}
                    disabled
                    className="bg-gray-100"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
