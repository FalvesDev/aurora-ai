import { useTypewriter } from "../../hooks/useTypewriter";
import type { Message } from "../../types/skill";
import "./Chat.css";

interface Props {
  message: Message;
  isStreaming?: boolean;
}

export function MessageBubble({ message, isStreaming = false }: Props) {
  const isAurora = message.role === "aurora";
  const animated = useTypewriter(message.content, isStreaming && isAurora);

  const displayText = isStreaming && isAurora ? animated : message.content;

  const time = new Date(message.timestamp).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className={`msg msg--${message.role}`}>
      <div className="msg__meta">
        <span className="msg__author">
          {isAurora ? "AURORA" : "VOCÊ"}
        </span>
        <span className="msg__time">{time}</span>
      </div>

      <div className="msg__body">
        <span className="msg__prompt">&gt;&nbsp;</span>
        <span className="msg__text">
          {/* empty + streaming = waiting for first token */}
          {!displayText && isStreaming && isAurora
            ? <span className="msg__cursor">█</span>
            : <>
                {displayText}
                {isStreaming && isAurora && <span className="msg__cursor">█</span>}
              </>
          }
        </span>
      </div>
    </div>
  );
}
