import React from "react";
import ChatBot from "../Components/ChatBot";
function HeroSection() {
  // Example quote and author, replace with props or state as needed
  const quote =
    "The only limit to our realization of tomorrow is our doubts of today.";
  const author = "Franklin D. Roosevelt";

  return (
    <div>
      <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-lg relative">
        <p className="text-2xl font-mono mb-10 leading-snug">{quote}</p>
        <span className="absolute right-8 bottom-6 italic font-medium text-gray-600">
          {author && `— ${author}`}
        </span>
      </div>
      <div className="flex justify-end mt-8 z-10">
        <ChatBot />
      </div>
    </div>
  );
}

export default HeroSection;
