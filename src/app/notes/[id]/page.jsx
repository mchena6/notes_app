"use client";
import React from "react";
import { useNotes } from "../../context/NotesContext";
import NoteDetail from "@/app/components/NoteDetail";
import { useParams, useRouter } from "next/navigation";

export default function page() {
  const { id } = useParams();
  const { getNoteById, deleteNote } = useNotes();

  const nota = getNoteById(id);

  const router = useRouter();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this note?")) {
      router.push("/notes");
      setTimeout(() => {
        deleteNote(id);
      }, 100);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-ghost font-sans text-text-dark min-h-screen pb-16">
      <div className="w-full max-w-3xl flex flex-col items-center sm:items-start">
        <NoteDetail note={nota} />

        <div className="w-full px-8 mt-2 flex justify-center">
          <button
            onClick={handleDelete}
            className="bg-candy text-white px-5 py-2.5 rounded-lg font-bold shadow-sm hover:bg-candy-hover transition-colors cursor-pointer text-sm"
          >
            Borrar nota
          </button>
        </div>
      </div>
    </div>
  );
}
