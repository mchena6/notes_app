import Link from "next/link";

// Componente de servidor

export default function NoteCard({ note }) {
  return (
    <section className="w-full h-64 my-4 p-6 rounded-xl flex flex-col bg-surface-card text-text-dark justify-between border border-mauve/40 shadow-sm hover:shadow-md hover:border-candy/60 transition-all group">
      <div>
        <h1 className="font-bold text-xl text-text-dark group-hover:text-candy transition-colors">{note.title}</h1>
        <p className="text-text-muted-dark text-sm mt-2 line-clamp-3 leading-relaxed">{note.content.slice(0, 75)}...</p>
      </div>
      <Link
        href={`/notes/${note.id}`}
        className="inline-flex items-center gap-1 text-sm font-semibold text-candy hover:text-candy-hover transition-colors"
      >
        Ver Nota →
      </Link>
    </section>
  );
}
