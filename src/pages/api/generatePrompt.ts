import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenAI } from "@google/genai";

type Data = { result?: string; error?: string };

const ai = new GoogleGenAI({}); // prende GEMINI_API_KEY da .env.local

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo non consentito, usa POST." });
  }

  try {
    const { context, audience, style, platforms, elements } = req.body;

    // Controllo input
    if (!context || !audience || !style || !platforms || !elements) {
      return res
        .status(400)
        .json({ error: "Tutti i campi C.A.S.P.E.R. sono obbligatori." });
    }

    // Costruzione prompt
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

    const output = response.text || "Nessuna risposta generata dal modello.";
    res.status(200).json({ result: output });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Errore sconosciuto durante la generazione del prompt.";
    console.error("❌ API ERROR:", message);
    res.status(500).json({ error: message });
  }
}
