"use client";

import { useState } from "react";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];

    setMessages(newMessages);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setMessages([
      ...newMessages,
      { role: "ai", content: data.reply },
    ]);

    setInput("");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Landon's A Femboy</h1>

      <div>
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.role}:</b> {m.content}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        on KeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
       />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
