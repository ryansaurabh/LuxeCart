"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, ShoppingBag, X } from "lucide-react";
import { useChatStore } from "@/store/chatStore";
import { products } from "@/data/products";
import { useState } from "react";

const quickReplies = [
  "I have dry skin",
  "Best anti-aging products?",
  "Gift recommendations",
  "What's on sale?",
];

// Build a map of product names → link for rendering mentions in AI replies.
function renderWithLinks(text: string) {
  const parts: Array<string | { id: string; name: string }> = [text];
  const sorted = [...products].sort(
    (a, b) => b.name.length - a.name.length
  );
  for (const p of sorted) {
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (typeof part !== "string") continue;
      const idx = part.toLowerCase().indexOf(p.name.toLowerCase());
      if (idx === -1) continue;
      const before = part.slice(0, idx);
      const matched = part.slice(idx, idx + p.name.length);
      const after = part.slice(idx + p.name.length);
      parts.splice(
        i,
        1,
        before,
        { id: p.id, name: matched },
        after
      );
      i += 1;
    }
  }

  return parts
    .filter((p) => (typeof p === "string" ? p.length > 0 : true))
    .map((p, i) =>
      typeof p === "string" ? (
        <span key={i}>{p}</span>
      ) : (
        <Link
          key={i}
          href={`/product/${p.id}`}
          className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-2 hover:text-accent"
        >
          {p.name}
        </Link>
      )
    );
}

export default function ChatWidget() {
  const isOpen = useChatStore((s) => s.isOpen);
  const toggleChat = useChatStore((s) => s.toggleChat);
  const closeChat = useChatStore((s) => s.closeChat);
  const messages = useChatStore((s) => s.messages);
  const addMessage = useChatStore((s) => s.addMessage);
  const isLoading = useChatStore((s) => s.isLoading);
  const setLoading = useChatStore((s) => s.setLoading);

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const send = async (textOverride?: string) => {
    const text = (textOverride ?? input).trim();
    if (!text || isLoading) return;
    setInput("");
    addMessage({ role: "user", content: text });
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: text }],
        }),
      });
      const data = await res.json();
      if (data.message) {
        addMessage({ role: "assistant", content: data.message });
      } else {
        addMessage({
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please try again in a moment!",
        });
      }
    } catch {
      addMessage({
        role: "assistant",
        content:
          "I'm having trouble connecting right now. Please try again in a moment!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleChat}
        aria-label="Open shopping assistant"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-hover transition-transform hover:scale-105"
      >
        <div className="relative">
          <ShoppingBag size={20} />
          <Sparkles
            size={12}
            className="absolute -right-2 -top-2 text-accent"
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-50 flex h-[580px] w-[calc(100%-2.5rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-hover"
          >
            <header className="flex items-center justify-between border-b border-ink/10 bg-ink px-5 py-4 text-white">
              <div>
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  <Sparkles size={14} className="text-accent" />
                  LuxeCart Shopping Assistant
                </p>
                <p className="text-[11px] text-white/60">
                  Powered by Gemini
                </p>
              </div>
              <button
                onClick={closeChat}
                aria-label="Close chat"
                className="text-white/70 hover:text-white"
              >
                <X size={18} />
              </button>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-5 py-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-ink text-white"
                        : "bg-bg-warm text-ink"
                    }`}
                  >
                    {m.role === "assistant"
                      ? renderWithLinks(m.content)
                      : m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl bg-bg-warm px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -3, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                        className="h-1.5 w-1.5 rounded-full bg-muted"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-2 px-5 pb-2">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs hover:border-ink"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-ink/10 p-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your skin..."
                className="flex-1 rounded-full bg-bg-warm px-4 py-2.5 text-sm outline-none focus:bg-white focus:ring-1 focus:ring-ink"
                disabled={isLoading}
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={isLoading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition-opacity disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
