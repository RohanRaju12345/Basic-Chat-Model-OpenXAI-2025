'use client';

import { useState, useCallback, FormEvent } from 'react';

interface GenerateResponse {
  result: string;
}

export default function Home() {
  const [topic, setTopic] = useState<string>('');
  const [article, setArticle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Function to call backend
  const generateArticle = useCallback(async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setArticle('');
    setError('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: topic }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data: GenerateResponse = await res.json();
      setArticle(data.result);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [topic]);

  // Form submit handler
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    generateArticle();
  };

  // Inline InputForm component
  const InputForm = () => (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        className="w-full p-3 border rounded resize-none"
        placeholder="Enter topic for article..."
        rows={5}
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-3 px-5 py-2 bg-green-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Article'}
      </button>
    </form>
  );

  // Inline ResultDisplay component
  const ResultDisplay = () => {
    if (loading) return <p className="italic text-gray-500">Generating article...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!article) return null;
    return (
      <div className="mt-4 p-4 border rounded bg-gray-50 whitespace-pre-wrap">
        {article}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        RR Article Generator
      </h1>
      <InputForm />
      <ResultDisplay />
    </div>
  );
}
