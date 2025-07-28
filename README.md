# 🧠 AI-Powered Quote Hub

An intelligent quote website powered by **Gemini AI**, designed to provide users with categorized quotes (Motivational, Romantic, Funny, etc.) through a friendly chatbot experience. The chatbot detects user mood or intent and guides them to the appropriate quote pages — all while maintaining session-based chat history.

---

## 🚀 Features

- 💬 AI-powered chatbot using **Gemini API**
- 🎯 Intent detection to classify user moods (motivational, romantic, funny)
- 🔁 Session-based chat history (even after page reloads)
- 🧠 Agentic tool-based workflow (Intent detection + Quote navigation)
- 🌐 Multiple quote category pages
- ⚡ Clean and fast React + Tailwind CSS frontend
- ✅ Fully functional Express backend

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| **Frontend** | React, Tailwind CSS, Axios           |
| **Backend**  | Node.js, Express.js                  |
| **AI/ML**    | Google Gemini API (`@google/generative-ai`) |
| **Storage**  | File-based JSON session storage       |
| **Workflow** | Custom intent detection and redirect navigator |

---

## 📌 Project Workflow

1. User chats with the bot on the homepage.
2. Message is passed to the backend API.
3. Agentic tools analyze:
   - `detectIntent`: Determines quote type or general query.
   - `navigator`: Decides redirect path if intent matches a category.
4. Gemini AI generates a natural reply.
5. If a valid intent is found, user is redirected to the related quote page.
6. All messages are saved to `sessions.json` under the session ID.

---
## 🖥️ Local Development Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/AmitHJoy55/Quote-Hub.git
cd quote-hub
```

### Step 2: Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:

```ini
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the backend server:

```bash
node index.js
```

The server will run at [http://localhost:5000](http://localhost:5000)

### Step 3: Set Up the Frontend

```bash
cd ../client
npm install
npm run dev
```
## 🧠 Intent Detection Example

```js
function detectIntent(message) {
  if (message.includes("motivate")) return "motivational";
  if (message.includes("love")) return "romantic";
  if (message.includes("joke")) return "funny";
  return null;
}
