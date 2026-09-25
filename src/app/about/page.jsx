import Link from "next/link";
import React from "react";

export default function page() {
  // funcion fetch notas => me trae un array de notas [{id: 1, title: "Nota 1", content: "Contenido de la nota 1"}, {id: 2, title: "Nota 2", content: "Contenido de la nota 2"}]

  return (
    <div className="flex flex-col flex-1 items-center bg-ghost font-sans text-text-dark min-h-screen">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-start justify-start py-12 px-8 bg-ghost text-text-dark">
        <div className="flex flex-col items-start gap-6 text-left w-full mb-4">
          <h1 className="text-3xl font-bold leading-10 tracking-tight text-text-dark">
            About
          </h1>
        </div>

        {/* Seccion que muestre mis notas */}
        <section className="w-full h-64 my-6 p-6 rounded-xl flex flex-col bg-surface-card text-text-dark justify-between border border-mauve/40 shadow-sm">
          <div>
            <h1 className="font-bold text-lg text-text-dark">
              Esta ruta está de ejemplo!!
            </h1>
          </div>
        </section>
      </main>
    </div>
  );
}
