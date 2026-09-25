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

      setFormData({
        title: response.data.result.title,
        content: response.data.result.content,
        example: response.data.result.example,
      });
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
    <section className="flex p-20 justify-center items-center w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-1  p-6 rounded-lg bg-zinc-800 font-sans"
      >
        <Link
          href={"/notes"}
          className="self-start mb-4 text-white font-semibold"
        >
          &larr; Back to Notes
        </Link>

        <p className="text-white text-lg font-semibold">Create Note</p>

        <div className="mt-6 p-4 rounded border border-purple-500/30 gap-2 bg-zinc-900 flex flex-col">
          <label className="text-purple-400 text-xs font-bold tracking-wider">
            {" "}
            Redactar con IA de forma automatica{" "}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ej: Promesas, Arrow Functions..."
              className="flex-1 p-2 bg-zinc-800 rounded border border-zinc-700 focus:outline-none focus:ring-1 focus:border-purple-500"
              value={tema}
              onChange={(e) => {
                setTema(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={handleAutoFill}
              className="bg-purple-600 hover: bg-purple-700 text-xs px-4 font-bold rounded disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Cargando..." : "Generar"}
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <div className="flex flex-col">
            <p className="text-zinc-400">
              Titulo
              <label className="text-red-500 ml-2">
                {errors.title && "*" + errors.title.message}{" "}
              </label>
            </p>
            <input
              type="text"
              placeholder="Title"
              className={`p-2 border border-zinc-600 bg-zinc-900/80 rounded-md my-4 focus:outline-none focus:ring-1 focus:bg-purple-500 ${loading && "animation-pulse"} `}
              {...register("title")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-zinc-400">Category</label>
            <select
              className="p-2 border border-zinc-600 bg-zinc-900/80 rounded-md my-4"
              {...register("categoryId")}
            >
              <option disabled={true}>Seleccionar categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <p className="text-zinc-400">
              Contenido
              <label className="text-red-500 ml-2">
                {errors.content && "*" + errors.content.message}{" "}
              </label>
            </p>
            <textarea
              placeholder="Content"
              className={`p-2 border border-zinc-600  bg-zinc-900/80 rounded-md my-4 focus:outline-none focus:ring-1 focus:bg-purple-500 ${loading && "animation-pulse"}`}
              rows={10}
              {...register("content")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-zinc-400">example</label>
            <textarea
              placeholder="Const variable = ...."
              spellCheck={false}
              className={`p-2 border border-zinc-600 font-mono bg-zinc-950 rounded-md my-4 focus:outline-none focus:ring-1 focus:bg-purple-500 ${loading && "animation-pulse"}`}
              rows={10}
              {...register("example")}
            />
          </div>

          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 cursor-pointer rounded-md focus:outline-none focus:ring-1 focus:bg-purple-500 ${loading && "animation-pulse"}`}
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreateNotePage;
