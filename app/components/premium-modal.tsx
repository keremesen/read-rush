"use client";

import { useEffect, useState } from "react";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300); // Wait for exit animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 md:p-8 transform transition-all duration-300 ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-foreground transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-2xl mb-2">
            ✨
          </div>
          
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Unlock AI Generation
          </h2>
          
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Generate custom reading material instantly with our advanced AI. Perfect topics, perfect length.
          </p>

          <div className="w-full py-6 my-2 border-t border-b border-zinc-100 dark:border-zinc-800 flex flex-col gap-3">
             <div className="flex items-center justify-center items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">$4.99</span>
                <span className="text-zinc-500">/ month</span>
             </div>
             <p className="text-xs text-zinc-400">Cancel anytime. 7-day free trial.</p>
          </div>

          <button 
            className="w-full py-3 rounded-xl bg-foreground text-background font-bold text-base hover:opacity-90 transition-opacity shadow-lg"
            onClick={() => alert("Redirecting to checkout...")}
          >
            Upgrade to Pro
          </button>
          
          <p className="text-xs text-zinc-400 mt-2">
            Restoring purchase? <a href="#" className="underline hover:text-zinc-600 dark:hover:text-zinc-300">Click here</a>
          </p>
        </div>
      </div>
    </div>
  );
}
