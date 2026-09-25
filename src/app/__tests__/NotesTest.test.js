import { describe, it, expect } from "vitest";
import { notesSchema } from "../validations/NotesSchema";

describe("Notes Schema tests", () => {
  it("Debe fallar si el titulo esta vacio", () => {
    const invalidData = {
      title: "",
      content: "Contenido valido con mas de 10 caracteres",
      categoryId: "1",
    };

    const result = notesSchema.safeParse(invalidData);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe("El titulo es obligatorio");
    }
  });

  it("Debe fallar si el titulo no supera los 10 caracteres", () => {
    const invalidData = {
      title: "Titulo valido",
      content: "A".repeat(9),
      categoryId: "1",
    };

    const result = notesSchema.safeParse(invalidData);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "El contenido debe tener al menos 10 caracteres",
      );
    }
  });

  it("Debe fallar si la categoria esta vacia", () => {
    const invalidData = {
      title: "Titulo valido",
      content: "Contenido valido con mas de 10 caracteres",
      categoryId: "",
    };

    const result = notesSchema.safeParse(invalidData);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Debe seleccionar una categoría",
      );
    }
  });
});
