import type { Message } from "../../types/skill";
import "./Chat.css";

interface Props {
  message: Message;
}

export function MessageBubble({ message }: Props) {
  const isAurora = message.role === "aurora";
  const timestamp = new Date(message.timestamp).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className={`message message--${message.role} boot-in`}>
      <div className="message__header">
        <span className="message__author">
          {isAurora ? "AURORA" : "YOU"}
        </span>
        <span className="message__time">{timestamp}</span>
      </div>
      <div className="message__content">
        {message.content}
      </div>
    </div>
  );
}
