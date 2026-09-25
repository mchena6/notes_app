"use client";
import Link from "next/link";
import { useState } from "react";
import ChatModal from "./ChatModal";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

export default function Navbar() {
  // Estados del modal de chat
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { isLoaded, isSignedIn } = useAuth();

  return (
    <>
      <nav className="relative bg-ghost/95 text-text-main after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-mauve/40 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Botón de menú móvil */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                command="--toggle"
                commandfor="mobile-menu"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-text-main hover:bg-mauve/20 focus:outline-2 focus:-outline-offset-1 focus:outline-candy"
              >
                <span className="sr-only">Abrir menú principal</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="size-6 in-aria-expanded:hidden"
                >
                  <path
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="size-6 not-in-aria-expanded:hidden"
                >
                  <path
                    d="M6 18 18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Logo y Enlaces de Navegación */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <Link href="/notes" className="flex shrink-0 items-center gap-2.5 group">
                <div className="bg-candy/20 border border-candy/40 p-1.5 rounded-lg group-hover:bg-candy/30 transition-colors">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-candy"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <span className="font-bold text-lg text-text-dark tracking-tight">
                  BYA <span className="text-candy">Notes</span>
                </span>
              </Link>

              {/* Menú de navegación desktop */}
              <div className="hidden sm:ml-8 sm:block">
                <div className="flex items-center space-x-3">
                  <Link
                    href="/notes"
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-text-main hover:bg-mauve/20 transition-colors"
                  >
                    Notas
                  </Link>
                  <Link
                    href="/profile"
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-text-main hover:bg-mauve/20 transition-colors"
                  >
                    Perfil
                  </Link>

                  {/* Botón para abrir el modal de chat con la IA */}
                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="bg-mauve/30 text-text-main rounded-lg px-3.5 py-1.5 text-sm font-semibold border border-mauve/60 cursor-pointer hover:bg-mauve transition-colors flex items-center gap-1.5"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-candy animate-pulse"></span>
                    B-IA
                  </button>
                </div>
              </div>
            </div>

            {/* Acciones del lado derecho (Notificaciones y Clerk Auth) */}
            <div className="absolute inset-y-0 right-0 flex items-center gap-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full p-2 text-text-muted hover:text-candy hover:bg-mauve/15 focus:outline-2 focus:outline-offset-2 focus:outline-candy transition-colors cursor-pointer"
                title="Notificaciones"
              >
                <span className="sr-only">Ver notificaciones</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="size-5"
                >
                  <path
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Botón de Autenticación de Clerk */}
              {isLoaded && !isSignedIn && (
                <SignInButton>
                  <button className="bg-candy text-white rounded-lg px-4 py-2 text-sm font-bold border border-candy/40 cursor-pointer hover:bg-candy-hover transition-colors shadow-sm">
                    Iniciar sesión
                  </button>
                </SignInButton>
              )}

              {isLoaded && isSignedIn && (
                <div className="flex items-center pl-2">
                  <UserButton showName={false} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Menú Móvil */}
        <el-disclosure id="mobile-menu" hidden className="block sm:hidden">
          <div className="space-y-1 px-3 pt-2 pb-3 bg-ghost border-t border-mauve/20">
            <Link
              href="/notes"
              className="block rounded-lg bg-mauve/20 px-3 py-2 text-base font-semibold text-text-main"
            >
              Notas
            </Link>
            <Link
              href="/profile"
              className="block rounded-lg px-3 py-2 text-base font-semibold text-text-main hover:bg-mauve/20 transition-colors"
            >
              Perfil
            </Link>
            <button
              onClick={() => setIsChatOpen(true)}
              className="w-full text-left rounded-lg px-3 py-2 text-base font-semibold text-candy bg-mauve/20 transition-colors"
            >
              B-IA
            </button>
          </div>
        </el-disclosure>
      </nav>

      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
