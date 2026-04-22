"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState, ReactNode } from "react";

interface Item {
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
}

interface Props {
  items: Item[];
}

export default function Accordion({ items }: Props) {
  const [open, setOpen] = useState<Set<number>>(
    new Set(items.flatMap((it, i) => (it.defaultOpen ? [i] : [])))
  );

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between py-4 text-left text-sm font-medium"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              {isOpen ? <Minus size={16} /> : <Plus size={16} />}
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 pr-2 text-sm leading-relaxed text-muted">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
