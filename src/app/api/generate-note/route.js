import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // tema = "React Router"
    const { tema } = await request.json();

    // Crear prompt completo para la IA
    const promptCompleto = `
    Genera una nota educativa sobre el siguiente tema: "${tema}"
    Debes responder UNICAMENTE con un objeto JSON valido que contenga exactamente estas tres llaves (no agregues texto antes ni despues, solo el JSON):
    {
    title: "un titulo corto y profesional",
    content: "una explicacion conceptual breve en formato texto plano", 
    ejemplo: "un bloque de codigo de ejemplo practico",
    }
    `;

    // Llamar a la API de Google Gemini
    const apiKey = process.env.GEMINI_API_KEY;

    // Manejar error de configuracion de API Key
    if (!apiKey) {
      return NextResponse.json(
        { error: "Configuracion incompleta: FALTA EL API KEY!" },
        { status: 500 },
      );
    }

    // Peticion a la API de Google Gemini
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-3.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptCompleto }] }],
      }),
    });

    // Obtener respuesta de la API
    const data = await response.json();

    // Manejar errores de la API de Google
    if (!response.ok || data.error) {
      console.error("Error en la API de google:", data.error);
      return NextResponse.json(
        {
          error:
            `Error en la API de google: ${data.error?.message}` ||
            "Peticion invalida",
        },
        { status: response.status || 400 },
      );
    }

    // Extraer solo el texto de la respuesta de la IA y devolverlo al cliente
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    // Limpar texto (sacar triples comillas y saltos de linea)
    const cleanJson = rawText.replace(/```json|```/g, "").trim();

    // Convertir a objeto
    const noteData = JSON.parse(cleanJson);

    return NextResponse.json({ success: true, result: noteData });
  } catch (error) {
    // Manejar errores criticos del servidor
    console.error("Error critico en la ruta /api/generate-note");
    return NextResponse.json(
      { error: "Error interno en el servidor al procesar la solicitud" },
      { status: 500 },
    );
  }
}
