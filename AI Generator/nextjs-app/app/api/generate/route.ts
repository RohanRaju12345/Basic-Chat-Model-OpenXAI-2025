import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3', 
        prompt: `Write a detailed article about: ${prompt}`,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    return NextResponse.json({ result: data.text });
  } catch (err: any) {
    return NextResponse.json({ result: 'Error: ' + err.message });
  }
}
