"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

const AiChatModal = dynamic(() => import("./ai-chat-modal").then((mod) => mod.AiChatModal), { ssr: false });

interface InputAreaProps {
  onStart: (text: string, wpm: number) => void;
  initialWpm?: number;
}

export function InputArea({ onStart, initialWpm = 400 }: InputAreaProps) {
  const [text, setText] = useState("");
  const [wpm, setWpm] = useState(initialWpm);
  const [isAiChatModalOpen, setIsAiChatModalOpen] = useState(false);

  const handleStart = () => {
    if (!text.trim()) return;
    onStart(text, wpm);
  };

  return (
    <>
      <div className="w-full max-w-2xl flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <div className="relative group">
          <textarea
            className="w-full h-48 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-sans placeholder:text-zinc-400 dark:placeholder:text-zinc-600 shadow-sm"
            placeholder="Paste your text here to start reading..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-medium bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
              {text.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          {/* Quick Draft Chips */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            {[
              {
                label: "Short",
                text: "Speed reading is a skill that allows you to absorb information faster.",
              },
              {
                label: "Medium",
                text: "Rapid Serial Visual Presentation (RSVP) is a method of displaying information (generally text) in which text is displayed piece-by-piece in a fixed focal position. This eliminates the time spent on eye movements.",
              },
              {
                label: "Long",
                text: "Reading is a complex cognitive process of decoding symbols in order to construct or derive meaning. Reading is a means of language acquisition, communication, and of sharing information and ideas. Like all languages, it is a complex interaction between the text and the reader which is shaped by the reader's prior knowledge, experiences, attitude, and language community which is culturally and socially situated. The reading process requires continuous practice, development, and refinement.",
              },
            ].map((sample) => (
              <button
                key={sample.label}
                onClick={() => setText(sample.text)}
                className="text-xs font-medium text-zinc-400 hover:text-accent bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 px-2 py-1 rounded-md transition-colors"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
            <span className="text-sm font-medium text-zinc-500 pl-3">Speed</span>
            <input
              type="range"
              min="200"
              max="1000"
              step="50"
              value={wpm}
              onChange={(e) => setWpm(Number(e.target.value))}
              className="w-32 accent-accent cursor-pointer"
            />
            <span className="text-sm font-mono font-semibold w-12 text-right pr-3">{wpm}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
              onClick={() => setIsAiChatModalOpen(true)}
            >
              ✨ Generate with AI
            </button>
            <button
              className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-black/5"
              onClick={handleStart}
              disabled={!text.trim()}
            >
              Start Reading
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isAiChatModalOpen && (
        <AiChatModal
          isOpen={isAiChatModalOpen}
          onClose={() => setIsAiChatModalOpen(false)}
          onReadWithRsvp={(text) => {
            onStart(text, wpm);
          }}
        />
      )}
    </>
  );
}
