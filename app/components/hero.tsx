export function Hero() {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"/>
        RSVP Reader v1.0
      </div>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground max-w-2xl">
        Read faster. <br className="hidden md:block" />
        <span className="text-zinc-400 dark:text-zinc-600">Retain more.</span>
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
        Focus on one word at a time. Eliminate eye movement. Read 3x faster with our minimal RSVP reader.
      </p>
    </div>
  );
}
