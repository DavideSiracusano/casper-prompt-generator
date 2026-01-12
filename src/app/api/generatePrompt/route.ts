import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({}); // GEMINI_API_KEY da .env.local

export async function POST(request: Request) {
  try {
    const { context, audience, style, platforms, elements } =
      await request.json();

    if (!context || !audience || !style || !platforms || !elements) {
      return NextResponse.json(
        { error: "Tutti i campi C.A.S.P.E.R. sono obbligatori." },
        { status: 400 }
      );
    }

    const prompt = `
Genera un prompt per AI seguendo il metodo C.A.S.P.E.R.:
- Context: ${context}
- Audience: ${audience}
- Style: ${style}
- Platforms: ${platforms}
- Elements: ${elements}

Fornisci il prompt finale pronto per essere usato in un'AI come Lovable o ChatGPT.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({
      result: response.text || "Nessuna risposta generata.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Errore sconosciuto.";
    console.error("❌ API ERROR:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
