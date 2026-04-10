# 🎓 EduReach — Agentic College Chatbot

<div align="center">

![EduReach Banner](https://res.cloudinary.com/dpvbaiyus/image/upload/v1772014920/campus_lnna9a.avif)

**Your Gateway to Smarter Education Decisions**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-7B1E2B?style=for-the-badge)](https://your-deployment-link.com)
[![Demo Video](https://img.shields.io/badge/▶_Demo_Video-Watch_Now-FF0000?style=for-the-badge)](https://your-demo-video-link.com)
[![GitHub](https://img.shields.io/badge/GitHub-Source_Code-181717?style=for-the-badge&logo=github)](https://github.com/yandamurividyasagar-dev/EduReachCollegeChatBot)

![Node.js](https://img.shields.io/badge/Node.js-v25-339933?style=flat-square&logo=node.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)

</div>

---

## 📺 Demo Video

> 🎬 **[Click here to watch the full demo video](https://your-demo-video-link.com)**

<!-- Replace the link above with your actual demo video URL (YouTube, Loom, etc.) -->

---

## 🌐 Live Deployment

> 🚀 **[https://your-deployment-link.com](https://your-deployment-link.com)**

<!-- Replace with your actual deployed URL (Vercel, Render, Railway, etc.) -->

---

## 📖 What Is EduReach?

Have you ever visited a college website and struggled to find simple answers — like fee structures, admission deadlines, or placement stats?

**EduReach** solves this. It's a full-stack AI-powered platform that gives students instant, accurate answers about a college — 24/7.

### The Problem
| What Students Do Now | The Problem |
|---|---|
| Browse college websites | Information overload, hard to find specifics |
| Call the admissions office | Limited hours, long wait times |
| Visit campus in person | Time-consuming, not always possible |
| Ask friends/seniors | May not have accurate or updated info |

### The Solution ✅
EduReach provides:
- 🤖 **Agentic RAG Chatbot** — Searches the college knowledge base and generates accurate, contextual answers
- 📞 **AI Voice Counselor** — "Ava" calls you on the phone and answers questions in natural conversation
- 🔐 **JWT Authentication** — Secure login/signup that gates premium features
- 🎨 **Beautiful UI** — A stunning homepage with courses, mentors, placements, and campus life

---

## ✨ Features

### 🔐 Authentication
- Register / Login with JWT tokens
- Protected routes (chat & voice gated for logged-in users)
- Password hashing with bcryptjs
- Persistent sessions via localStorage

### 🤖 AI Chat Agent (RAG)
- Powered by **Groq (LLaMA 3.3 70B)** for blazing-fast responses
- Knowledge base stored and searched via **MongoDB Atlas**
- Retrieval-Augmented Generation (RAG) for accurate, grounded answers
- Quick question buttons for common queries

### 📞 AI Voice Agent (Vapi)
- Outbound phone calls powered by **Vapi AI**
- AI counselor "Ava" speaks naturally about courses, fees, placements
- Personalized greetings with student name and preferred course

### 🏠 Homepage
| Feature | Visitor | Logged-in Student |
|---|---|---|
| Hero, About, Courses, Mentors | ✅ Full access | ✅ Full access |
| Student Life, Events, Placements | ❌ Hidden | ✅ Visible |
| AI Chat Bot | ↪ Redirects to Login | ✅ Unlimited messages |
| AI Voice Call | ↪ Redirects to Login | ✅ Call popup |
| Signup Popup | Auto-appears at Mentors | ❌ Never appears |

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js v25 + Express | REST API server |
| TypeScript | Type safety |
| MongoDB Atlas | Database (users + knowledge base) |
| Mongoose | ODM for user data |
| Groq SDK (LLaMA 3.3 70B) | AI chat responses |
| LangChain | RAG pipeline (document loading, splitting) |
| JWT + bcryptjs | Authentication & password hashing |
| Vapi API | AI voice calls |

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS v4 | Styling with custom maroon/cream theme |
| Axios | HTTP client with JWT interceptor |
| React Router DOM | Client-side routing |
| Lucide React | Icons |
| React Hot Toast | Notifications |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   FRONTEND (React + TS)                  │
│                                                          │
│  Homepage  │  Login/Signup  │  ChatDrawer  │  CallPopup │
│                        │                                 │
│              Axios (JWT interceptor)                     │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                  BACKEND (Express + TS)                  │
│                                                          │
│  POST /api/auth/register   POST /api/auth/login          │
│  GET  /api/auth/me         POST /api/chat/message        │
│  POST /api/vapi/call                                     │
│                        │                                 │
│         ┌──────────────┼──────────────┐                  │
│         ▼              ▼              ▼                  │
│    MongoDB Atlas    Groq API       Vapi API              │
│  (users + chunks)  (LLaMA 3.3)   (voice calls)          │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v24+ 
- MongoDB Atlas account (free tier)
- Groq API key (free) — [console.groq.com](https://console.groq.com)
- Vapi API key (optional, for voice calls) — [vapi.ai](https://vapi.ai)

### 1. Clone the Repository
```bash
git clone https://github.com/yandamurividyasagar-dev/EduReachCollegeChatBot.git
cd EduReachCollegeChatBot
```

### 2. Setup the Backend
```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edureach_chatbot
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
GROQ_API_KEY=your_groq_api_key_here

# Optional — for AI voice calls
VAPI_API_KEY=your_vapi_api_key_here
VAPI_ASSISTANT_ID=your_vapi_assistant_id_here
VAPI_PHONE_NUMBER_ID=your_vapi_phone_number_id_here
```

Start the backend:
```bash
npm run dev
```

### 3. Setup the Frontend
```bash
cd ../client
npm install
npm run dev
```

### 4. Open the App
Visit **[http://localhost:5173](http://localhost:5173)** 🎉

---

## 📁 Project Structure

```
EduReachCollegeChatBot/
├── client/                          # React Frontend
│   └── src/
│       ├── components/              # UI Components
│       │   ├── ChatDrawer.tsx       # Chat interface
│       │   ├── FloatingChatButton.tsx
│       │   ├── CallPopup.tsx        # Voice call UI
│       │   ├── Navbar.tsx
│       │   ├── HeroSection.tsx
│       │   └── ...more components
│       ├── pages/
│       │   ├── HomePage.tsx
│       │   ├── LoginPage.tsx
│       │   └── SignupPage.tsx
│       ├── context/
│       │   └── AuthContext.tsx      # Global auth state
│       ├── services/
│       │   ├── api.ts               # Axios instance
│       │   ├── auth.service.ts
│       │   ├── chat.service.ts
│       │   └── vapi.service.ts
│       └── data/
│           └── content.ts           # All static content
│
└── server/                          # Express Backend
    ├── knowledge-base/
    │   └── edureach-knowledge.txt   # College info for RAG
    └── src/
        ├── config/
        │   └── database.config.ts
        ├── controllers/
        │   ├── auth.controller.ts
        │   ├── chat.controller.ts
        │   └── vapi.controller.ts
        ├── services/
        │   ├── rag.service.ts       # RAG pipeline
        │   └── vapi.service.ts
        ├── middleware/
        │   └── auth.middleware.ts
        ├── models/
        │   └── user.model.ts
        └── routes/
            ├── auth.routes.ts
            ├── chat.routes.ts
            └── vapi.routes.ts
```

---

## 🧠 How RAG Works in EduReach

```
INDEXING (runs once at startup):
  Load .txt → Split into chunks → Store in MongoDB

QUERYING (every chat message):
  User question → Find 3 relevant chunks → Send to LLaMA → Answer
```

| Step | What Happens |
|---|---|
| **Load** | Read `edureach-knowledge.txt` |
| **Split** | Break into ~1000 char chunks (200 overlap) |
| **Store** | Save chunks to MongoDB `knowledge_base` collection |
| **Retrieve** | Find top 3 most relevant chunks for each query |
| **Generate** | LLaMA 3.3 70B generates answer using retrieved context |

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Login + get JWT |
| GET | `/api/auth/me` | 🔒 Protected | Get current user |
| POST | `/api/chat/message` | Public | Send chat message |
| POST | `/api/vapi/call` | 🔒 Protected | Start AI voice call |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Yandamuri Vidya Sagar**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat-square&logo=linkedin)](https://linkedin.com/in/your-profile)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/yandamurividyasagar-dev)

---

<div align="center">

⭐ **Star this repo if you found it helpful!** ⭐

Made with ❤️ using React, Node.js, LangChain & Groq

</div>
