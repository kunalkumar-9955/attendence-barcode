"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, User, ScanBarcode } from "lucide-react";

export default function DemoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4">
      {/* Background Decorators */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors z-20">
        <div className="bg-primary/10 p-2 rounded-lg">
          <ScanBarcode size={24} className="text-primary" />
        </div>
        <span className="font-bold text-lg hidden sm:block">SmartWorkforce</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl relative z-10"
      >
        <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl border border-border/50 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Interactive Demo</h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Choose a role below to explore the SmartWorkforce Attendance System. No actual registration is required for the demo.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Admin Demo Card */}
            <Link href="/auth/login" className="group">
              <div className="h-full glass-card bg-background/50 border border-border/50 rounded-2xl p-8 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 relative overflow-hidden">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <ShieldCheck size={32} className="text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Admin View</h3>
                <p className="text-muted-foreground mb-6">
                  Explore the analytics dashboard, view live check-ins, and manage employees and payroll.
                </p>
                <div className="bg-muted/50 rounded-lg p-3 text-sm font-mono text-muted-foreground mb-6">
                  Login: <span className="text-foreground font-bold">admin@test.com</span>
                </div>
                <div className="inline-flex items-center gap-2 text-primary font-semibold">
                  Try Admin Demo <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Employee Demo Card */}
            <Link href="/auth/login" className="group">
              <div className="h-full glass-card bg-background/50 border border-border/50 rounded-2xl p-8 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 relative overflow-hidden">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <User size={32} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Employee View</h3>
                <p className="text-muted-foreground mb-6">
                  Experience the barcode scanning process, view personal attendance history, and daily stats.
                </p>
                <div className="bg-muted/50 rounded-lg p-3 text-sm font-mono text-muted-foreground mb-6">
                  Login: <span className="text-foreground font-bold">emp@test.com</span>
                </div>
                <div className="inline-flex items-center gap-2 text-primary font-semibold">
                  Try Employee Demo <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
