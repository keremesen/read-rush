"use client";

import { useState } from "react";
import { Hero } from "./components/hero";
import { InputArea } from "./components/input-area";
import { RsvpReader } from "./components/rsvp-reader";

type AppState = "idle" | "reading" | "completed";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [text, setText] = useState("");
  const [wpm, setWpm] = useState(400);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStart = (inputText: string, selectedWpm: number) => {
    setText(inputText);
    setWpm(selectedWpm);
    setAppState("reading");
    setIsPlaying(true);
  };

  const handleComplete = () => {
    setIsPlaying(false);
    setAppState("completed");
  };

  const handleReset = () => {
    setAppState("idle");
    setIsPlaying(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 relative overflow-hidden">
      {/* Background Gradient Spot */}
      <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[800] h-[800] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      {appState === "idle" && (
        <div className="z-10 w-full max-w-4xl flex flex-col items-center gap-12">
          <Hero />
          <InputArea onStart={handleStart} />

          {/* Minimal Preview / Feature List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-2xl mt-12 opacity-60">
            <div className="flex flex-col gap-2 p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white/50 dark:bg-zinc-900/50">
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-lg">
                ⚡
              </div>
              <h3 className="font-semibold text-sm">Instant Focus</h3>
              <p className="text-xs text-zinc-500">No distractions. Just the words you need to read.</p>
            </div>
            <div className="flex flex-col gap-2 p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white/50 dark:bg-zinc-900/50">
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-lg">
                🧠
              </div>
              <h3 className="font-semibold text-sm">Better Retention</h3>
              <p className="text-xs text-zinc-500">RSVP reduces sub-vocalization and improves focus.</p>
            </div>
            <div className="flex flex-col gap-2 p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white/50 dark:bg-zinc-900/50">
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-lg">
                🌑
              </div>
              <h3 className="font-semibold text-sm">Dark Mode</h3>
              <p className="text-xs text-zinc-500">Easy on the eyes, day or night.</p>
            </div>
          </div>
        </div>
      )}

      {(appState === "reading" || appState === "completed") && (
        <div className="z-10 w-full max-w-4xl flex flex-col items-center gap-8 animate-in fade-in zoom-in-95 duration-300">
          {/* Reader Header */}
          <div className="w-full flex items-center justify-between max-w-2xl px-2">
            <button
              onClick={handleReset}
              className="text-sm font-medium text-zinc-500 hover:text-foreground transition-colors flex items-center gap-1"
            >
              ← Back
            </button>
            <div className="text-sm font-mono text-zinc-400">{wpm} WPM</div>
          </div>

          <RsvpReader text={text} wpm={wpm} isPlaying={isPlaying} onComplete={handleComplete} />

          {/* Reader Controls */}
          <div className="flex items-center gap-6">
            {appState !== "completed" && (
              <button
                className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="none"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>
            )}

            {appState === "completed" && (
              <button
                onClick={() => {
                  // Replay
                  setAppState("reading");
                  setIsPlaying(true);
                }}
                className="px-6 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Replay
              </button>
            )}
          </div>

          {appState === "completed" && (
            <div className="text-center animate-in fade-in slide-in-from-bottom-2">
              <p className="text-zinc-500 mb-2">Reading complete!</p>
              <button onClick={handleReset} className="text-accent hover:underline font-medium">
                Read something else
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-4 text-xs text-zinc-400 font-medium">
        ReadRush &copy; {new Date().getFullYear()} Built with ❤️ for speed readers.
      </div>
    </main>
  );
}
