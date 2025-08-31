'use client';
import { useState, FormEvent } from 'react';

interface Props {
  onGenerate: (prompt: string) => void;
  loading: boolean;
}

export function PromptForm({ onGenerate, loading }: Props) {
  const [prompt, setPrompt] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (prompt.trim() !== '') onGenerate(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
        className="w-full p-2 border rounded"
        placeholder="Enter article topic..."
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Article'}
      </button>
    </form>
  );
}
