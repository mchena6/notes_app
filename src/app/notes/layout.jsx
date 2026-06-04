"use client";
import Aside from "../components/Aside";
import { NotesProvider, useNotes } from "./NotesContext";

function LayoutContent({ children }) {
  // Traer categorias y notas
  const { getDynamicCategories } = useNotes();
  const categories = getDynamicCategories();

  return (
    <div className="flex min-h-screen bg-zinc-900">
      {/* Menu lateral que muestra categorias y notas */}
      <Aside data={categories} />

      {children}
    </div>
  );
}

export default function NotasLayout({ children }) {
  // Envolver layout con el contexto
  return (
    <NotesProvider>
      <LayoutContent>{children}</LayoutContent>
    </NotesProvider>
  );
}
