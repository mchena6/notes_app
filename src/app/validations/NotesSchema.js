import { z } from "zod";

export const notesSchema = z.object({
  title: z.string().min(1, "El titulo es obligatorio"),
  content: z.string().min(10, "El contenido debe tener al menos 10 caracteres"),
  example: z.string().optional(),
  categoryId: z.string().min(1, "Debe seleccionar una categoría"),
});
