"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface RsvpReaderProps {
  text: string;
  wpm: number;
  isPlaying: boolean;
  onComplete?: () => void;
}

export function RsvpReader({ text, wpm, isPlaying, onComplete }: RsvpReaderProps) {
  const [words, setWords] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Split by whitespace but keep punctuation attached to words
    const w = text.trim().split(/\s+/);
    setWords(w);
    setIndex(0);
  }, [text]);

  const tick = useCallback(() => {
    setIndex((prev) => {
      if (prev >= words.length - 1) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        onComplete?.();
        return prev;
      }
      return prev + 1;
    });
  }, [words.length, onComplete]);

  useEffect(() => {
    if (isPlaying && words.length > 0) {
      const msPerWord = 60000 / wpm;
      intervalRef.current = setInterval(tick, msPerWord);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, wpm, words.length, tick]);

  const currentWord = words[index] || "";

  // Optimal Recognition Point (ORP) Logic
  // Find the "pivot" character (usually slightly left of center)
  const pivotIndex = Math.ceil((currentWord.length - 1) / 4); 
  const leftPart = currentWord.slice(0, pivotIndex);
  const pivotChar = currentWord[pivotIndex];
  const rightPart = currentWord.slice(pivotIndex + 1);

  return (
    <div className="flex flex-col items-center justify-center h-64 w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm relative overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 h-1 bg-accent/20 w-full">
        <div 
          className="h-full bg-accent transition-all duration-100 ease-linear"
          style={{ width: `${((index + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* Reader Display */}
      <div className="text-5xl md:text-6xl font-bold tracking-tight text-foreground font-mono flex items-baseline">
        <span className="text-right w-1/2 pr-1 text-zinc-800 dark:text-zinc-200">{leftPart}</span>
        <span className="text-accent">{pivotChar}</span>
        <span className="text-left w-1/2 pl-1 text-zinc-800 dark:text-zinc-200">{rightPart}</span>
      </div>
      
      {/* Current word stats (subtle) */}
      <div className="absolute bottom-4 right-6 text-xs text-zinc-400 font-mono">
        {index + 1} / {words.length}
      </div>
    </div>
  );
}
