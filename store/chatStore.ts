"use client";

import { create } from "zustand";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  addMessage: (msg: ChatMessage) => void;
  setLoading: (v: boolean) => void;
  reset: () => void;
}

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Hi there! ✨ I'm your LuxeCart beauty consultant. Tell me about your skin concerns and I'll help you find the perfect products!",
};

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  messages: [WELCOME],
  isLoading: false,
  openChat: () => set({ isOpen: true }),
  closeChat: () => set({ isOpen: false }),
  toggleChat: () => set((s) => ({ isOpen: !s.isOpen })),
  addMessage: (msg) =>
    set((s) => ({ messages: [...s.messages, msg] })),
  setLoading: (v) => set({ isLoading: v }),
  reset: () => set({ messages: [WELCOME] }),
}));
