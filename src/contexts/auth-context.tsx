"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { employees } from '@/lib/data';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOGGED_IN_EMAIL_KEY = 'loggedInEmail';

// Helper to create a mock user object from an email
const createMockUser = (email: string): User | null => {
    const employee = employees.find(e => e.email === email);
    if (!employee) return null;

    // This is a simplified mock user object.
    return {
        uid: employee.id,
        email: employee.email,
        displayName: employee.name,
        emailVerified: true,
        isAnonymous: false,
        metadata: {},
        providerData: [],
        providerId: 'password',
        refreshToken: 'mock-refresh-token',
        tenantId: null,
        delete: async () => {},
        getIdToken: async () => 'mock-id-token',
        getIdTokenResult: async () => ({} as any),
        reload: async () => {},
        toJSON: () => ({}),
        phoneNumber: null,
        photoURL: null,
      } as User;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const loggedInEmail = localStorage.getItem(LOGGED_IN_EMAIL_KEY);
      if (loggedInEmail) {
        setUser(createMockUser(loggedInEmail));
      }
    } catch (e) {
      console.error("Error reading from localStorage", e);
    } finally {
        setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    const employee = employees.find(e => e.email === email);
    // For this prototype, we'll allow login if the email exists and any password is provided.
    if (employee && pass) {
        try {
            localStorage.setItem(LOGGED_IN_EMAIL_KEY, email);
            setUser(createMockUser(email));
        } catch (e) {
            console.error("Failed to write to localStorage", e);
            throw new Error("Could not log in.");
        }
    } else {
      throw new Error("Invalid credentials");
    }
  };
  
  const logout = async () => {
    try {
        localStorage.removeItem(LOGGED_IN_EMAIL_KEY);
    } catch(e) {
        console.error("Failed to remove from localStorage", e);
    }
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
