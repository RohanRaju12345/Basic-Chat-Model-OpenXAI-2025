export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { prompt } = req.body;

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'phi3',
        prompt: `Write a detailed article about: ${prompt}`,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    res.status(200).json({ result: data.text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
