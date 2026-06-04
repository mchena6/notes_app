import { createContext, useContext, useState, useEffect } from "react";
import {
  notes as defaultNotes,
  categories as defaultCategories,
} from "@/lib/notes";

// Contexto para notas y categorias, con persistencia en localStorage
const NotesContext = createContext();

// Proveedor del contexto que maneja el estado de notas y categorias
export function NotesProvider({ children }) {
  // Estados de notas y categorias
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);

  // Estado para controlar si el componente esta montado
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Marcar como montado para evitar renderizado en servidor
    setIsMounted(true);

    // Cargar notas y categorias desde localStorage o usar valores por defecto
    const savedNotes = window.localStorage.getItem("my_notes");
    const savedCategories = window.localStorage.getItem("my_categories");

    if (savedNotes) {
      // Guardar notas en el estado a partir de localStorage
      setNotes(JSON.parse(savedNotes));
    } else {
      // Usar valores por defecto
      window.localStorage.setItem("my_notes", JSON.stringify(defaultNotes));
      setNotes(defaultNotes);
    }

    if (savedCategories) {
      // Guardar categorias en el estado a partir de localStorage
      setCategories(JSON.parse(savedCategories));
    } else {
      // Usar valores por defecto
      window.localStorage.setItem(
        "my_categories",
        JSON.stringify(defaultCategories),
      );
      setCategories(defaultCategories);
    }
  }, []);

  // Funcion para guardar notas
  const saveNotes = (newNotes) => {
    setNotes(newNotes);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("my_notes", JSON.stringify(newNotes));
    }
  };

  // Funcion para guardar categorias
  const saveCategories = (newCategories) => {
    setCategories(newCategories);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "my_categories",
        JSON.stringify(newCategories),
      );
    }
  };

  // Funcion para agregar nota
  const addNote = (note) => {
    // Objeto de nota
    const newNote = {
      ...note,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    // Agregar nota y guardarlo
    const newNotes = [...notes, newNote];
    saveNotes(newNotes);
  };

  // Funcion para editar nota
  const updateNote = (id, updatedFields) => {
    const updatedNote = notes.map((note) =>
      // Verificar el id y campos a editar
      String(note.id) === String(id) ? { ...note, ...updatedFields } : note,
    );
    // Guardar nota
    saveNotes(updatedNote);
  };

  // Funcion para borrar nota
  const deleteNote = (id) => {
    // Filtrar las notas que no tengan el mismo id del parametro
    const filteredNotes = notes.filter((note) => note.id !== id);
    saveNotes(filteredNotes);
  };

  // Funcion para agregar categoria
  const addCategories = (title) => {
    // Objeto de categoria
    const newCategory = {
      id: crypto.randomUUID(),
      title,
    };
    // Agregar categoria y guardar
    saveCategories([...categories, newCategory]);
  };

  // Funcion para obtener nota por id
  const getNoteById = (id) =>
    notes.find((note) => String(note.id) === String(id));

  // Funcion para obtener categorias con sus respectivas notas
  const getDynamicCategories = () => {
    return categories.map((category) => ({
      // Mostrar categoria
      ...category,
      // Mostrar notas
      notes: notes.filter(
        // Filtrar notas por categoria
        (note) => String(note.category_id) === String(category.id),
      ),
    }));
  };

  // Si el componente no esta montado, no renderizar nada
  if (!isMounted) return null;

  // Retornar funciones y constantes como contexto
  return (
    <NotesContext.Provider
      value={{
        notes,
        categories,
        addNote,
        updateNote,
        deleteNote,
        addCategories,
        getNoteById,
        getDynamicCategories,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

// Exportar contexto
export const useNotes = () => useContext(NotesContext);
