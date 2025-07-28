const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const detectIntent = require('../utils/intentDetector');
const getRedirectPage = require('../utils/navigator');

const dbPath = path.join(__dirname, '../db/sessions.json');

// 🧠 Gemini Setup
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Helpers
const loadSessions = () => JSON.parse(fs.readFileSync(dbPath));
const saveSessions = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

router.post('/', async (req, res) => {
  const { message, sessionId } = req.body;
  const sessions = loadSessions();
  const sid = sessionId || uuidv4();
  if (!sessions[sid]) sessions[sid] = [];

  sessions[sid].push({ role: 'user', content: message });

  const intent = detectIntent(message);
  const redirect = getRedirectPage(intent);

  // 🧠 Ask Gemini for a response
  let botReply = "Let me think about that...";

  try {
    const result = await model.generateContent(`You are a friendly chatbot. The user said: "${message}". Respond with helpful, natural language. Keep it short and guide them toward quotes.`);
    const response = await result.response;
    botReply = response.text().trim();
  } catch (err) {
    console.error("Gemini error:", err);
    botReply = "Sorry, I'm having trouble thinking right now.";
  }

  sessions[sid].push({ role: 'bot', content: botReply });
  saveSessions(sessions);

  res.json({ reply: botReply, sessionId: sid, redirect });
});

module.exports = router;
