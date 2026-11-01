"use client";

import { useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import api from "../../../../lib/api";
import { Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params?.token;
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { token, password });
      toast.success('Password has been updated.');
      router.push('/auth/login');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Unable to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glass-card rounded-3xl border border-border/50 max-w-lg w-full p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
          <p className="text-muted-foreground">Create a new password for your account.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="New password"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground rounded-2xl py-3 font-semibold hover:bg-primary/90 transition-colors disabled:opacity-70"
          >
            {loading ? 'Updating...' : 'Reset Password'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/auth/login" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={14} /> Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
