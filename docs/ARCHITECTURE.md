# Aurora — Architecture

## Overview

Aurora is a local AI desktop application where the AI's personality, capabilities, and memories are physically bound to DVD-R discs. The concept: a skill disc is the AI's soul. Insert it — she awakens. Remove it — she goes dark.

---

## Hardware Context

Designed for CPU-only inference (no dedicated GPU required):
- Intel i5-7500T @ 2.7GHz / 4 cores
- 32 GB RAM
- Intel HD Graphics 630 (integrated, not used for inference)
- DVD+R DL drive (8.5 GB capacity per disc)

Model inference runs entirely on CPU via Ollama. Expected throughput: ~4–6 tokens/second.

---

## Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Desktop shell | Tauri 2.0 (Rust) | Lightweight, native, no Chromium bloat vs Electron |
| Frontend | React + Vite + TypeScript | Fast dev, strong ecosystem, official Tauri template |
| LLM runtime | Ollama (local) | CPU inference, model management, streaming API |
| Encryption | AES-256-GCM (Rust) | Memory isolation per skill disc |
| DVD detection | Windows DeviceChange API (Rust) | Native drive insert/remove events |
| State | Zustand | Simple, minimal React state management |

---

## Skill Disc Format

```
/AURORA_SKILL/
├── skill.json          # Metadata: name, model, version, theme, capabilities
├── aurora.key          # AES-256-GCM key (unique per disc, never committed to git)
├── system_prompt.md    # The AI's complete behavioral instructions
├── tools/
│   └── executor.json   # Which actions this skill is allowed to perform
└── examples/
    └── few_shot.json   # Calibration examples for the model
```

The `aurora.key` file is a 32-byte random key generated once at disc creation time. It is burned onto the disc and cannot be changed (DVD-R is write-once).

---

## Memory System

```
memories/
├── dev.enc             # Encrypted conversation history (DEV skill)
├── mentor.enc          # Encrypted conversation history (MENTOR skill)
└── companion.enc       # Encrypted conversation history (COMPANION skill)
```

Encryption flow:
1. Disc inserted → app reads `aurora.key` → decrypts `{skill_id}.enc` → context loaded
2. Disc removed → app encrypts current context → writes `{skill_id}.enc` → key wiped from RAM

Memory files are stored locally and are completely opaque without the physical disc.

---

## Data Flow

```
[DVD Inserted]
      │
      ▼
 DVD Watcher (Rust)
  └─ reads /AURORA_SKILL/
  └─ validates disc format
      │
      ▼
 Skill Loader (Rust)
  └─ parses skill.json
  └─ loads system_prompt.md
  └─ reads aurora.key
      │
      ▼
 Memory Store (Rust + AES-256)
  └─ decrypts memories/{skill_id}.enc
  └─ rebuilds conversation context
      │
      ▼
 Ollama Client (Rust → HTTP)
  └─ POST localhost:11434/api/chat
  └─ streaming response
      │
      ▼
 React Frontend
  └─ renders streaming tokens
  └─ shows skill theme (color, label)
  └─ handles tool calls (code executor, file ops)

[DVD Removed]
  └─ encrypts context → .enc
  └─ wipes key from RAM
  └─ UI → "No disc inserted" state
```

---

## Code Executor

When Aurora generates code or the user asks her to run something:

1. Aurora marks the code block with language tag
2. Frontend renders it with an `[EXECUTE]` button
3. User clicks — confirmation dialog appears with exact command
4. On confirm: Tauri backend runs in isolated temp dir (no network, 30s timeout)
5. stdout/stderr piped back into chat
6. Aurora reads output and continues (debug loop if needed)

---

## Skill Creator

A built-in tool for creating new skill discs:

1. User fills form: name, description, model choice
2. Step-by-step prompt builder for the system prompt (guided by Aurora)
3. Capability selector (what tools this skill can use)
4. App generates complete skill folder
5. User burns folder to DVD-R manually

The creator does NOT write to a disc directly — it creates a ready-to-burn folder.

---

## Phases

| Phase | Content |
|-------|---------|
| 1 | Tauri scaffold + Ollama API + basic chat |
| 2 | Retro terminal UI (CRT, per-skill themes) |
| 3 | DVD watcher + skill loader |
| 4 | AES-256 memory encryption |
| 5 | Code executor |
| 6 | Skill Creator tool |
| 7 | Burn and test 3 initial discs |
| 8 | GitHub polish, README, contribution guide |
