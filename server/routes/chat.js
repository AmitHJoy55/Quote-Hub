// backend/routes/chat.js
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../db/sessions.json");
const tools = require("../tools/functions");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const loadSessions = () => {
  if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, "{}");
  return JSON.parse(fs.readFileSync(dbPath));
};

const saveSessions = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

router.post("/message", async (req, res) => {
  const { message, sessionId } = req.body;
  const sid = sessionId || uuidv4();

  const sessions = loadSessions();
  if (!sessions[sid]) sessions[sid] = [];
  sessions[sid].push({ from: "user", text: message });

  let intent = "unknown";
  let redirect = null;
  let botReply =
    "I'm not sure how to respond. You can ask for motivational, romantic, or funny quotes.";

  try {
    // Simulate function-calling with AI reasoning
    const prompt = `
        You are a helpful quote assistant. 
        You have access to the following tools:
        1. detectIntent(message)
        2. getRedirectPage(intent)

        A user sent: "${message}"
        Determine which tools to call and in what order.
        `;

    // First, let Gemini "think" of what to do
    const result = await model.generateContent(prompt);
    const decision = (await result.response).text().toLowerCase();

    // Decision Simulation: use string matching for now
    if (decision.includes("motivational") || decision.includes("struggle")) {
      intent = "motivational";
    } else if (decision.includes("romantic") || decision.includes("love")) {
      intent = "romantic";
    } else if (decision.includes("funny") || decision.includes("joke")) {
      intent = "funny";
    }

    // Call the redirect tool
    redirect = tools.getRedirectPage.run({ intent });

    if (redirect) {
      botReply = `Great! I'll take you to the ${intent} quotes page now.`;
    } else {
      // fallback to generative reply
      const altPrompt = `User said: "${message}". Respond in a friendly way.`;
      const altResult = await model.generateContent(altPrompt);
      botReply = (await altResult.response).text().trim();
    }
  } catch (err) {
    console.error("Gemini API error:", err);
    botReply = "Sorry, my AI brain is taking a break. Please try again soon.";
  }

  sessions[sid].push({ from: "bot", text: botReply });
  saveSessions(sessions);

  res.json({ reply: botReply, sessionId: sid, redirect });
});

router.get("/history/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  const sessions = loadSessions();
  const history = sessions[sessionId] || [];
  res.json({ history });
});

module.exports = router;
