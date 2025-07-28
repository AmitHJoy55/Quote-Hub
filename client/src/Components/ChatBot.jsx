import { useState } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    // Simulate bot reply
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Sorry, I'm just a demo bot!" },
      ]);
    }, 600);
    setInput("");
  };

return (
    <div>
        {/* Chatbot Icon */}
            {!open && (
                <button
                className="fixed bottom-24 right-10 bg-blue-700 hover:bg-blue-800 text-white rounded-full shadow-2xl w-20 h-20 flex items-center justify-center text-4xl z-30 transition-all duration-200"
                onClick={() => setOpen(true)}
                aria-label="Open chatbot"
                >
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="#2563eb" />
                    {/* Rounded smile using an arc */}
                    <path
                    d="M9 16a3.5 3 0 0 0 6 0"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    />
                    <circle cx="9" cy="10" r="1.3" fill="#fff" />
                    <circle cx="15" cy="10" r="1.3" fill="#fff" />
                </svg>
                </button>
            )}

            {/* Chatbot Window */}
        {open && (
            <div className="fixed bottom-10 right-10 w-[400px] bg-white rounded-2xl shadow-2xl flex flex-col z-30 border border-blue-100">
                <div className="flex items-center justify-between px-6 py-4 border-b bg-blue-50 rounded-t-2xl">
                    <span className="font-bold text-blue-700 text-lg flex items-center gap-2">
                        <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" fill="#2563eb" />
                            <path
                                d="M9 16a3.5 3 0 0 0 6 0"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <circle cx="9" cy="10" r="1.3" fill="#fff" />
                            <circle cx="15" cy="10" r="1.3" fill="#fff" />
                        </svg>
                        Quote Bot
                    </span>
                    <button
                        className="text-gray-400 hover:text-blue-700 transition"
                        onClick={() => setOpen(false)}
                        aria-label="Close chatbot"
                    >
                        <svg width="24" height="24" fill="none" viewBox="0 0 20 20">
                            <path
                                d="M9 6l7 8M16 6l-7 8"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-white"
                    style={{ maxHeight: "400px" }}
                >
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex ${
                                msg.from === "user" ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div
                                className={`px-4 py-3 rounded-xl text-base shadow-sm ${
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
                <form onSubmit={handleSend} className="flex border-t px-3 py-3 bg-blue-50 rounded-b-2xl">
                    <input
                        className="flex-1 px-4 py-3 rounded-l-xl border border-gray-200 focus:outline-none text-base"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-xl text-base font-semibold transition"
                    >
                        Send
                    </button>
                </form>
            </div>
        )}
    </div>
);
}
