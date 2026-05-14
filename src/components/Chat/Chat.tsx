import { useEffect, useRef } from "react";
import type { Message } from "../../types/skill";
import { MessageBubble } from "./MessageBubble";
import "./Chat.css";

interface Props {
  messages: Message[];
  isThinking: boolean;
}

export function Chat({ messages, isThinking }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const lastIndex = messages.length - 1;

  return (
    <div className="chat">
      {messages.length === 0 && (
        <div className="chat__welcome">
          <p className="chat__welcome-line">
            AURORA &gt; Disco carregado. Estou aqui.<span className="msg__cursor">█</span>
          </p>
        </div>
      )}

      {messages.map((msg, i) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          isStreaming={isThinking && i === lastIndex}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
