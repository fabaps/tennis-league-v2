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
import { Camera } from "lucide-react";
import { useAuthStore } from "@/store/useAuth";
import { createOrUpdateUser, uploadUserPhoto } from "@/firebase/users";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types/user";

export default function EditProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { currentUser, fetchCurrentUserData } = useAuthStore((state) => state);

  const [formData, setFormData] = useState<User | null>(currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);

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
            <CardHeader className="bg-green-500 text-white py-4">
              <CardTitle className="text-2xl font-bold text-center">
                Editar Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={photoPreviewUrl || formData?.photo || "/placeholder.svg"}
                      alt={formData?.name || ""}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoSelect}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Seleccionar Foto
                  </Button>
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

                <div className="space-y-2">
                  <Label htmlFor="phone">Número de Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData?.phone || ""}
                    disabled
                    className="bg-gray-100"
                  />
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
