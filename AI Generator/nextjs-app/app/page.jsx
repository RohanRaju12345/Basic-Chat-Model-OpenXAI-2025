"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  const sendPrompt = async () => {
    const prompt = input.trim();
    if (!prompt || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: prompt }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const err = await res.text();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: `Error from API: ${err || res.status}` },
        ]);
      } else {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: data?.output || "No article generated." },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `Network error: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendPrompt();
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <main className="page">
      <div className="card">
        <h1 className="title">RR Article Generator</h1>

        <div className="messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`bubble ${msg.role}`}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="bubble assistant">Generating article...</div>}
          <div ref={endRef} />
        </div>

        <div className="input-row">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a topic for your article..."
            aria-label="Article topic"
          />
          <button onClick={sendPrompt} disabled={loading}>
            {loading ? "..." : "Generate"}
          </button>
        </div>
      </div>
    </main>
  );
}
