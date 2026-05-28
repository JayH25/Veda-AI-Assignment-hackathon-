# 🌌 VedaAI - Smart Assessment Creator

VedaAI is a sophisticated AI-powered platform designed for educators to generate high-fidelity, professional question papers in minutes. Built for hackathon excellence, it features a seamless 3-step creation wizard, real-time AI generation tracking, and a "ready-to-print" high-quality output format.

![Light/Dark Mode](https://img.shields.io/badge/Mode-Light%20%26%20Dark-blue)
![Hackathon Ready](https://img.shields.io/badge/Status-Hackathon--Ready-brightgreen)

## ✨ Features

- **3-Step Wizard**: Streamlined configuration for Question Types, Advanced Context, and Deadlines.
- **High-Fidelity Output**: Generates assessment papers formatted like professional school exams (Delhi Public School branding included).
- **Light/Dark Mode**: Modern, glass-morphic UI that adapts to user preference.
- **Resilient Architecture**: Integrated BullMQ (Redis) for background processing with an automatic direct-processing fallback for zero-config environments.
- **Print Optimization**: Dedicated CSS styling for "Download as PDF" or "Print" actions to ensure papers look perfect on A4.

---

## 🚀 Quick Start (Zero Config)

The project is pre-configured with **Hardcoded Sandbox Credentials** (MongoDB Atlas & Upstash Redis) to allow immediate testing without editing `.env` files.

### 1. Clone the Repository
```bash
git clone https://github.com/JayH25/Veda-AI-Assignment-hackathon-.git
cd Veda-AI-Assignment-hackathon-
```

### 2. Start the Backend
```bash
cd ai-assessment-creator/backend
npm install
npm run dev
```
*Port: `http://localhost:5000`*

### 3. Start the Frontend
```bash
cd ../frontend
npm install
npm run dev
```
*Port: `http://localhost:3000`*

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (Turbopack), Tailwind CSS 4, Zustand (State Mgmt), Lucide Icons, React Hot Toast.
- **Backend**: Node.js, Express, TypeScript, Mongoose.
- **Processing**: BullMQ (Redis) for AI job queuing.
- **Database**: MongoDB Atlas.

---

## 📸 Workflow

1. **Configure**: Select question types (MCQ, Short, Long) and assign marks per section.
2. **Context**: Provide AI instructions (e.g., "Focus on Photosynthesis for Grade 5").
3. **Generate**: AI builds the paper in the background.
4. **Print**: Preview the beautifully formatted paper and click "Print Paper" to save as PDF.

---

## 🤝 Project Structure

```
VedaAI-Hackathon/
├── ai-assessment-creator/
│   ├── backend/         # Node.js + Express + BullMQ
│   │   ├── src/config/ # DB & Redis Configs
│   │   ├── src/models/ # MongoDB Schemas
│   │   └── src/routes/ # AI processing logic
│   └── frontend/        # Next.js 15 + Tailwind 4
│       ├── src/app/    # App Router & Styles
│       ├── src/components/ # UI Components
│       └── src/store/  # Zustand Global State
```

---

## 📝 License

Created for the **Veda AI Hackathon**. Feel free to explore and build upon it!
