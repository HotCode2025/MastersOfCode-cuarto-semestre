import { z } from "zod";

export const createTareaSchema = z.object({
  titulo: z
    .string({
      required_error: "El título es requerido",
      invalid_type_error: "El título debe ser una cadena de texto",
    })
    .min(1, {
      message: "El título debe tener al menos 1 carácter",
      invalid_type_error: "El título debe ser una cadena de texto",
    })
    .max(255, { message: "El título debe tener máximo 255 carácteres" }),
  descripcion: z
    .string({
      required_error: "La descripción es requerida",
      invalid_type_error: "La descripción debe ser una cadena de texto",
    })
    .min(0, { message: "La descripción debe tener al menos 1 carácter" })
    .max(255, { message: "La descripción debe tener máximo 255 carácteres" })
    .optional(),
});

export const updateTareaSchema = z.object({
  titulo: z
    .string({
      required_error: "El título es requerido",
      invalid_type_error: "El título debe ser una cadena de texto",
    })
    .min(1, {
      message: "El título debe tener al menos 1 carácter",
      invalid_type_error: "El título debe ser una cadena de texto",
    })
    .max(255, { message: "El título debe tener máximo 255 carácteres" })
    .optional(),
  descripcion: z
    .string({
      required_error: "La descripción es requerida",
      invalid_type_error: "La descripción debe ser una cadena de texto",
    })
    .min(0, { message: "La descripción debe tener al menos 1 carácter" })
    .max(255, { message: "La descripción debe tener máximo 255 carácteres" })
    .optional(),
});