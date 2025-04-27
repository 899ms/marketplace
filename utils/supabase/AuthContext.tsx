'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { User } from '@supabase/supabase-js';
import {
  supabase,
  authOperations,
  type SignUpCredentials,
  type SignInCredentials,
} from './index';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (
    credentials: SignInCredentials,
  ) => Promise<{ user: User | null; error: string | null }>;
  signUp: (
    credentials: SignUpCredentials,
  ) => Promise<{ user: User | null; error: string | null }>;
  signOut: () => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session and set user
    const checkSession = async () => {
      try {
        const { user } = await authOperations.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    checkSession();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Create wrapper functions to ensure correct return types
  const signIn = async (credentials: SignInCredentials) => {
    return await authOperations.signIn(credentials);
  };

  const signUp = async (credentials: SignUpCredentials) => {
    return await authOperations.signUp(credentials);
  };

  const signOut = async () => {
    const { error } = await authOperations.signOut();
    return { error: error ? error.toString() : null };
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
