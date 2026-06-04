"use client";
import { useState } from "react";
import { useNotes } from "../NotesContext";
import { useRouter } from "next/navigation";
import { categories } from "@/lib/notes";
import axios from "axios";

import Link from "next/link";
import React from "react";

function CreateNotePage() {
  const router = useRouter();

  const { addNote, getDynamicCategories } = useNotes();
  const categories = getDynamicCategories();

  const [tema, setTema] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    ejemplo: "",
    category_id: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content)
      return alert("Title and content are required");

    addNote(formData);
    router.push("/notes");
  };

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
        ejemplo: response.data.result.ejemplo,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex p-20 justify-center items-center w-full">
      <form className="flex flex-col flex-1  p-6 rounded-lg bg-zinc-800 font-sans">
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
            <label className="text-zinc-400">Title</label>
            <input
              type="text"
              placeholder="Title"
              className={`p-2 border border-zinc-600 bg-zinc-900/80 rounded-md my-4 focus:outline-none focus:ring-1 focus:bg-purple-500 ${loading && "animation-pulse"} `}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="text-zinc-400">Category</label>
            <select
              className="p-2 border border-zinc-600 bg-zinc-900/80 rounded-md my-4"
              value={formData.category_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category_id: String(e.target.value),
                })
              }
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-zinc-400">Content</label>
            <textarea
              placeholder="Content"
              className={`p-2 border border-zinc-600  bg-zinc-900/80 rounded-md my-4 focus:outline-none focus:ring-1 focus:bg-purple-500 ${loading && "animation-pulse"}`}
              rows={10}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="text-zinc-400">Ejemplo</label>
            <textarea
              placeholder="Const variable = ...."
              spellCheck={false}
              className={`p-2 border border-zinc-600 font-mono bg-zinc-950 rounded-md my-4 focus:outline-none focus:ring-1 focus:bg-purple-500 ${loading && "animation-pulse"}`}
              rows={10}
              value={formData.ejemplo}
              onChange={(e) =>
                setFormData({ ...formData, ejemplo: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
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
