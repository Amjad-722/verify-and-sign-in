import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Session, User } from '@supabase/supabase-js'
import { useToast } from '@/hooks/use-toast'

type AuthUser = User

interface AuthContextType {
  user: AuthUser | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<void>
  completeSignUp: (email: string, password: string, token: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resendVerification: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user as AuthUser || null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user as AuthUser || null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {
    // Generate a temporary token for verification
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    
    // Store the signup data temporarily (in real app, you'd store this securely)
    localStorage.setItem('pending_signup', JSON.stringify({ email, password, token }))
    
    // Send custom verification email
    const { error } = await supabase.functions.invoke('send-custom-verification', {
      body: {
        email,
        token,
        baseUrl: window.location.origin
      }
    })

    if (error) {
      throw new Error(error.message)
    }

    toast({
      title: "Check your email",
      description: "We've sent you a verification email with confirmation buttons.",
    })
  }

  const completeSignUp = async (email: string, password: string, token: string) => {
    // Verify token matches the stored one
    const pendingSignup = localStorage.getItem('pending_signup')
    if (!pendingSignup) {
      throw new Error('No pending signup found')
    }
    
    const { email: storedEmail, token: storedToken } = JSON.parse(pendingSignup)
    if (email !== storedEmail || token !== storedToken) {
      throw new Error('Invalid verification token')
    }
    
    // Now create the actual Supabase account
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      throw new Error(error.message)
    }

    // Clean up pending signup
    localStorage.removeItem('pending_signup')

    toast({
      title: "Account created successfully!",
      description: "You can now sign in with your credentials.",
    })
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw new Error(error.message)
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }
  }

  const resendVerification = async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    })

    if (error) {
      throw new Error(error.message)
    }

    toast({
      title: "Verification email sent",
      description: "Please check your email for the verification link.",
    })
  }

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    completeSignUp,
    signIn,
    signOut,
    resendVerification,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}