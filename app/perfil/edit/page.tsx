"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { useAuthStore } from "@/store/useAuth";
import { createOrUpdateUser } from "@/firebase/users";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types/user";

// Datos de ejemplo (en una aplicación real, estos datos vendrían de una API o base de datos)
const userData = {
  name: "Juan",
  lastName: "Pérez",
  email: "juan.perez@example.com",
  phone: "+50212345678",
  gender: "Masculino",
  photo:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-11%2020.14.39%20-%20An%20eleventh%20retro-style%20minimalist%20avatar%20of%20a%20male%20tennis%20player%20on%20a%20white%20background,%20designed%20in%20the%20style%20of%20an%20old-school%20video%20game%20character.%20-oJWiw24SazV4nI40VBn9FGsHL4XYPr.webp",
};

export default function EditProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { currentUser, fetchCurrentUserData } = useAuthStore((state) => state);

  const [formData, setFormData] = useState<User | null>(currentUser);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.id || !formData) return;

    setIsLoading(true);
    try {
      const success = await createOrUpdateUser(currentUser.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
      });

      if (success) {
        // Actualizar el store con los nuevos datos
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

  const handlePhotoChange = () => {
    // Aquí iría la lógica para cambiar la foto
    // Por ahora, solo mostraremos un mensaje en la consola
    console.log("Cambiar foto");
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
                      src={formData?.photo || "/placeholder.svg"}
                      alt={formData?.name || ""}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handlePhotoChange}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Cambiar Foto
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
