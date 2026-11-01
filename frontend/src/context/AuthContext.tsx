"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('smartworkforce_token') : null;
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('/auth/me');
      if (response.data.success) {
        setUser(response.data.user);
        setEmployee(response.data.employee || null);
      }
    } catch (error) {
      window.localStorage.removeItem('smartworkforce_token');
      setUser(null);
      setEmployee(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      window.localStorage.setItem('smartworkforce_token', response.data.token);
      setUser(response.data.user);
      return response.data;
    }
    throw new Error(response.data.message || 'Login failed');
  };

  const register = async (payload: any) => {
    const response = await api.post('/auth/register', payload);
    if (response.data.success) {
      if (response.data.token) {
        window.localStorage.setItem('smartworkforce_token', response.data.token);
      }
      setUser(response.data.user);
      return response.data;
    }
    throw new Error(response.data.message || 'Registration failed');
  };

  const logout = () => {
    window.localStorage.removeItem('smartworkforce_token');
    setUser(null);
    setEmployee(null);
  };

  const value = useMemo(
    () => ({
      user,
      employee,
      loading,
      login,
      register,
      logout,
      refresh: loadUser,
    }),
    [user, employee, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
