import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request) {
  try {
    const notes = await db.note.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las notas" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const categoryId = parseInt(data.categoryId);

    if (!data.title || !data.content || isNaN(categoryId)) {
      return NextResponse.json(
        { error: "El titulo y el contenido son obligatorios" },
        { status: 400 },
      );
    }

    const newNote = await db.note.create({
      data: {
        title: data.title,
        content: data.content,
        example: data.example,
        categoryId: categoryId,
      },
      include: { category: true },
    });

    return NextResponse.json({ newNote }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear la nota" },
      { status: 500 },
    );
  }
}
