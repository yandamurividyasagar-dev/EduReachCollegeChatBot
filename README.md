 # EduReach — Agentic College Chatbot

A full-stack AI web app where students can chat with a bot or get an actual phone call from an AI counselor to learn about a college — fees, courses, admissions, placements — instantly, without hunting through pages.

**Live:** https://your-deployment-link.com  
**Repo:** https://github.com/yandamurividyasagar-dev/EduReachCollegeChatBot

## Demo

https://github.com/user-attachments/assets/8196ac38-de07-4f96-8107-0153bf246c08

---

## The Problem I Was Solving

College websites are overwhelming. Students waste time clicking through dozens of pages just to find a fee structure or admission deadline. I wanted to fix that with a single conversational interface that knows everything about the college.

---

## Key Features

**AI Chat (RAG-based)**  
Students type a question — the bot searches a custom knowledge base I built with all the college data, pulls the most relevant chunks, and generates an accurate answer using LLaMA 3.3 70B. No hallucinations because it only answers from real data.

**AI Voice Counselor (Vapi)**  
Students enter their phone number and topic. An AI agent called "Ava" literally calls them and has a real phone conversation about the college. Built with Vapi's outbound calling API.

**Auth-gated access**  
Visitors can browse the homepage. Chat and voice features unlock after signup — handled with JWT on the backend and an Axios interceptor on the frontend.

---

## Tech Stack

| Side | Stack |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS v4, React Router, Axios |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB Atlas |
| AI | Groq API (LLaMA 3.3 70B), LangChain (RAG pipeline) |
| Voice | Vapi (outbound AI calls) |
| Auth | JWT, bcryptjs |

---

## How RAG Works Here

```
server startup  →  load knowledge .txt  →  split into chunks  →  store in MongoDB
user question   →  find top 3 chunks   →  send to LLaMA     →  return answer
```

I wrote the college knowledge base as a plain text file. LangChain handles splitting it and storing chunks. On every chat message, it finds the most relevant chunks and passes them as context to the LLM — so answers are always grounded in real data.

---

## Running Locally

```bash
git clone https://github.com/yandamurividyasagar-dev/EduReachCollegeChatBot.git
```

**Backend**
```bash
cd server && npm install
```

`server/.env`
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

**Frontend**
```bash
cd client && npm install && npm run dev
```

Visit `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | No | Sign up |
| POST | `/api/auth/login` | No | Log in |
| GET | `/api/auth/me` | Yes | Get user profile |
| POST | `/api/chat/message` | No | Chat with AI |
| POST | `/api/vapi/call` | Yes | Start AI voice call |

---

## What I Picked Up

- How RAG actually works end-to-end — not just the theory but building the full pipeline from text file to chat response
- Why vector search makes sense for this kind of problem and how to set it up on MongoDB Atlas
- Integrating a voice AI API and handling the different call states in the UI (form → calling → done → error)
- Managing auth state across a React app with context, interceptors, and protected routes

---

Built by Yandamuri Vidya Sagar
