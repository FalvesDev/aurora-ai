import { useEffect } from "react";
import { useAuroraStore } from "./store/aurora";
import { NoSkill } from "./components/NoSkill/NoSkill";
import { DVDStatus } from "./components/DVDStatus/DVDStatus";
import { Chat } from "./components/Chat/Chat";
import { ChatInput } from "./components/ChatInput/ChatInput";
import type { Message } from "./types/skill";
import "./App.css";

const OLLAMA_URL = "http://localhost:11434";

export default function App() {
  const {
    dvdStatus,
    activeSkill,
    messages,
    isThinking,
    inputValue,
    setDvdStatus,
    setActiveSkill,
    addMessage,
    updateLastMessage,
    setIsThinking,
    setInputValue,
  } = useAuroraStore();

  // Apply skill theme to body
  useEffect(() => {
    document.body.setAttribute("data-skill", activeSkill?.skill_id ?? "dev");
  }, [activeSkill]);

  // TODO (Phase 3): Replace with real Tauri DVD watcher event
  // For development, simulate disc present with a DEV skill
  useEffect(() => {
    const devSkill = {
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
    // Comment out the next two lines to see the "No disc" screen
    setActiveSkill(devSkill);
    setDvdStatus("present");
  }, []);

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

    const auroraMsg: Message = {
      id: crypto.randomUUID(),
      role: "aurora",
      content: "",
      timestamp: Date.now(),
    };
    addMessage(auroraMsg);

    try {
      const response = await fetch(`${OLLAMA_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: activeSkill.model,
          messages: [
            // TODO (Phase 3): inject skill system_prompt here
            // TODO (Phase 4): inject encrypted memory context here
            ...messages.map((m) => ({
              role: m.role === "aurora" ? "assistant" : "user",
              content: m.content,
            })),
            { role: "user", content },
          ],
          stream: true,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(Boolean);

        for (const line of lines) {
          try {
            const parsed = JSON.parse(line);
            if (parsed.message?.content) {
              accumulated += parsed.message.content;
              updateLastMessage(accumulated);
            }
          } catch {
            // incomplete JSON chunk, skip
          }
        }
      }
    } catch (err) {
      updateLastMessage(
        "[ Error: Could not reach Ollama. Make sure it is running on localhost:11434 ]"
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
