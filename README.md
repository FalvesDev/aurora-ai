# Aurora — Local AI with Physical Skill System

> *"Her soul lives in the disc."*

Aurora is a fully offline, local AI assistant powered by [Ollama](https://ollama.com). What makes it unique: **skills are burned onto DVD-R discs**. Insert a disc, Aurora loads that personality. Remove it, she goes silent. No cloud. No subscriptions. No leaks.

---

## The Concept

Each DVD-R disc is a **skill** — a complete personality package containing:
- The AI's behavioral instructions for that domain
- An AES-256 encryption key that unlocks that skill's memories
- Tool definitions for what actions Aurora can take
- Few-shot examples to calibrate her responses

Since DVD-R is **write-once by physical law**, every burned skill is immutable. You cannot patch a soul you've already shipped.

```
Insert DVD  →  Aurora awakens with that skill's personality and memories
Remove DVD  →  Aurora goes dark. Memories re-encrypted. Key gone from RAM.
```

---

## Skills

| Disc | Model | Domain |
|------|-------|--------|
| `DEV` | llama3.1:8b | Code, debugging, architecture, code review |
| `MENTOR` | qwen2.5:7b | Career, strategy, entrepreneurship |
| `COMPANION` | mistral:7b | Emotional support, reflection, active listening |

New skills can be created inside the app and exported as a folder ready to burn.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Desktop GUI | [Tauri 2.0](https://tauri.app) |
| Frontend | React + Vite + TypeScript |
| LLM Runtime | [Ollama](https://ollama.com) (local, offline) |
| Encryption | AES-256-GCM (Rust) |
| DVD Detection | Windows DeviceChange API (Rust) |
| Styling | Retro terminal — green-on-black, CRT scanlines |

---

## Requirements

- Windows 10/11
- [Ollama](https://ollama.com) installed and running
- DVD-R drive (any standard drive)
- ~15 GB free disk space (for the three default models)
- Rust toolchain (for building)
- Node.js 18+

---

## Getting Started

```bash
# 1. Install Ollama models (one-time, requires internet)
ollama pull llama3.1:8b
ollama pull qwen2.5:7b
ollama pull mistral:7b

# 2. Clone and install
git clone https://github.com/FalvesDev/aurora-ai
cd aurora-ai
npm install

# 3. Run in development
npm run tauri dev

# 4. Build
npm run tauri build
```

---

## Creating a New Skill

Open the app → Menu → **Skill Creator**

The Skill Creator guides you through writing the personality, choosing a model, and defining what actions that skill can perform. When you're done, it exports a folder ready to burn onto a DVD-R.

---

## Project Structure

```
aurora-ai/
├── src/                  # React frontend
├── src-tauri/            # Rust backend (Tauri)
├── skills/               # Skill templates (safe to share)
│   ├── skill-dev/
│   ├── skill-mentor/
│   └── skill-companion/
├── memories/             # Encrypted .enc files (gitignored, local only)
└── docs/                 # Architecture and design docs
```

---

## Security Notes

- Memory files (`memories/*.enc`) are **never committed to git**
- Encryption keys exist only on the physical disc and in RAM while the disc is inserted
- No telemetry, no network calls except to local Ollama instance (`localhost:11434`)

---

## Roadmap

- [x] Architecture design
- [ ] Tauri + React + Vite scaffold
- [ ] Ollama API integration + streaming chat
- [ ] Retro terminal UI (CRT effect, per-skill themes)
- [ ] DVD watcher (insert/remove detection)
- [ ] Skill loader (reads disc contents)
- [ ] AES-256 memory encryption
- [ ] Code executor (with user confirmation)
- [ ] Skill Creator tool
- [ ] Burn 3 initial skill discs

---

## License

MIT — fork it, burn it, make it yours.

---

*Built by [@FalvesDev](https://github.com/FalvesDev)*
