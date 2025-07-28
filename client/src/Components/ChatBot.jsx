"use client";
import { useState, useEffect } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  // Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("chat-messages");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  // Save chat history on every message update
  useEffect(() => {
    localStorage.setItem("chat-messages", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error("Failed to fetch bot response");

      const data = await res.json();
      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Bot error:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Something went wrong. Please try again." },
      ]);
    }
  };

  return (
    <div>
      {/* Toggle Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-10 w-16 h-16 rounded-full bg-blue-700 text-white shadow-2xl text-2xl flex items-center justify-center"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-10 w-[400px] bg-white rounded-2xl shadow-2xl flex flex-col z-30 border border-blue-200">
          <div className="flex items-center justify-between px-6 py-4 bg-blue-100 rounded-t-2xl">
            <span className="text-blue-700 font-bold text-lg flex items-center gap-2">
              💬 Quote Bot
            </span>
            <button
              className="text-gray-400 hover:text-blue-700"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-white max-h-[400px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-xl max-w-xs shadow-sm text-sm ${
                    msg.from === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-900"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSend}
            className="flex items-center border-t bg-blue-50 px-3 py-3 rounded-b-2xl"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-l-xl border border-gray-300 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-r-xl text-sm font-medium"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
