"use client";
import { useState } from "react";
import { useNotes } from "../../context/NotesContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { notesSchema } from "@/app/validations/NotesSchema";

function CreateNotePage() {
  const router = useRouter();

  const { addNote, getDynamicCategories } = useNotes();
  const categories = getDynamicCategories();

  const [tema, setTema] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(notesSchema),
    defaultValues: {
      title: "",
      content: "",
      example: "",
      categoryId: "",
    },
  });

  // Funcion para llamar la API generate-note y generar la nota con IA
  const handleAutoFill = async (e) => {
    e.preventDefault();

    // Validar si hay tema o esta procesando una solicitud
    if (!tema || loading) return;
    setLoading(true);

    try {
      const response = await axios.post("/api/generate-note", { tema });

      setValue("title", response.data.result.title);
      setValue("content", response.data.result.content);
      setValue("example", response.data.result.example);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    addNote(data);
    router.push("/notes");
  };

  return (
    <section className="flex p-4 sm:p-12 justify-center items-center w-full min-h-screen bg-ghost text-text-dark">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-1 max-w-2xl p-4 sm:p-8 rounded-xl bg-surface-card border border-mauve/40 shadow-md font-sans"
      >
        <Link
          href={"/notes"}
          className="self-start mb-4 text-text-muted-dark hover:text-candy font-semibold transition-colors flex items-center gap-1 text-sm"
        >
          &larr; Volver a Notas
        </Link>

        <h1 className="text-text-dark text-2xl font-bold">Crear Nota</h1>

        <div className="mt-6 p-3.5 sm:p-4 rounded-xl border border-mauve/40 gap-2 bg-ghost flex flex-col">
          <label className="text-candy text-xs font-bold uppercase tracking-wider">
            Redactar con IA de forma automática
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Ej: Promesas, Arrow Functions..."
              className="flex-1 p-2.5 bg-surface-card rounded-lg border border-mauve/40 text-text-dark placeholder-text-muted-dark/60 focus:outline-none focus:ring-2 focus:ring-mauve text-sm"
              value={tema}
              onChange={(e) => {
                setTema(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={handleAutoFill}
              className="bg-candy text-white hover:bg-candy-hover text-xs px-4 py-2.5 sm:py-2 font-bold rounded-lg disabled:opacity-50 cursor-pointer transition-colors shadow-sm"
            >
              {loading ? "Cargando..." : "Generar"}
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-text-muted-dark font-semibold text-sm">
              Título
              <label className="text-red-500 ml-2">
                {errors.title && "*" + errors.title.message}{" "}
              </label>
            </p>
            <input
              type="text"
              placeholder="Title"
              className={`p-3 border border-mauve/40 bg-surface-card text-text-dark placeholder-text-muted-dark/60 rounded-lg my-2 focus:outline-none focus:ring-2 focus:ring-mauve text-sm ${loading && "animate-pulse"}`}
              {...register("title")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-text-muted-dark font-semibold text-sm">Categoría</label>
            <select
              className="p-3 border border-mauve/40 bg-surface-card text-text-dark rounded-lg my-2 text-sm focus:outline-none focus:ring-2 focus:ring-mauve"
              {...register("categoryId")}
            >
              <option disabled={true}>Seleccionar categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <p className="text-text-muted-dark font-semibold text-sm">
              Contenido
              <label className="text-red-500 ml-2">
                {errors.content && "*" + errors.content.message}{" "}
              </label>
            </p>
            <textarea
              placeholder="Content"
              className={`p-3 border border-mauve/40 bg-surface-card text-text-dark placeholder-text-muted-dark/60 rounded-lg my-2 focus:outline-none focus:ring-2 focus:ring-mauve text-sm ${loading && "animate-pulse"}`}
              rows={8}
              {...register("content")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-text-muted-dark font-semibold text-sm">Ejemplo de Código</label>
            <textarea
              placeholder="Const variable = ...."
              spellCheck={false}
              className={`p-3 border border-mauve/40 font-mono bg-ghost text-text-dark placeholder-text-muted-dark/60 rounded-lg my-2 focus:outline-none focus:ring-2 focus:ring-mauve text-sm ${loading && "animate-pulse"}`}
              rows={8}
              {...register("example")}
            />
          </div>

          <button
            type="submit"
            className={`bg-candy hover:bg-candy-hover text-white font-bold p-3 cursor-pointer rounded-lg transition-colors shadow-sm text-sm mt-2 ${loading && "animate-pulse"}`}
          >
            Guardar Nota
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreateNotePage;
