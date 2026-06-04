import Link from 'next/link'
import React from 'react'

export default function page() {

  // funcion fetch notas => me trae un array de notas [{id: 1, title: "Nota 1", content: "Contenido de la nota 1"}, {id: 2, title: "Nota 2", content: "Contenido de la nota 2"}]

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            About
          </h1>
        </div>

        {/* Seccion que muestre mis notas */}
        <section className='w-full h-64 my-8 p-6 rounded-lg flex flex-col bg-zinc-800 text-white justify-between'>
          <div>
            <h1 className='font-semibold text-lg'>Esta ruta esta de ejemplo!!</h1>
          </div>
        </section>

      </main>
    </div>
  )
}