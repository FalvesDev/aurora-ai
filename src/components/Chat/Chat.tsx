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

  return (
    <div className="chat">
      {messages.length === 0 && (
        <div className="chat__empty boot-in">
          <p className="chat__empty-text">
            <span className="chat__prompt">AURORA</span>
            {" "}Disc loaded. I'm here.
            <span className="cursor" />
          </p>
        </div>
      )}

      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {isThinking && (
        <div className="chat__thinking boot-in">
          <span className="chat__prompt">AURORA</span>
          <span className="chat__thinking-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
