"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Contexto para notas y categorias, con persistencia en localStorage
const NotesContext = createContext();

// Proveedor del contexto que maneja el estado de notas y categorias
export function NotesProvider({ children }) {
  // Estados de notas y categorias
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [notesRes, categoriesRes] = await Promise.all([
          axios.get("/api/notes"),
          axios.get("/api/categories"),
        ]);
        setNotes(notesRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      } finally {
        setIsMounted(true);
      }
    };

    fetchInitialData();
  }, []);

  // Funcion para agregar nota
  const addNote = async (note) => {
    try {
      // Agregar nota y guardar
      const response = await axios.post("/api/notes", note);
      setNotes((prevNotes) => [response.data, ...prevNotes]);
    } catch (error) {
      console.error("Error al agregar la nota: ", error);
    }
  };

  // Funcion para editar nota
  const updateNote = async (id, updatedFields) => {
    try {
      // Actualizar nota y guardar
      const response = await axios.put(`/api/notes/${id}`, updatedFields);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          String(id) === String(note.id) ? response.data : note,
        ),
      );
    } catch (error) {
      console.error("Error al actualizar la nota: ", error);
    }
  };

  // Funcion para borrar nota
  const deleteNote = async (id) => {
    // Borrar nota y guardar
    try {
      await axios.delete(`/api/notes/${id}`);
      // Filtrar las notas para eliminarla del contexto
      setNotes((prevNotes) =>
        prevNotes.filter((note) => String(note.id) !== String(id)),
      );
    } catch (error) {
      console.error("Error al eliminar la nota: ", error);
    }
  };

  // Funcion para agregar categoria
  const addCategories = async (title) => {
    try {
      const response = await axios.post("/api/categories", { title });
      setCategories((prevCategories) => [...prevCategories, response.data]);
    } catch (error) {
      console.error("Error al agregar la categoria: ", error);
    }
  };

  // Funcion para obtener nota por id
  const getNoteById = (id) =>
    notes.find((note) => String(note.id) === String(id));

  // Funcion para obtener categorias con sus respectivas notas
  const getDynamicCategories = () => {
    return categories.map((category) => ({
      ...category,
      notes: notes.filter(
        (note) => String(note.categoryId) === String(category.id),
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
