"use client";
import { useState } from "react";
import { useNotes } from "@/app/context/NotesContext";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function ChatModal({ isOpen, onClose }) {
  // Obtener notas del contexto
  const { notes } = useNotes();
  // Estados
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mensajes del chat (mensaje inicial de bienvenida)
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      text: "¡Hola! ¿Qué deseas consultar sobre tus notas hoy?",
    },
  ]);

  // Manejar envio de mensaje
  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Validar input vacio o carga en proceso
    if (!input.trim() || loading) return;

    // Crear mensaje del usuario y agregarlo al chat
    const userMessage = { id: crypto.randomUUID(), role: "user", text: input };
    // Agregar mensaje del usuario al estado
    setMessages((prev) => [...prev, userMessage]);
    // Limpiar input y estados
    setInput("");
    setLoading(true);
    setError(null);

    try {
      // Enviar mensajes y notas al endpoint de IA
      const response = await axios.post("/api/ai", {
        notes: notes,
        messages: [...messages, userMessage],
      });

      // Crear respuesta IA y agregarla al chat
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: response.data.result,
        },
      ]);
    } catch (err) {
      // Manejar errores de conexion o respuesta de la IA
      setError(err.response?.data?.error || "Error al conectar con la IA");
    } finally {
      setLoading(false);
    }
  };

  // Si el modal no esta abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
     bg-black/40 backdrop-blur-xs"
    >
      <div
        className="w-full max-w-xl bg-zinc-900 border-zinc-700 rounded-lg
      p-4 flex flex-col h-125"
      >
        <div
          className="flex justify-between items-center border-b border-zinc-700 
        pb-2 mb-2"
        >
          <span className="font-bold text-sm">Itec IA</span>

          <button
            className="bg-zinc-700 px-2 py-1 rounded cursor-pointer"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {/* Renderizar mensajes del chat */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded p-2 max-w-[85%] 
            ${msg.role === "user" ? "bg-zinc-700 ml-auto" : "bg-purple-700"}`}
            >
              <p className="block text-xs text-zinc-400">
                {msg.role === "user" ? "Tú" : "IA"}
              </p>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
          {/* Mostrar estado de carga o error si existen */}
          {loading && <p>cargando...</p>}
          {error && <p>{error}</p>}
        </div>

        <form
          onSubmit={handleSendMessage}
          className="flex gap-2 pt-2 border-t border-zinc-700"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-zinc-800 px-2 py-1.5 border border-zinc-600 
          rounded outline-none focus:border-purple-500"
          ></input>
          <button
            type="submit"
            disabled={loading || !input}
            className="bg-purple-600 px-3 py-1.5 rounded font-bold"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
