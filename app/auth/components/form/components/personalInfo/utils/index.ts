"use client";

import { z } from "zod";

const formSchema = z.object({
  firstName: z
    .string({ required_error: "El nombre es obligatorio" })
    .min(2, "El nombre debe tener al menos 2 letras")
    .max(50, "El nombre no puede tener más de 50 letras"),

  lastName: z
    .string({ required_error: "El apellido es obligatorio" })
    .min(2, "El apellido debe tener al menos 2 letras")
    .max(50, "El apellido no puede tener más de 50 letras"),

  gender: z.string({
    required_error: "El género es obligatorio",
  }),

  email: z
    .string({ required_error: "El correo es obligatorio" })
    .email("El correo no es válido"),
});

export default formSchema;
