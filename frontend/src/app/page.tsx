"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScanBarcode, Clock, ShieldCheck, BarChart3, Users, ChevronRight, Zap } from "lucide-react";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background Decorators */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-primary to-blue-500 p-2 rounded-xl text-white">
              <ScanBarcode size={28} />
            </div>
            <span className="text-xl font-bold tracking-tight">Smart<span className="text-primary">Workforce</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
            <Link href="#testimonials" className="hover:text-primary transition-colors">Testimonials</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <Link 
              href="/auth/register" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap size={16} className="text-primary fill-primary" />
            <span>Next-Generation Attendance System</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Seamless Attendance with <br className="hidden md:block" />
            <span className="gradient-text">Smart Barcode Scans</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Eliminate manual tracking. Our advanced system uses barcode technology to instantly log check-ins, calculate working hours, and generate intelligent payroll reports.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/auth/register" 
              className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold shadow-xl shadow-primary/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Start Free Trial <ChevronRight size={20} />
            </Link>
            <Link 
              href="/demo" 
              className="w-full sm:w-auto glass-card text-foreground px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-accent flex items-center justify-center gap-2"
            >
              <ScanBarcode size={20} /> Watch Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Image / App Preview Mockup */}
        <motion.div 
          className="mt-20 relative mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 h-full w-full" />
          <div className="glass-card rounded-2xl border border-border/50 p-2 shadow-2xl relative overflow-hidden group">
            
            {/* Mock Dashboard UI */}
            <div className="bg-card rounded-xl overflow-hidden border border-border">
              <div className="h-12 border-b border-border flex items-center px-4 gap-2 bg-muted/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
              </div>
              <div className="p-8 flex flex-col md:flex-row gap-8 relative">
                <div className="flex-1 space-y-6">
                  <div className="h-8 w-1/3 bg-muted rounded-md animate-pulse"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-primary/10 rounded-xl border border-primary/20 flex flex-col justify-center p-4">
                      <div className="h-4 w-1/2 bg-primary/30 rounded mb-2"></div>
                      <div className="h-8 w-3/4 bg-primary/40 rounded"></div>
                    </div>
                    <div className="h-24 bg-muted rounded-xl border border-border/50"></div>
                  </div>
                  <div className="h-48 bg-muted/50 rounded-xl border border-border/50"></div>
                </div>
                
                {/* Simulated Scanner */}
                <div className="w-full md:w-72 bg-background border border-border rounded-xl p-6 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="w-48 h-48 border-2 border-dashed border-primary/50 rounded-lg relative flex items-center justify-center mb-6">
                    <ScanBarcode size={64} className="text-muted-foreground/30" />
                    <div className="absolute left-0 right-0 h-1 bg-primary/80 shadow-[0_0_10px_rgba(59,130,246,0.8)] z-20 animate-scan"></div>
                  </div>
                  <div className="h-4 w-2/3 bg-muted rounded animate-pulse"></div>
                  <div className="h-10 w-full bg-primary/20 rounded-full mt-6 text-primary flex items-center justify-center font-medium text-sm">Scanning...</div>
                </div>
              </div>
            </div>
            
          </div>
        </motion.div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 relative z-10 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise-Grade Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to manage your workforce attendance efficiently in one unified platform.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ScanBarcode, title: "Instant Barcode Scan", desc: "Lightning-fast attendance logging using standard ID barcodes or QR codes." },
              { icon: Clock, title: "Automated Timesheets", desc: "System automatically calculates working hours, overtime, and late deductions." },
              { icon: BarChart3, title: "Smart Analytics", desc: "Visual dashboards and comprehensive reports for HR and management." },
              { icon: ShieldCheck, title: "Fraud Prevention", desc: "Anti-spoofing measures with optional selfie capture and geo-location tracking." },
              { icon: Users, title: "Multi-Branch Support", desc: "Manage thousands of employees across different departments and locations." },
              { icon: Zap, title: "Real-time Sync", desc: "Instant updates across all devices. Know exactly who is on-site at any moment." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <feature.icon size={28} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
