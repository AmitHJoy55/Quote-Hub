// backend/tools/index.js
module.exports = {
  detectIntent: {
    name: "detectIntent",
    description: "Detect user's intent based on input message",
    parameters: {
      type: "object",
      properties: {
        message: { type: "string", description: "The user input message" },
      },
      required: ["message"],
    },
    run: ({ message }) => {
      const text = message.toLowerCase();
      if (text.includes("motivation") || text.includes("struggle")) return "motivational";
      if (text.includes("love") || text.includes("romance")) return "romantic";
      if (text.includes("funny") || text.includes("joke")) return "funny";
      return "unknown";
    },
  },

  getRedirectPage: {
    name: "getRedirectPage",
    description: "Return redirect URL based on intent",
    parameters: {
      type: "object",
      properties: {
        intent: { type: "string", description: "The user's intent" },
      },
      required: ["intent"],
    },
    run: ({ intent }) => {
      const map = {
        motivational: "/motivational-quotes",
        romantic: "/romantic-quotes",
        funny: "/funny-quotes",
      };
      return map[intent] || null;
    },
  },
};
