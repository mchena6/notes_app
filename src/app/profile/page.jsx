"use client";
import { useUser } from "@clerk/nextjs";
import { useNotes } from "@/app/context/NotesContext";
import NoteCard from "@/app/components/NoteCard";
import Link from "next/link";

export default function Page() {
  const { user } = useUser();
  const notesContext = useNotes();
  const notes = notesContext?.notes || [];
  console.log(notes);

  const userAvatar =
    user?.imageUrl ||
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
  const userName = user?.fullName || user?.username || "Usuario";
  const userEmail = user?.primaryEmailAddress?.emailAddress || "";

  return (
    <main className="flex flex-col items-center px-4 sm:px-6 py-6 sm:py-10 pb-16 bg-ghost text-text-dark min-h-screen">
      {/* Header del Perfil */}
      <section className="w-full max-w-3xl flex flex-col items-center bg-surface-card border border-mauve/40 rounded-xl p-5 sm:p-8 shadow-sm text-text-dark text-center">
        <img
          src={userAvatar}
          className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 border-candy shadow-sm mb-3 sm:mb-4 object-cover"
          alt={userName}
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-text-dark">{userName}</h1>
        {userEmail && (
          <p className="text-text-muted-dark font-medium my-1 text-sm sm:text-base break-all">{userEmail}</p>
        )}
        <div className="flex gap-2 items-center text-candy font-semibold text-xs sm:text-sm mt-3 bg-candy/10 px-3 py-1 rounded-full border border-candy/30">
          <svg
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-journal-text"
            viewBox="0 0 16 16"
          >
            <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
          </svg>
          <span>
            {notes.length}{" "}
            {notes.length === 1 ? "nota registrada" : "notas registradas"}
          </span>
        </div>
      </section>

      {/* Sección Mis Notas */}
      <section className="w-full max-w-3xl mt-8 sm:mt-10">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-text-dark">Mis Notas</h2>
          <Link
            href="/notes/create"
            className="bg-candy text-white px-3.5 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold hover:bg-candy-hover transition-colors shadow-sm"
          >
            + Crear Nota
          </Link>
        </div>

        {notes.length > 0 ? (
          <div className="w-full space-y-4">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <div className="w-full bg-surface-card border border-mauve/40 rounded-xl p-6 sm:p-8 text-center flex flex-col items-center justify-center shadow-sm">
            <p className="text-text-muted-dark font-medium text-sm sm:text-base mb-4">
              Aún no has creado ninguna nota.
            </p>
            <Link
              href="/notes/create"
              className="bg-candy text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold hover:bg-candy-hover transition-colors shadow-sm"
            >
              Crear mi primera nota
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
