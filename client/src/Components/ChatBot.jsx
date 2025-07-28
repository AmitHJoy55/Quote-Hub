import { useState, useEffect, useRef } from 'react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const chatEndRef = useRef(null);

  // Effect to initialize the chat session
  useEffect(() => {
    const initializeChat = async (sid) => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/chat/history/${sid}`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data.history.length > 0 ? data.history : [{ from: 'bot', text: 'Hello! How can I help you today?' }]);
        }
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const savedSid = localStorage.getItem('chat_session_id');
    if (savedSid) {
      setSessionId(savedSid);
      initializeChat(savedSid);
    } else {
      setMessages([{ from: 'bot', text: 'Hello! How can I help you today?' }]);
    }
  }, []);

  // Effect to auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to handle sending a message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, sessionId }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      
      const data = await res.json();

      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId);
        localStorage.setItem('chat_session_id', data.sessionId);
      }

      setMessages((prev) => [...prev, { from: 'bot', text: data.reply }]);

      if (data.redirect) {
        setTimeout(() => {
          window.location.href = data.redirect;
        }, 1200);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prev) => [...prev, { from: 'bot', text: 'Sorry, something went wrong.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-24 right-10 w-16 h-16 rounded-full bg-blue-700 text-white shadow-2xl text-3xl flex items-center justify-center hover:bg-blue-800 transition-transform transform hover:scale-110">
          💬
        </button>
      )}
      {isOpen && (
        <div className="fixed bottom-28 right-10 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 bg-gray-100 rounded-t-2xl border-b">
            <span className="text-gray-800 font-bold text-lg">Quote Bot</span>
            <button className="text-gray-400 hover:text-gray-700" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-white">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] shadow-sm text-sm ${msg.from === 'user' ? 'bg-blue-600 text-white rounded-br-lg' : 'bg-gray-200 text-gray-800 rounded-bl-lg'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                  <div className="px-4 py-2.5 rounded-2xl bg-gray-200 text-gray-500 rounded-bl-lg">
                      <span className="animate-pulse">● ● ●</span>
                  </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSend} className="flex items-center border-t bg-gray-50 px-3 py-3 rounded-b-2xl">
            <input
              type="text" value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for a quote..."
              className="flex-1 px-4 py-2 rounded-l-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-r-xl text-sm font-medium disabled:bg-blue-400" disabled={isLoading}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}