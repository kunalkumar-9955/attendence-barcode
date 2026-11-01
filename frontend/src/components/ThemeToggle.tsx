"use client";

import { useTheme } from "next-themes";
import { Moon, SunMedium } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  return (
    <button
      type="button"
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="rounded-full p-2 hover:bg-muted transition-colors border border-border/50"
      aria-label="Toggle dark mode"
    >
      {currentTheme === 'dark' ? (
        <SunMedium size={18} className="text-yellow-400" />
      ) : (
        <Moon size={18} className="text-slate-700" />
      )}
    </button>
  );
}
