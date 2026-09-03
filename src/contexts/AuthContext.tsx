import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface Profile {
  id: string;
  auth_user_id: string;
  full_name: string | null;
  email: string | null;
  company_name: string | null;
  role: string | null;
  display_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  timezone: string | null;
}

export type ProfileUpdate = Partial<Pick<Profile, 'full_name' | 'company_name' | 'display_name' | 'phone' | 'timezone' | 'avatar_url'>>;

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string, orgName: string, jobTitle: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<{ error: string | null }>;
  resetPassword: (newPassword: string) => Promise<{ error: string | null }>;
  updateProfile: (updates: ProfileUpdate) => Promise<{ error: string | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile from public.profiles using auth_user_id
  const fetchProfile = useCallback(async (userId: string): Promise<Profile | null> => {
    try {
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('auth_user_id', userId)
        .maybeSingle();

      if (profileError) {
        console.error('Error fetching profile:', profileError.message);
        return null;
      }
      return data as Profile | null;
    } catch (err) {
      console.error('Error fetching profile:', err);
      return null;
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        if (!mounted) return;

        if (sessionError) {
          setError(sessionError.message);
          setLoading(false);
          return;
        }

        if (initialSession?.user) {
          setUser(initialSession.user);
          setSession(initialSession);

          // Fetch profile in parallel
          fetchProfile(initialSession.user.id).then((prof) => {
            if (mounted) {
              setProfile(prof);
              setLoading(false);
            }
          }).catch(() => {
            if (mounted) setLoading(false);
          });
        } else {
          setLoading(false);
        }
      } catch (err) {
        if (!mounted) return;
        console.error('Auth initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialise authentication');
        setLoading(false);
      }
    }

    init();

    // Listen for auth changes
    let subscription: { unsubscribe: () => void } | null = null;
    try {
      const result = supabase.auth.onAuthStateChange((event, newSession) => {
        if (!mounted) return;

        if (event === 'SIGNED_IN' && newSession?.user) {
          setUser(newSession.user);
          setSession(newSession);
          fetchProfile(newSession.user.id).then((prof) => {
            if (mounted) setProfile(prof);
          }).catch(() => { /* ignore */ });
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
          setProfile(null);
        } else if (event === 'USER_UPDATED' && newSession?.user) {
          setUser(newSession.user);
          setSession(newSession);
        } else if (event === 'TOKEN_REFRESHED' && newSession) {
          setSession(newSession);
        }
      });
      subscription = result.data.subscription;
    } catch (err) {
      console.error('Failed to subscribe to auth state changes:', err);
    }

    return () => {
      mounted = false;
      if (subscription) {
        try {
          subscription.unsubscribe();
        } catch (e) {
          console.error('Error unsubscribing from auth state changes:', e);
        }
      }
    };
  }, [fetchProfile]);

  const signIn = useCallback(async (email: string, password: string): Promise<{ error: string | null }> => {
    setError(null);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          return { error: 'Invalid email or password. Please check your credentials and try again.' };
        }
        if (signInError.message.includes('Email not confirmed')) {
          return { error: 'Please verify your email address before signing in. Check your inbox for the verification link.' };
        }
        return { error: signInError.message };
      }

      if (data.user) {
        const prof = await fetchProfile(data.user.id);
        setProfile(prof);
      }

      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred during sign in';
      return { error: message };
    }
  }, [fetchProfile]);

  const signUp = useCallback(async (
    email: string,
    password: string,
    fullName: string,
    orgName: string,
    jobTitle: string,
  ): Promise<{ error: string | null }> => {
    setError(null);
    try {
      // 1. Create the auth user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            organisation_name: orgName.trim(),
            job_title: jobTitle.trim(),
          },
        },
      });

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          return { error: 'An account with this email already exists. Please sign in instead.' };
        }
        return { error: signUpError.message };
      }

      // 2. Create profile record
      if (data.user) {
        const { error: insertError } = await supabase.from('profiles').insert({
          auth_user_id: data.user.id,
          full_name: fullName.trim(),
          email: email.trim().toLowerCase(),
          company_name: orgName.trim(),
          role: jobTitle.trim(),
          display_name: fullName.trim(),
          status: 'active',
          timezone: 'Europe/London',
        });

        if (insertError) {
          console.error('Profile creation error:', insertError.message);
          // Non-fatal — user still has auth account, profile can be created later
        }

        // If email confirmation is disabled, sign them in
        if (data.session) {
          setUser(data.user);
          setSession(data.session);
          const prof = await fetchProfile(data.user.id);
          setProfile(prof);
        }
      }

      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred during sign up';
      return { error: message };
    }
  }, [fetchProfile]);

  const signOut = useCallback(async () => {
    setError(null);
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {
      // Clear state even if the API call fails
      setUser(null);
      setSession(null);
      setProfile(null);
    }
  }, []);

  const sendPasswordReset = useCallback(async (email: string): Promise<{ error: string | null }> => {
    setError(null);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) {
        return { error: resetError.message };
      }

      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      return { error: message };
    }
  }, []);

  const resetPassword = useCallback(async (newPassword: string): Promise<{ error: string | null }> => {
    setError(null);
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        return { error: updateError.message };
      }

      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      return { error: message };
    }
  }, []);

  const refreshProfile = useCallback(async (): Promise<void> => {
    if (!user) return;
    try {
      const prof = await fetchProfile(user.id);
      setProfile(prof);
    } catch (err) {
      console.error('Error refreshing profile:', err);
    }
  }, [user, fetchProfile]);

  const updateProfile = useCallback(async (updates: ProfileUpdate): Promise<{ error: string | null }> => {
    setError(null);
    if (!user) {
      return { error: 'You must be signed in to update your profile.' };
    }
    try {
      // Try to update an existing profile row keyed by auth_user_id
      const { data: updated, error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('auth_user_id', user.id)
        .select('*')
        .maybeSingle();

      if (updateError) {
        return { error: updateError.message };
      }

      // No row existed yet — create one so the profile persists
      if (!updated) {
        const { data: inserted, error: insertError } = await supabase
          .from('profiles')
          .insert({
            auth_user_id: user.id,
            email: user.email ?? null,
            status: 'active',
            ...updates,
          })
          .select('*')
          .maybeSingle();

        if (insertError) {
          return { error: insertError.message };
        }
        setProfile(inserted as Profile | null);
        return { error: null };
      }

      setProfile(updated as Profile | null);
      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred while updating your profile';
      return { error: message };
    }
  }, [user]);

  const value: AuthState = {
    user,
    session,
    profile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    sendPasswordReset,
    resetPassword,
    updateProfile,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;