# EduReach — College Chatbot

A full-stack web app I built to help students get instant answers about a college — courses, fees, admissions, placements — without digging through 10 different pages.

**Demo Video:** https://github.com/user-attachments/assets/8196ac38-de07-4f96-8107-0153bf246c08

**Live:** https://your-deployment-link.com

---

## Why I Built This

Every college website I've visited has the same problem — the information is there somewhere, but finding it is painful. You either call the office (which is closed), email them (and wait 3 days), or give up.

I wanted to build something where a student could just ask "what's the fee for B.Tech CSE?" and get an accurate answer instantly. That's EduReach.

---

## What It Does

There are two main AI features:

**Chat with the bot** — Ask anything about the college. The bot searches a knowledge base I created with all the college info (fees, courses, placements, hostel details, etc.) and gives you a grounded answer. It doesn't hallucinate because it's pulling from real data, not making things up.

**Talk to an AI counselor** — You fill in your phone number and what you want to know, and "Ava" (an AI voice agent) actually calls you on your phone and has a real conversation with you. This uses Vapi under the hood.

Both features are gated behind login — visitors can browse the homepage but need an account to access the AI features.

---

## Tech Stack

**Backend** — Node.js, Express, TypeScript, MongoDB Atlas, Groq (LLaMA 3.3 70B), LangChain, JWT, Vapi

**Frontend** — React, TypeScript, Vite, Tailwind CSS, Axios, React Router

---

## How the AI Chat Works (RAG)

The bot uses RAG (Retrieval-Augmented Generation). Here's the basic idea:

1. I wrote a text file with all the college info
2. When the server starts, it splits that file into chunks and stores them in MongoDB
3. When a student asks a question, it finds the 3 most relevant chunks and sends them along with the question to LLaMA
4. LLaMA generates an answer based on that context

This way the bot only answers from actual college data — no hallucinations.

---

## Running Locally

```bash
git clone https://github.com/yandamurividyasagar-dev/EduReachCollegeChatBot.git
cd EduReachCollegeChatBot
```

**Backend:**
```bash
cd server
npm install
```

Create `server/.env`:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
GROQ_API_KEY=your_groq_key
VAPI_API_KEY=your_vapi_key
VAPI_ASSISTANT_ID=your_assistant_id
VAPI_PHONE_NUMBER_ID=your_phone_number_id
```

```bash
npm run dev
```

**Frontend:**
```bash
cd ../client
npm install
npm run dev
```

Open `http://localhost:5173`

---

## Project Structure

```
EduReachCollegeChatBot/
├── client/
│   └── src/
│       ├── components/     # All UI components
│       ├── pages/          # HomePage, LoginPage, SignupPage
│       ├── context/        # AuthContext
│       ├── services/       # API calls
│       └── data/           # Static content
│
└── server/
    ├── knowledge-base/     # College info text file
    └── src/
        ├── controllers/    # auth, chat, vapi
        ├── services/       # rag.service, vapi.service
        ├── middleware/     # auth middleware
        ├── models/         # User model
        └── routes/         # auth, chat, vapi routes
```

---

## API Routes

| Method | Route | Auth | What it does |
|--------|-------|------|--------------|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Login |
| GET | `/api/auth/me` | Yes | Get current user |
| POST | `/api/chat/message` | No | Send chat message |
| POST | `/api/vapi/call` | Yes | Start AI voice call |

---

## Things I Learned Building This

- RAG is genuinely useful when you need an AI to answer from your own data instead of hallucinating
- Embedding models and vector search are simpler to use than I expected once you understand the concept
- Building voice AI features (Vapi) is surprisingly straightforward — most of the complexity is in the UX, not the integration
- JWT auth across frontend and backend requires careful handling of token storage and interceptors

---

Built by Yandamuri Vidya Sagar
