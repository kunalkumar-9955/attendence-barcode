"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        {children}
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 4000,
            className: 'glass-card dark:text-white',
            style: {
              background: 'var(--color-card)',
              color: 'var(--color-foreground)',
              border: '1px solid var(--color-border)',
            }
          }} 
        />
      </AuthProvider>
    </ThemeProvider>
  );
}
