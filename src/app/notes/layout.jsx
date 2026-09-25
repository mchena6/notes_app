"use client";
import Aside from "../components/Aside";
import { NotesProvider, useNotes } from "../context/NotesContext";

function LayoutContent({ children }) {
  // Traer categorias y notas
  const context = useNotes();
  const categories = context?.getDynamicCategories ? context.getDynamicCategories() : [];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-ghost text-text-dark w-full">
      {/* Menu lateral que muestra categorias y notas */}
      <Aside data={categories} />

      {children}
    </div>
  );
}

export default function NotasLayout({ children }) {
  return <LayoutContent>{children}</LayoutContent>;
}
