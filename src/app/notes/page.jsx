"use client";
import React from "react";
import Link from "next/link";
import { useNotes } from "../context/NotesContext";
import NoteCard from "../components/NoteCard";

export default function page() {
  const { notes } = useNotes();

  return (
    <div className="flex flex-col flex-1 items-center bg-ghost font-sans text-text-dark min-h-screen">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-start justify-start py-6 px-4 sm:py-12 sm:px-8 bg-ghost text-text-dark">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full mb-6">
          <div className="flex justify-between items-center w-full gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold leading-10 tracking-tight text-text-dark">
              Notas
            </h1>
            <Link
              href={"/notes/create"}
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-candy px-4 text-white font-semibold transition-colors hover:bg-candy-hover shadow-sm text-sm shrink-0"
            >
              + Crear Nota
            </Link>
          </div>
        </div>

        {/* Seccion que muestre mis notas */}

        <div className="w-full space-y-4">
          {notes && notes.length > 0 ? (
            notes.map((note, key) => (
              <NoteCard key={key} note={note} />
            ))
          ) : (
            <div className="text-center py-10 px-4 rounded-xl border border-mauve/30 bg-surface-card my-4">
              <p className="text-text-muted-dark font-medium">
                No tienes notas creadas todavía.
              </p>
              <Link
                href="/notes/create"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-candy text-white text-sm font-semibold rounded-lg hover:bg-candy-hover transition-colors shadow-sm"
              >
                + Crear primera nota
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
