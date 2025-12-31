# StorySparks

**StorySparks** is an AI-powered ad creation platform that helps local businesses generate professional, ready-to-run video ads in under 10 minutes — no marketing agency or editing skills required.

---

## 🧩 Overview

Small business owners (dentists, plumbers, salons, realtors, etc.) can describe their business, upload photos or clips, and StorySparks will automatically:

- Generate a **complete ad script**
- Create **voiceovers**
- Assemble visuals using their assets + AI b-roll
- Add **captions** and **branding**
- Export ads in multiple aspect ratios (9:16, 16:9, 1:1) for TikTok, Instagram, YouTube, etc.

---

## 🧭 User Flow

1. **Landing Page**
   - Product overview + "Generate My Ad" CTA.

2. **Project Creation Wizard**
   - **Step 1:** Business Info (name, category, offer)
   - **Step 2:** Upload Assets (logo, photos, short clips)
   - **Step 3:** Choose Tone (friendly, luxury, urgent)
   - **Step 4:** Click "Generate Ad"

3. **Ad Generation**
   - AI generates:
     - Script
     - Voiceover
     - Storyboard
     - Captions + Video Output

4. **Result Dashboard**
   - View and download final videos.
   - See suggested captions, headlines, and targeting.

---

## ⚙️ Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **TailwindCSS** + **shadcn/ui**
- **React Server Components**
- **UploadThing** or similar file uploader

### Backend
- **Next.js API routes** for endpoints
- **PostgreSQL** + **Prisma ORM**
- **Cloud Storage** for uploads/renders (GCS or S3)
- **Background Jobs** for video rendering

### AI Stack
- **OpenAI API** (GPT-4 for script generation)
- **ElevenLabs** or **OpenAI TTS** for voiceovers
- **FFmpeg Worker** for video composition
- **Optional:** Stock b-roll or image generation models

### Auth
- **NextAuth.js** (Google OAuth or passwordless)

### Deployment
- **Frontend/API:** Vercel
- **Workers:** Cloud Run / Render
- **Database:** Neon / Supabase
- **Storage:** GCS or Supabase buckets

---

## 🏗️ Project Structure

```plaintext
storysparks/
├── README.md
├── package.json
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── project/[id]/page.tsx
│   │   └── api/
│   │       ├── generate/route.ts
│   │       ├── upload/route.ts
│   │       └── auth/[...nextauth]/route.ts
│   ├── components/
│   │   ├── UI/
│   │   ├── Wizard/
│   │   └── UploadSection.tsx
│   └── lib/
│       ├── ai/
│       │   ├── scriptGenerator.ts
│       │   ├── voiceoverGenerator.ts
│       │   ├── storyboardGenerator.ts
│       │   └── campaignTipsGenerator.ts
│       ├── video/compositor.ts
│       ├── db.ts
│       └── auth.ts
├── public/
│   ├── logo.svg
│   └── assets/
└── .env.local
```

---

## 🧮 Data Model (Prisma)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  image     String?
  projects  Project[]
  createdAt DateTime @default(now())
}

model Project {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id])
  businessName    String
  businessType    String
  location        String
  offer           String?
  tone            String
  targetAudience  String?
  status          ProjectStatus @default(DRAFT)
  scriptText      String?
  storyboardJson  Json?
  voiceoverUrl    String?
  videoUrl916     String?
  videoUrl169     String?
  videoUrl11      String?
  captionsFileUrl String?
  campaignTips    String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum ProjectStatus {
  DRAFT
  GENERATING
  READY
  ERROR
}

model Asset {
  id         String   @id @default(cuid())
  projectId  String
  project    Project  @relation(fields: [projectId], references: [id])
  url        String
  type       AssetType
  createdAt  DateTime @default(now())
}

enum AssetType {
  LOGO
  PHOTO
  VIDEO
}
```

---

## 🧠 API Endpoints

The following endpoints define the StorySparks API for handling project management, file uploads, and AI-driven ad generation.

### Core Endpoints

| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/api/generate` | POST | Trigger ad generation for a project |
| `/api/project/:id` | GET | Retrieve details of a specific project |
| `/api/projects` | GET | List all user projects |
| `/api/upload` | POST | Upload image, logo, or video |
| `/api/auth/[...nextauth]` | POST | Handle authentication |
| `/api/project/:id` | DELETE | Delete a project |

### API Status Codes

