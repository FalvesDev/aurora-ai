import { useRef, type KeyboardEvent } from "react";
import "./ChatInput.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ value, onChange, onSubmit, disabled }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const trimmed = value.trim();
      if (trimmed && !disabled) {
        onSubmit(trimmed);
        onChange("");
      }
    }
  }

  return (
    <div className="chat-input">
      <span className="chat-input__prompt">&gt;</span>
      <textarea
        ref={textareaRef}
        className="chat-input__field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={disabled ? "Aurora está pensando..." : "Digite uma mensagem... (Enter envia · Shift+Enter nova linha)"}
        disabled={disabled}
        rows={1}
      />
    </div>
  );
}
