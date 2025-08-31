import { useState } from 'react';

export default function PromptForm({ onGenerate, loading }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() !== '') onGenerate(prompt);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
        cols={50}
        placeholder="Enter topic or article idea..."
      />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Generating...' : 'Generate Article'}
      </button>
    </form>
  );
}
