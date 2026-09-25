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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-4"
    >
      <div
        className="w-full max-w-xl bg-surface-card border border-mauve/40 rounded-xl p-4 sm:p-5 flex flex-col h-[85vh] sm:h-125 shadow-xl text-text-dark"
      >
        <div
          className="flex justify-between items-center border-b border-mauve/20 pb-3 mb-3"
        >
          <span className="font-bold text-xs text-candy uppercase tracking-wider">B-IA</span>

          <button
            className="bg-mauve/20 text-text-dark hover:bg-mauve px-3 py-1 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {/* Renderizar mensajes del chat */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-xl p-3 max-w-[90%] sm:max-w-[85%] text-sm leading-relaxed border ${
                msg.role === "user"
                  ? "bg-mauve/20 text-text-dark border-mauve/40 ml-auto"
                  : "bg-candy/15 text-text-dark border-candy/30"
              }`}
            >
              <p className="block text-xs font-bold text-text-muted-dark mb-1">
                {msg.role === "user" ? "Tú" : "IA"}
              </p>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
          {/* Mostrar estado de carga o error si existen */}
          {loading && <p className="text-text-muted-dark text-sm animate-pulse">Cargando respuesta...</p>}
          {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
        </div>

        <form
          onSubmit={handleSendMessage}
          className="flex gap-2 pt-3 border-t border-mauve/20"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-ghost px-3 py-2 border border-mauve/40 text-text-dark placeholder-text-muted-dark/60 rounded-lg outline-none focus:ring-2 focus:ring-mauve text-sm"
          />
          <button
            type="submit"
            disabled={loading || !input}
            className="bg-candy text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-candy-hover transition-colors cursor-pointer disabled:opacity-50"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
