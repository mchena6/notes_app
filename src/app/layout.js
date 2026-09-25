"use client";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { NotesProvider } from "@/app/context/NotesContext";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <ClerkProvider>
        <body className="min-h-full flex flex-col bg-ghost text-text-main font-sans">
          <NotesProvider>
            <Navbar />
            {children}
          </NotesProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
