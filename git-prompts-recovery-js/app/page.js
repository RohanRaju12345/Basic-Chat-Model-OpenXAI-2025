import { useState } from 'react';
import PromptForm from '../components/PromptForm';
import ResultBox from '../components/ResultBox';
import styles from './page.module.css';

export default function Home() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (prompt) => {
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setResult('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>AI Article Generator</h1>
      <PromptForm onGenerate={handleGenerate} loading={loading} />
      <ResultBox result={result} />
    </div>
  );
}
