"use client";

import type React from "react";
import "react-phone-number-input/style.css";

import { Mail, UserIcon, UserPlus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { z } from "zod";

import formSchema from "@/app/auth/components/form/components/personalInfo/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputWithIcon } from "@/components/ui/input";

interface EditProfileFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}
const EditProfileForm: React.FC<EditProfileFormProps> = ({ form }) => {
  return (
    <div className="space-y-7 w-full">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem className="w-full animate-fade-left">
            <FormLabel className="text-gray-500">Primer nombre</FormLabel>
            <FormControl>
              <InputWithIcon
                icon={<UserIcon className="text-gray-400" />}
                placeholder="Nombre"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem className="w-full animate-fade-left animate-delay-100">
            <FormLabel className="text-gray-500">Primer apellido</FormLabel>
            <FormControl>
              <InputWithIcon
                icon={<UserPlus className="text-gray-400" />}
                placeholder="Apellido"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="w-full animate-fade-left animate-delay-200">
            <FormLabel className="text-gray-500">Correo electrónico</FormLabel>
            <FormControl>
              <InputWithIcon
                icon={<Mail className="text-gray-400" />}
                placeholder="usuario@gmail.com"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem className="w-full animate-fade-left animate-delay-300">
            <FormLabel className="text-gray-500">Número de teléfono</FormLabel>
            <FormControl>
              <PhoneInput
                defaultCountry="GT"
                placeholder="12345678"
                {...field}
                inputComponent={Input}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EditProfileForm;
