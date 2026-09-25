import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import CreateNotePage from "../notes/create/page";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockAddNote = vi.fn();
const mockGetDynamicCategories = vi.fn().mockReturnValue([
  { id: "cat_1", title: "Categoria 1" },
  { id: "cat_2", title: "Categoria 2" },
  { id: "cat_3", title: "Categoria 3" },
]);

vi.mock("../context/NotesContext", () => ({
  useNotes: () => ({
    addNote: mockAddNote,
    GetDynamicCategories: mockGetDynamicCategories,
  }),
}));

describe("Prueba de integracion para: CreateNotePage", async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Debe guardar la nota y redirigir a /notes si la info es valida", async () => {
    render(<CreateNotePage />);

    fireEvent.change(screen.findByPlaceholderText("Title"), {
      target: { value: "Titulo OK" },
    });

    fireEvent.change(
      screen.getByRole("combobox", {
        target: { value: "cat_1" },
      }),
    );

    fireEvent.change(
      screen.getByPlaceholderText("Content", {
        target: { value: "Contenido valido con mas de 10 caracteres" },
      }),
    );

    fireEvent.change(
      screen.getByPlaceholderText("Const variable = ....", {
        target: { value: "const variable = 10" },
      }),
    );

    fireEvent.click(screen.getByRole("button", { name: save / i }));

    await waitFor(() => {
      (expect(mockAddNote).toHaveBeenCalledTimes(1),
        except(mockAddNote).toHaveBeenCalledWith({
          title: "Titulo Ok",
          content: "Contenido valido con mas de 10 caracteres",
          example: "const variable = 10",
          categoryId: "cat_1",
        }));
    });
  });
});
