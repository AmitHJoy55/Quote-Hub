// backend/routes/chat.js

const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const detectIntent = require("../utils/intentDetector");
const getRedirectPage = require("../utils/navigator");

const dbPath = path.join(__dirname, "../db/sessions.json");

// --- Gemini Setup ---
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// --- Helper Functions to manage db/sessions.json ---
const loadSessions = () => {
  if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, "{}");
  return JSON.parse(fs.readFileSync(dbPath));
};

const saveSessions = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// --- API Endpoints ---

router.post("/message", async (req, res) => {
  let { message, sessionId } = req.body;
  const sid = sessionId || uuidv4();

  const sessions = loadSessions();
  if (!sessions[sid]) sessions[sid] = [];

  sessions[sid].push({ from: "user", text: message });

  // 1. Agentic Workflow: Invoke tools
  const intent = detectIntent(message);
  const redirect = getRedirectPage(intent);
  // console.log(`Intent detected: ${intent}, Redirect page: ${redirect}`);

  // 2. Generate a natural response with Gemini AI
  let botReply =
    "I'm not sure how to respond. You can ask for motivational, romantic, or funny quotes.";
  try {
    const prompt = `You are a friendly quote-finding chatbot. The user said: "${message}". Your goal is to guide them to the quote pages (motivational, romantic, funny). If their intent is clear, confirm you will navigate them. Otherwise, ask a clarifying question. Keep responses short and conversational.`;
    const result = await model.generateContent(prompt);
    botReply = (await result.response).text().trim();
  } catch (err) {
    console.error("Gemini API error:", err);
    botReply = "Sorry, my AI brain is taking a break. Please try again soon.";
  }

  // 3. Override AI reply if a navigation action is decided
  if (redirect) {
    botReply = `Great! I'll take you to the ${intent} quotes page now.`;
  }

  sessions[sid].push({ from: "bot", text: botReply });
  saveSessions(sessions);

  // 4. Send the final payload to the frontend
  res.json({
    reply: botReply,
    sessionId: sid,
    redirect: redirect,
  });
});

router.get("/history/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  const sessions = loadSessions();
  const history = sessions[sessionId] || [];
  res.json({ history });
});

module.exports = router;
