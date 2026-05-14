export interface SkillTheme {
  primary_color: string;
  background_color: string;
  accent_color: string;
  font: string;
}

export interface SkillCapabilities {
  run_code: boolean;
  read_files: boolean;
  write_files: boolean;
  git_commands: boolean;
  web_search: boolean;
  save_notes: boolean;
  export_pdf?: boolean;
  journal?: boolean;
}

export interface SkillMemoryConfig {
  enabled: boolean;
  encrypted: boolean;
  memory_file: string;
  max_context_tokens: number;
}

export interface Skill {
  skill_id: string;
  name: string;
  version: string;
  description: string;
  model: string;
  model_fallback: string;
  model_custom?: string; // set after ollama create is run from Modelfile
  theme: SkillTheme;
  capabilities: SkillCapabilities;
  memory: SkillMemoryConfig;
}

export interface Message {
  id: string;
  role: "user" | "aurora" | "system";
  content: string;
  timestamp: number;
  thinking?: string;
  code_blocks?: CodeBlock[];
}

export interface CodeBlock {
  id: string;
  language: string;
  code: string;
  output?: string;
  status: "pending" | "waiting_confirm" | "running" | "done" | "error";
}

export type DVDStatus = "present" | "absent" | "loading";

// Payload emitted by the Rust DVD watcher
export interface DiscPayload {
  skill_json: string;
  system_prompt: string;
  has_key: boolean;
  disc_path: string;
}
