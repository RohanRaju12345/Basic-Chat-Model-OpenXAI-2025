
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const ollamaRes = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "phi",
        prompt,
        stream: false
      })
    });

    if (!ollamaRes.ok) {
      const errText = await ollamaRes.text();
      return new Response(
        JSON.stringify({ error: `Ollama error: ${errText}` }),
        { status: 500 }
      );
    }

    const data = await ollamaRes.json();
    return new Response(JSON.stringify({ output: data.response }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
