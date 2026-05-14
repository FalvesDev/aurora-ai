import { create } from "zustand";
import type { Skill, Message, DVDStatus } from "../types/skill";

interface AuroraState {
  dvdStatus: DVDStatus;
  activeSkill: Skill | null;
  messages: Message[];
  isThinking: boolean;
  inputValue: string;

  setDvdStatus: (status: DVDStatus) => void;
  setActiveSkill: (skill: Skill | null) => void;
  addMessage: (message: Message) => void;
  updateLastMessage: (content: string) => void;
  setIsThinking: (thinking: boolean) => void;
  setInputValue: (value: string) => void;
  clearMessages: () => void;
}

export const useAuroraStore = create<AuroraState>((set) => ({
  dvdStatus: "absent",
  activeSkill: null,
  messages: [],
  isThinking: false,
  inputValue: "",

  setDvdStatus: (status) => set({ dvdStatus: status }),
  setActiveSkill: (skill) => set({ activeSkill: skill }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  updateLastMessage: (content) =>
    set((state) => {
      const messages = [...state.messages];
      if (messages.length > 0) {
        messages[messages.length - 1] = {
          ...messages[messages.length - 1],
          content,
        };
      }
      return { messages };
    }),
  setIsThinking: (thinking) => set({ isThinking: thinking }),
  setInputValue: (value) => set({ inputValue: value }),
  clearMessages: () => set({ messages: [] }),
}));
