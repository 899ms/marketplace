'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import {
  supabase,
  authOperations,
  userOperations,
  type SignUpCredentials,
  type SignInCredentials,
} from './index';
import type { User as AppUser } from './types';

interface AuthContextType {
  user: SupabaseUser | null;
  userProfile: AppUser | null;
  loading: boolean;
  signIn: (
    credentials: SignInCredentials,
  ) => Promise<{ user: SupabaseUser | null; error: string | null }>;
  signUp: (
    credentials: SignUpCredentials,
  ) => Promise<{ user: SupabaseUser | null; error: string | null }>;
  signOut: () => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async (userId: string) => {
      try {
        const profile = await userOperations.getUserById(userId);
        if (isMounted) {
          setUserProfile(profile);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        if (isMounted) {
          setUserProfile(null);
        }
      }
    };

    const checkSession = async () => {
      try {
        const { user: sessionUser } = await authOperations.getUser();
        if (isMounted) {
          setUser(sessionUser);
          if (sessionUser) {
            await fetchProfile(sessionUser.id);
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const sessionUser = session?.user ?? null;
      if (isMounted) {
        setUser(sessionUser);
        if (sessionUser) {
          await fetchProfile(sessionUser.id);
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      }
    });

    checkSession().finally(() => {
      if (isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (credentials: SignInCredentials) => {
    return await authOperations.signIn(credentials);
  };

  const signUp = async (credentials: SignUpCredentials) => {
    return await authOperations.signUp(credentials);
  };

  const signOut = async () => {
    const { error } = await authOperations.signOut();
    setUserProfile(null);
    return { error: error ? error.toString() : null };
  };

  const value = {
    user,
    userProfile,
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
