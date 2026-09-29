import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-ghost font-sans text-text-dark min-h-[calc(100vh-4rem)]">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-center py-12 px-4 sm:py-20 sm:px-8 bg-ghost text-text-dark text-center">
        {/* Badge superior */}
        <div className="inline-flex items-center gap-2 bg-mauve/20 text-text-dark border border-mauve/40 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-xs">
          <span className="inline-block w-2 h-2 rounded-full bg-candy animate-pulse"></span>
          Tu espacio creativo de notas
        </div>

        {/* Título principal */}
        <h1 className="max-w-2xl text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight text-text-dark mb-4">
          Organiza tus ideas con <span className="text-candy">BYA Notes</span>
        </h1>

        {/* Subtítulo */}
        <p className="max-w-xl text-base sm:text-lg leading-relaxed text-text-muted-dark mb-8">
          Una aplicación de notas rápida, intuitiva y minimalista diseñada para
          capturar tus pensamientos, listas y proyectos en un solo lugar.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 text-base font-medium w-full sm:w-auto justify-center mb-12">
          <Link
            className="flex h-12 w-full sm:w-auto px-8 items-center justify-center gap-2 rounded-full bg-candy text-white transition-colors hover:bg-candy-hover shadow-sm font-semibold"
            href="/notes/create"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Crear Nota
          </Link>
          <Link
            className="flex h-12 w-full sm:w-auto px-8 items-center justify-center gap-2 rounded-full border border-mauve bg-mauve/15 text-text-dark transition-colors hover:bg-mauve font-semibold"
            href="/notes"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            Ver Mis Notas
          </Link>
        </div>

        {/* Banner */}
        <div className="w-full max-w-2xl rounded-2xl border border-mauve/40 bg-surface-card p-6 sm:p-8 shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-mauve/20 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-candy/60 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-mauve inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-candy-hover/40 inline-block"></span>
            </div>
            <span className="text-xs font-mono text-text-muted-dark">
              bya-notes.app
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="p-4 rounded-xl bg-ghost border border-mauve/30">
              <h3 className="font-bold text-sm text-text-dark mb-1">
                💡 Notas rápidas
              </h3>
              <p className="text-xs text-text-muted-dark">
                Escribe tus pensamientos al instante con soporte para código e
                IA.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-ghost border border-mauve/30">
              <h3 className="font-bold text-sm text-text-dark mb-1">
                🤖 Asistente B-IA
              </h3>
              <p className="text-xs text-text-muted-dark">
                Genera resúmenes y ayuda para estructurar tus ideas fácilmente.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
