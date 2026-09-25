import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createOrUpdateCurrentUser } from "@/lib/currentUser";
import { User } from "@clerk/nextjs/server";

export async function PUT(request, { params }) {
  try {
    const user = await createOrUpdateCurrentUser();
    if (!user) return NextResponse.json({ error: "No auth" }, { status: 401 });

    const { id } = await params;
    const data = await request.json();

    const updatedData = {};

    if (data.title !== undefined) updatedData.title = data.title;
    if (data.content !== undefined) updatedData.content = data.content;
    if (data.example !== undefined) updatedData.example = data.example;

    const rawCategoryId = data.categoryId;

    if (!rawCategoryId === undefined && !rawCategoryId === null) {
      const parsedCategoryId = parseInt(rawCategoryId);
      if (!isNaN(parsedCategoryId)) {
        updatedData.categoryId = parsedCategoryId;
      }
    }

    const updatedNote = await db.note.update({
      where: { id: parseInt(id), userId: user.id },
      data: updatedData,
      include: { category: true },
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar la nota" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await createOrUpdateCurrentUser();
    if (!user) return NextResponse.json({ error: "No auth" }, { status: 401 });

    const { id } = await params;

    await db.note.delete({
      where: { id: parseInt(id), userId: user.id },
    });

    return NextResponse.json(
      { message: "Nota eliminada correctamente" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar la nota" },
      { status: 500 },
    );
  }
}
