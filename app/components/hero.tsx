import { BrandLockup } from "./brand-mark";

export function Hero() {
  return (
    <div className="flex flex-col items-center text-center gap-6 pt-6 pb-10 md:pt-10 md:pb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
      <BrandLockup />
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"/>
        Your focus-first RSVP reader
      </div>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground max-w-2xl">
        Less scrolling. <br className="hidden md:block" />
        <span className="text-zinc-400 dark:text-zinc-600">More knowing.</span>
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
        Read one word at a time, right where your eyes already are. Move through any text at your pace.
      </p>
    </div>
  );
}
