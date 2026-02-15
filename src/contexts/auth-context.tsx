
"use client";

import React, { createContext, ReactNode, useMemo } from 'react';
import { User, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useFirebase } from '@/firebase/provider';
import type { Employee } from '@/lib/types';
import { employees } from '@/lib/data';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  employee: Employee | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { auth, user, isUserLoading } = useFirebase();

  const employee = useMemo(() => {
    if (!user) return null;
    return employees.find(e => e.email === user.email) || null;
  }, [user]);

  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };
  
  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    loading: isUserLoading,
    employee,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
