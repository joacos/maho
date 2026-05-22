import { z } from "zod";

export const clientDataSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(100, "El nombre no puede exceder los 100 caracteres."),
  email: z
    .string()
    .email("Por favor ingresa un correo electrónico válido."),
  phone: z
    .string()
    .min(9, "El teléfono de contacto debe tener al menos 9 dígitos.")
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "Ingresa un número telefónico válido (ej: +56912345678)."
    ),
  patientName: z
    .string()
    .max(100, "El nombre del paciente no puede exceder los 100 caracteres.")
    .optional()
    .or(z.literal("")),
  patientAge: z
    .preprocess(
      (val) => (val === "" || val === undefined ? undefined : Number(val)),
      z
        .number()
        .min(1, "La edad mínima es 1 año.")
        .max(120, "La edad máxima es 120 años.")
        .optional()
    )
    .optional(),
  notes: z
    .string()
    .max(500, "Las notas no pueden exceder los 500 caracteres.")
    .optional()
    .or(z.literal("")),
});

export type ClientDataInput = z.infer<typeof clientDataSchema>;
