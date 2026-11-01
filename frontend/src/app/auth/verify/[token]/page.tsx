"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../../lib/api";
import toast from "react-hot-toast";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token;
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your account...');

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await api.get(`/auth/verify-email/${token}`);
        setStatus('success');
        setMessage(response.data.message || 'Email verified successfully.');
        toast.success(response.data.message || 'Verified!');
      } catch (error: any) {
        setStatus('error');
        setMessage(error?.response?.data?.message || 'Verification failed.');
        toast.error(error?.response?.data?.message || 'Verification failed.');
      }
    };

    if (token) {
      verify();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glass-card rounded-3xl border border-border/50 max-w-lg w-full p-8 shadow-2xl text-center">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mx-auto">
          {status === 'success' ? <CheckCircle2 size={36} /> : status === 'error' ? <XCircle size={36} /> : <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />}
        </div>
        <h1 className="text-3xl font-bold mb-3">Email Verification</h1>
        <p className="text-muted-foreground mb-8">{message}</p>
        <Link href="/auth/login" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
          Continue to Login
        </Link>
      </div>
    </div>
  );
}