| Code | Meaning |
|------|----------|
| **200 OK** | Successful GET or DELETE |
| **201 Created** | Resource successfully created |
| **202 Accepted** | Generation process started |
| **400 Bad Request** | Invalid or missing parameters |
| **401 Unauthorized** | User not authenticated |
| **404 Not Found** | Project or resource not found |
| **500 Internal Server Error** | Unexpected failure |

### Generation Pipeline

1. Set project status to `GENERATING`
2. Generate script → save to database
3. Generate storyboard → save
4. Generate voiceover → save
5. Render video → save URLs
6. Generate campaign tips → save
7. Mark project as `READY`

---

## 🧰 Developer Setup

### Quick Start

#### Option 1: Docker Compose (Recommended)

1. **Clone and setup**
   ```bash
   git clone <repo_url>
   cd storysparks
   cp env.example .env.local
   # Edit .env.local with your API keys
   ```

2. **Start everything with Docker**
   ```bash
   # Interactive setup script
   ./docker-setup.sh
   
   # OR manually
   docker-compose -f docker-compose.dev.yml up -d
   ```

3. **Run database migrations**
   ```bash
   docker exec storysparks-web npx prisma migrate dev --name init
   ```

4. **Access applications**
   - Main App: http://localhost:3000
   - Marketing Site: http://localhost:5173
   - API Health: http://localhost:4000/health
   - Prisma Studio: http://localhost:5555

#### Option 2: Manual Setup

1. **Clone and install dependencies**
   ```bash
   git clone <repo_url>
   cd storysparks
   npm install
   ```

2. **Set up database and Redis**
   ```bash
   # PostgreSQL (choose one)
   createdb storysparks
   # OR with Docker: docker run --name storysparks-postgres -e POSTGRES_DB=storysparks -p 5432:5432 -d postgres:15
   
   # Redis (choose one)
   brew install redis && brew services start redis
   # OR with Docker: docker run --name storysparks-redis -p 6379:6379 -d redis:7
   ```

3. **Configure environment**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your database URL and API keys
   ```

4. **Run database migrations**
   ```bash
   cd packages/prisma
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Start development servers**
   ```bash
   # Terminal 1: Web app
   npm run dev:web
   
   # Terminal 2: API service  
   npm run dev:api
   
   # Terminal 3: Marketing site
   npm run dev:marketing
   ```

### Detailed Setup

For comprehensive setup instructions, troubleshooting, and development commands, see **[SETUP.md](./SETUP.md)**.

---

## 🤖 Development Tools

### AI-Assisted Development with Codex Agents
Use **OpenAI Codex agents** to:
- Scaffold UI components (`ProjectCard`, `UploadSection`)
- Generate Prisma models and API routes
- Implement upload API and authentication flow
- Fetch `ffmpeg`, `NextAuth`, and `UploadThing` examples
- Generate boilerplate for API handlers and background workers
- Research TTS and OpenAI API integration snippets

### Example Development Prompts
```text
"Generate /api/generate route that triggers mock AI pipeline."
"Create React component to preview script + voiceover + video."
"Implement polling logic to fetch project status until READY."
"Fetch NextAuth.js configuration examples for Google OAuth."
"Generate FFmpeg video composition worker with TypeScript."
```

---

## 🚀 Roadmap

| Milestone | Description |
|------------|--------------|
| **Phase 0** | Auth + Dashboard + CRUD |
| **Phase 1** | Upload flow + mock generation |
| **Phase 2** | Real LLM script generation |
| **Phase 3** | Voiceover + video rendering |
| **Phase 4** | Campaign tips + UX polish |
| **Phase 5** | Deploy to production (Vercel + Cloud Run) |

---

## 🔒 Security

- Projects are user-scoped (`project.userId === session.user.id`)
- Private storage for uploaded assets
- Signed URLs for downloads
- Basic rate limiting on `/api/generate`

---

## 💸 Pricing (Future)

| Plan | Price | Features |
|------|--------|-----------|
| **Starter** | $49/mo | 5 ads/month, standard voices |
| **Pro** | $99/mo | 20 ads/month, premium voices, targeting tips |
| **Agency** | $249/mo | Multi-client access, bulk rendering, white-label |

---

## 🎯 MVP Success Metric

✅ A user logs in → describes their business → uploads assets → clicks **"Generate"** → receives a ready-to-post ad video and caption.
