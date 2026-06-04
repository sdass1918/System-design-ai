# System Design AI 🧠

An interactive system design learning platform powered by AI. Build architecture diagrams on a visual canvas and get real-time Socratic tutoring from an LLM to improve your designs.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.3-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?logo=vercel&logoColor=white)

---

## ✨ Features

- **Interactive Canvas** — Drag-and-drop system design diagrams using [React Flow](https://reactflow.dev/). Add components like Client, Server, Database, Cache, Load Balancer, CDN, Queue, and API Gateway.
- **AI Tutor** — Sends your diagram (as JSON) to an LLM via [NVIDIA NIM API](https://build.nvidia.com/) and receives guided feedback.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Course Page                      │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────┐ │
│  │Requirements│  │   Canvas    │  │  AI Tutor     │ │
│  │  Panel    │  │ (ReactFlow) │  │  Chat Panel   │ │
│  └──────────┘  └──────┬───────┘  └───────┬───────┘ │
│                       │                  │         │
│                       │   toObject()     │         │
│                       └──────────────────┘         │
└─────────────────────────────────────────────────────┘
                                    │
                                    │ POST /api/chat
                                    ▼
                        ┌───────────────────┐
                        │  Vercel Edge Fn   │
                        │  (api/chat.js)    │
                        └────────┬──────────┘
                                 │
                                 │ Authorization: Bearer <key>
                                 ▼
                        ┌───────────────────┐
                        │  NVIDIA NIM API   │
                        │  (LLaMA 3.3 70B) │
                        └───────────────────┘
```

---

## 📁 Project Structure

```
System-design-ai/
├── api/
│   └── chat.js              # Vercel Edge Function (proxies to NVIDIA NIM)
├── src/
│   ├── Components/
│   │   ├── Canvas.tsx        # ReactFlow diagram canvas
│   │   ├── ChatPanel.tsx     # AI tutor chat interface
│   │   └── Requirements.tsx  # Functional & non-functional requirements
│   ├── services/
│   │   └── aiService.ts      # LLM API client + Socratic system prompt
│   ├── App.tsx               # Landing page with login
│   ├── Course.tsx            # 3-panel course layout
│   ├── Dashboard.tsx         # Course selection dashboard
│   └── main.tsx              # Router setup
├── vercel.json               # Vercel routing config
├── vite.config.ts            # Vite config with dev proxy
└── .env                      # API key (local only, git-ignored)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- An [NVIDIA NIM API key](https://build.nvidia.com/)

### Local Development

1. **Clone the repo**

   ```bash
   git clone https://github.com/sdass1918/System-design-ai.git
   cd System-design-ai
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Add your API key**

   Create a `.env` file in the project root:

   ```env
   VITE_NVIDIA_API_KEY=nvapi-your-key-here
   ```

4. **Start the dev server**

   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:5173](http://localhost:5173), log in, pick a course, and start designing!

---

## 🌐 Deployment (Vercel)

The app is configured for seamless Vercel deployment:

1. **Connect your GitHub repo** on [Vercel](https://vercel.com/)
2. **Add the environment variable** in Vercel Dashboard:

   ```
   Settings → Environment Variables → Add:

   Name:  NVIDIA_API_KEY
   Value: nvapi-your-key-here
   ```

   > ⚠️ Use `NVIDIA_API_KEY` (without `VITE_` prefix) — the serverless function reads `process.env.NVIDIA_API_KEY`

3. **Deploy** — Vercel auto-deploys on push to `main`

### How it works in production

- Browser calls `/api/chat` → Vercel Edge Function (`api/chat.js`)
- The edge function adds the `Authorization` header and forwards to NVIDIA NIM
- No CORS issues, API key stays server-side

---

## 🤖 AI Tutor — How It Works

When you click **"✨ Analyze Diagram"**:

1. `ReactFlow.toObject()` extracts all nodes & edges as JSON
2. The JSON is wrapped in a structured prompt and sent to `meta/llama-3.3-70b-instruct`
3. The LLM responds using the **Socratic method**:
   - Acknowledges the current architecture
   - Asks probing questions ("What if this service goes down?")
   - Guides the user to discover improvements
   - Only gives direct answers after hints

---

## 🛠️ Tech Stack

| Layer    | Technology                           |
| -------- | ------------------------------------ |
| Frontend | React 19, TypeScript, Tailwind CSS 4 |
| Canvas   | React Flow (`@xyflow/react`)         |
| Bundler  | Vite 8                               |
| LLM      | Meta LLaMA 3.3 70B via NVIDIA NIM    |
| Hosting  | Vercel (static + edge functions)     |
| Routing  | React Router DOM v7                  |

---

## 📄 License

This project is for educational purposes.
