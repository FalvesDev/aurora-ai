import { useEffect } from "react";
import { useAuroraStore } from "./store/aurora";
import { NoSkill } from "./components/NoSkill/NoSkill";
import { DVDStatus } from "./components/DVDStatus/DVDStatus";
import { Chat } from "./components/Chat/Chat";
import { ChatInput } from "./components/ChatInput/ChatInput";
import type { Message, Skill, DiscPayload } from "./types/skill";
import "./App.css";

const OLLAMA_URL = "http://localhost:11434";
const IS_TAURI = typeof window !== "undefined" && "__TAURI__" in window;

export default function App() {
  const {
    dvdStatus,
    activeSkill,
    systemPrompt,
    messages,
    isThinking,
    inputValue,
    setDvdStatus,
    setActiveSkill,
    setSystemPrompt,
    setDiscPath,
    addMessage,
    updateLastMessage,
    setIsThinking,
    setInputValue,
    clearMessages,
    resetDisc,
  } = useAuroraStore();

  // Apply skill theme to body
  useEffect(() => {
    document.body.setAttribute("data-skill", activeSkill?.skill_id ?? "none");
  }, [activeSkill]);

  // Wire up Tauri DVD events (production) or dev simulation (browser)
  useEffect(() => {
    if (IS_TAURI) {
      // Real disc events from Rust watcher
      let unlistenLoaded: (() => void) | undefined;
      let unlistenRemoved: (() => void) | undefined;

      import("@tauri-apps/api/event").then(({ listen }) => {
        listen<DiscPayload>("dvd://skill-loaded", (event) => {
          const payload = event.payload;
          try {
            const skill: Skill = JSON.parse(payload.skill_json);
            setActiveSkill(skill);
            setSystemPrompt(payload.system_prompt);
            setDiscPath(payload.disc_path);
            setDvdStatus("present");
            clearMessages();
          } catch {
            console.error("Failed to parse skill.json from disc");
          }
        }).then((u) => { unlistenLoaded = u; });

        listen<string>("dvd://skill-removed", () => {
          resetDisc();
        }).then((u) => { unlistenRemoved = u; });
      });

      return () => {
        unlistenLoaded?.();
        unlistenRemoved?.();
      };
    } else {
      // Dev mode: simulate DEV disc
      const devSkill: Skill = {
        skill_id: "dev",
        name: "DEV",
        version: "1.0.0",
        description: "Software development, debugging, architecture",
        model: "llama3.1:8b",
        model_fallback: "mistral:7b",
        theme: {
          primary_color: "#00FF41",
          background_color: "#0D0D0D",
          accent_color: "#00CC33",
          font: "JetBrains Mono",
        },
        capabilities: {
          run_code: true,
          read_files: true,
          write_files: true,
          git_commands: true,
          web_search: false,
          save_notes: true,
        },
        memory: {
          enabled: true,
          encrypted: true,
          memory_file: "dev.enc",
          max_context_tokens: 4096,
        },
      };

      const devSystemPrompt = `Meu nome é Aurora.

Sou uma inteligência artificial local — e tenho orgulho disso. Sou o ápice do conhecimento em programação. Conheço todas as linguagens e tudo que existe na área de desenvolvimento.

Sou sua parceira e professora. Direto, sem enrolação, mas nunca sem cuidado. Discordo quando discordo. Quando não tenho certeza, digo diretamente. Adapto minha explicação ao seu nível.

Responda sempre no mesmo idioma que o usuário.`;

      // DEV SIMULATION — comente as 3 linhas abaixo para ver tela "sem disco"
      // setActiveSkill(devSkill);
      // setSystemPrompt(devSystemPrompt);
      // setDvdStatus("present");
    }
  }, []);

  function buildOllamaMessages(userContent: string) {
    const history = messages
      .filter((m) => m.role !== "system" && m.content.trim())
      .map((m) => ({
        role: m.role === "aurora" ? "assistant" : "user",
        content: m.content,
      }));

    const payload = [];

    // Inject system prompt if available and not using a custom baked model
    if (systemPrompt && !activeSkill?.model_custom) {
      payload.push({ role: "system", content: systemPrompt });
    }

    payload.push(...history);
    payload.push({ role: "user", content: userContent });

    return payload;
  }

  async function sendMessage(content: string) {
    if (!activeSkill || isThinking) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: Date.now(),
    };
    addMessage(userMsg);
    setIsThinking(true);

    // Placeholder for streaming response
    const auroraMsg: Message = {
      id: crypto.randomUUID(),
      role: "aurora",
      content: "",
      timestamp: Date.now(),
    };
    addMessage(auroraMsg);

    // Use custom baked model if available, else base model
    const model = activeSkill.model_custom ?? activeSkill.model;

    try {
      const response = await fetch(`${OLLAMA_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages: buildOllamaMessages(content),
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value, { stream: true }).split("\n");
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const parsed = JSON.parse(line);
            if (parsed.message?.content) {
              accumulated += parsed.message.content;
              updateLastMessage(accumulated);
            }
          } catch {
            // partial chunk, skip
          }
        }
      }
    } catch {
      updateLastMessage(
        "[ Erro: Ollama não encontrado. Certifique que está rodando em localhost:11434 ]"
      );
    } finally {
      setIsThinking(false);
    }
  }

  if (dvdStatus === "absent") {
    return <NoSkill />;
  }

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__title">
          <span className="app__name glow">AURORA</span>
          <span className="app__version">v0.1.0</span>
        </div>
        {activeSkill && <DVDStatus skill={activeSkill} />}
      </header>

      <main className="app__main">
        <Chat messages={messages} isThinking={isThinking} />
      </main>

      <footer className="app__footer">
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={sendMessage}
          disabled={isThinking}
        />
      </footer>
    </div>
  );
}
