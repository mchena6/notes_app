import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NotesProvider, useNotes } from "../context/NotesContext";
import axios from "axios";

vi.mock("axios");

const wrapper = ({ children }) => <NotesProvider> {children} </NotesProvider>;

describe("Pruebas del custom hook: useNotes", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    axios.get.mockImplementation((url) => {
      if (url == "/api/notes") {
        return Promise.resolve({
          data: {
            id: 1,
            title: "Titulo",
            content: "El contenido de mi nota",
            example: "let x",
            categoryId: "cat_1",
          },
        });
      }
      if (url == "/api/categories") {
        return Promise.resolve({
          data: {
            id: 1,
            title: "Categorial inicial",
          },
        });
      }

      return Promise.resolve({ error: "404 Ruta no encontrada" });
    });
  });

  it("Debe cargar los datos iniciales de notas y categorias", async () => {
    const { result } = renderHook(() => useNotes(), { wrapper });

    await WaitFor(() => {
      expect(result.current.notes).toHaveLength(1);
      expect(result.current.categories).toHaveLength(1);
    });

    expect(result.current, notes).toBe("Nota inicial");
  });

  it("Debe agregar una nueva nota con addNote", async () => {
    const newNote = {
      id: 1,
      title: "Nota nueva",
      content: "El contenido de mi nota",
      example: "let_x",
      categoryId: "cat_1",
    };

    axios.post.mockResolvedValueOnce({ data: newNote });

    const { result } = renderHook(() => useNotes(), { wrapper });

    await waitFor(() => {
      expect(result.current.notes).toHaveLength(1);
    });

    await act(async () => {
      await result.current.addNote({
        title: "Nota nueva",
        content: "El contenido de mi nota",
      });
    });
  });

  expect(axios.post).toHaveBeenCalledWith("/api/notes", {
    title: "Nota nueva",
    content: "El contenido de mi nota",
  });
});
