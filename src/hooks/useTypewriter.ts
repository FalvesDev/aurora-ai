import { useState, useEffect, useRef } from "react";

// Animates text character by character with a block cursor (█)
// queues incoming chars and pops them at CHAR_SPEED ms each
const CHAR_SPEED = 16; // ms per character — feels like a fast retro terminal

export function useTypewriter(text: string, isActive: boolean) {
  const [displayed, setDisplayed] = useState("");
  const queue = useRef<string[]>([]);
  const prev = useRef("");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Queue new characters whenever text grows
  useEffect(() => {
    const added = text.slice(prev.current.length);
    prev.current = text;
    if (added) queue.current.push(...added.split(""));
  }, [text]);

  // Tick: pop chars from queue while streaming
  useEffect(() => {
    if (!isActive) {
      if (timer.current) clearInterval(timer.current);
      // Flush remaining queue instantly when streaming ends
      if (queue.current.length > 0) {
        setDisplayed(text);
        queue.current = [];
        prev.current = text;
      }
      return;
    }

    timer.current = setInterval(() => {
      if (queue.current.length === 0) return;
      // Pop up to 2 chars per tick so we don't fall too far behind
      const batch = queue.current.splice(0, 2).join("");
      setDisplayed((d) => d + batch);
    }, CHAR_SPEED);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [isActive, text]);

  // Reset when message is cleared
  useEffect(() => {
    if (!text) {
      setDisplayed("");
      queue.current = [];
      prev.current = "";
    }
  }, [text]);

  return displayed;
}
