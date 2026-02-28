"use client";

import { useEffect, useRef, useMemo } from "react";

interface RsvpReaderProps {
  text: string;
  wpm: number;
  isPlaying: boolean;
  onComplete?: () => void;
}

export function RsvpReader({ text, wpm, isPlaying, onComplete }: RsvpReaderProps) {
  const words = useMemo(() => text.trim().split(/\s+/), [text]);
  const wordsLength = words.length;

  const indexRef = useRef(0);
  const lastTickRef = useRef<number>(0);
  const reqRef = useRef<number | null>(null);

  const leftRef = useRef<HTMLSpanElement>(null);
  const pivotRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    indexRef.current = 0;
    renderWord(0);
  }, [text]);

  const renderWord = (idx: number) => {
    if (idx >= wordsLength) return;
    const currentWord = words[idx] || "";
    const pivotIndex = Math.ceil((currentWord.length - 1) / 4);

    if (leftRef.current) leftRef.current.innerText = currentWord.slice(0, pivotIndex);
    if (pivotRef.current) pivotRef.current.innerText = currentWord[pivotIndex] || "";
    if (rightRef.current) rightRef.current.innerText = currentWord.slice(pivotIndex + 1);

    if (progressRef.current) {
      progressRef.current.style.width = `${((idx + 1) / wordsLength) * 100}%`;
    }
    if (statsRef.current) {
      statsRef.current.innerText = `${idx + 1} / ${wordsLength}`;
    }
  };

  const loop = (time: number) => {
    if (!lastTickRef.current) lastTickRef.current = time;

    const msPerWord = 60000 / wpm;
    const elapsed = time - lastTickRef.current;

    if (elapsed >= msPerWord) {
      const ticks = Math.floor(elapsed / msPerWord);
      indexRef.current += ticks;
      lastTickRef.current += ticks * msPerWord;

      if (indexRef.current >= wordsLength - 1) {
        indexRef.current = wordsLength - 1;
        renderWord(indexRef.current);
        onComplete?.();
        return;
      }

      renderWord(indexRef.current);
    }

    reqRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (isPlaying && wordsLength > 0) {
      if (indexRef.current >= wordsLength - 1) {
        indexRef.current = 0;
        renderWord(0);
      }
      lastTickRef.current = performance.now();
      reqRef.current = requestAnimationFrame(loop);
    } else {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    }

    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [isPlaying, wpm, wordsLength, onComplete]);

  // Initial render setup for SSR
  const initialWord = words[0] || "";
  const initialPivotIndex = Math.ceil((initialWord.length - 1) / 4);
  const leftPart = initialWord.slice(0, initialPivotIndex);
  const pivotChar = initialWord[initialPivotIndex] || "";
  const rightPart = initialWord.slice(initialPivotIndex + 1);

  return (
    <div className="flex flex-col items-center justify-center h-64 w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm relative overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 h-1 bg-accent/20 w-full">
        <div
          ref={progressRef}
          className="h-full bg-accent transition-all duration-100 ease-linear"
          style={{ width: `${(1 / wordsLength) * 100}%` }}
        />
      </div>

      {/* Reader Display */}
      <div className="text-5xl md:text-6xl font-bold tracking-tight text-foreground font-mono flex items-baseline">
        <span ref={leftRef} className="text-right w-1/2 pr-1 text-zinc-800 dark:text-zinc-200">
          {leftPart}
        </span>
        <span ref={pivotRef} className="text-accent">
          {pivotChar}
        </span>
        <span ref={rightRef} className="text-left w-1/2 pl-1 text-zinc-800 dark:text-zinc-200">
          {rightPart}
        </span>
      </div>

      {/* Current word stats */}
      <div ref={statsRef} className="absolute bottom-4 right-6 text-xs text-zinc-400 font-mono">
        1 / {wordsLength}
      </div>
    </div>
  );
}
