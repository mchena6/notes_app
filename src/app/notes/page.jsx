"use client";
import React from "react";
import Link from "next/link";
import { useNotes } from "../context/NotesContext";
import NoteCard from "../components/NoteCard";

export default function page() {
  const { notes } = useNotes();

  return (
    <div className="flex flex-col flex-1 items-center bg-ghost font-sans text-text-dark min-h-screen">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-start justify-start py-12 px-8 bg-ghost text-text-dark">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full mb-6">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-3xl font-bold leading-10 tracking-tight text-text-dark">
              Notas
            </h1>
            <Link
              href={"/notes/create"}
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-candy px-4 text-white font-semibold transition-colors hover:bg-candy-hover shadow-sm text-sm"
            >
              + Create Note
            </Link>
          </div>
        </div>

        {/* Seccion que muestre mis notas */}

        <div className="w-full space-y-4">
          {notes.map((note, key) => (
            <NoteCard key={key} note={note} />
          ))}
        </div>
      </main>
    </div>
  );
}
