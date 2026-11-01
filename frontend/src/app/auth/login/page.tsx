"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, ArrowRight, ScanBarcode } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await login(formData.email, formData.password);
      toast.success('Login successful!');
      const isAdmin = response.user.role === 'admin' || response.user.role === 'manager';
      router.push(isAdmin ? '/admin/dashboard' : '/employee/dashboard');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4">
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

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
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card rounded-2xl p-8 shadow-2xl border border-border/50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground/80 pl-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  placeholder="admin@smartworkforce.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between pl-1">
                <label className="text-sm font-medium text-foreground/80">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline font-medium">Forgot Password?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={20} /> Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-primary font-semibold hover:underline flex items-center justify-center gap-1 inline-flex">
              Register Now <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg text-xs text-muted-foreground/80 text-center border border-border/50">
            <p className="font-semibold mb-1 text-foreground/70">Demo Credentials:</p>
            <p>Admin: admin@test.com / any pass</p>
            <p>Emp: emp@test.com / any pass</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
