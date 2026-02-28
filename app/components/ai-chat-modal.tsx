"use client";

import { useEffect, useState, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

interface AiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReadWithRsvp?: (text: string) => void;
}

export function AiChatModal({ isOpen, onClose, onReadWithRsvp }: AiChatModalProps) {
  const [isVisible, setIsVisible] = useState(isOpen);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const [localInput, setLocalInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    messages: [
      {
        id: "initial-system-greeting",
        role: "assistant" as const,
        parts: [
          {
            type: "text" as const,
            text: "Hello! I'm here to help you generate speed-reading material or summarize text. What would you like to read today?",
          },
        ],
        createdAt: new Date(),
      },
    ],
  });

  if (isOpen && !isVisible) {
    setIsVisible(true);
  }

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isVisible) return null;

  const chatName = "LearnHub";

  const isReady = status === "ready";
  const isStreaming = status === "streaming" || status === "submitted";

  const getMessageText = (msg: any): string => {
    if (msg.parts && msg.parts.length > 0) {
      return msg.parts
        .filter((p: any) => p.type === "text")
        .map((p: any) => p.text)
        .join("");
    }
    return msg.content || msg.text || "";
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localInput.trim() && isReady) {
      sendMessage({ text: localInput });
      setLocalInput("");
    }
  };

  const handleReadWithRsvp = (text: string) => {
    if (onReadWithRsvp) {
      onReadWithRsvp(text);
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-2xl h-[80vh] flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm">
              ✨
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-foreground">{chatName}</h2>
              <p className="text-xs text-zinc-500">Your personal study assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Messages Layout */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((msg: any) => {
            const text = getMessageText(msg);
            return (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex flex-col gap-2 max-w-[85%]">
                  <div
                    className={`rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-foreground text-background rounded-tr-sm"
                        : "bg-zinc-100 dark:bg-zinc-800/50 text-foreground rounded-tl-sm border border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    {text}
                  </div>

                  {/* Read with RSVP button for AI messages */}
                  {msg.role === "assistant" &&
                    msg.id !== "initial-system-greeting" &&
                    text.trim() &&
                    onReadWithRsvp && (
                      <button
                        onClick={() => handleReadWithRsvp(text)}
                        className="self-start flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-accent hover:text-accent/80 bg-accent/5 hover:bg-accent/10 border border-accent/20 rounded-lg transition-all duration-200 group"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="group-hover:scale-110 transition-transform"
                        >
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                        Read with RSVP
                      </button>
                    )}
                </div>
              </div>
            );
          })}

          {status === "submitted" && (
            <div className="flex justify-start">
              <div className="bg-zinc-100 dark:bg-zinc-800/50 text-foreground border border-zinc-200 dark:border-zinc-800 rounded-2xl rounded-tl-sm p-4 w-16 flex items-center justify-center gap-1">
                <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
          <form onSubmit={handleFormSubmit} className="relative flex items-center">
            <input
              type="text"
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              placeholder="Ask anything or request a summary..."
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-sans text-sm shadow-sm"
              disabled={!isReady}
            />
            <button
              type="submit"
              disabled={!localInput.trim() || !isReady}
              className="absolute right-2 p-1.5 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
