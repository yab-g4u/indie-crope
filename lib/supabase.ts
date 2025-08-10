import { createClient } from "@supabase/supabase-js"

// Ensure environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yvtkpwjyqmyzdsykggyp.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2dGtwd2p5cW15emRzeWtnZ3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NTI4ODcsImV4cCI6MjA3MDMyODg4N30.fTSpkAR6pscGm48g7-W5UeBwJEbJCEsmTyDjTqcrssI"

let supabase: any = null

try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
} catch (error) {
  console.warn("Supabase initialization failed, demo mode will be used:", error)
}

// Google OAuth sign in with proper redirect and error handling
export const signInWithGoogle = async () => {
  if (!supabase) {
    return { data: null, error: { message: "Supabase not available, redirecting to demo mode" } }
  }

  try {
    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })

    if (error) {
      console.error("Google OAuth error:", error)
      return { data: null, error: { message: "Authentication failed, redirecting to demo mode" } }
    }

    return { data, error: null }
  } catch (error) {
    console.error("Google sign in error:", error)
    return { data: null, error: { message: "Authentication failed, redirecting to demo mode" } }
  }
}

export const signOut = async () => {
  if (!supabase) {
    return { error: null }
  }

  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (error) {
    console.error("Sign out error:", error)
    return { error }
  }
}

export const getCurrentUser = async () => {
  if (!supabase) {
    return { user: null, error: { message: "Supabase not available" } }
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    return { user, error }
  } catch (error) {
    console.error("Get user error:", error)
    return { user: null, error }
  }
}

// Get user profile with role
export const getUserProfile = async (userId: string) => {
  if (!supabase) {
    return { data: null, error: { message: "Supabase not available" } }
  }

  try {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()
    return { data, error }
  } catch (error) {
    console.error("Get profile error:", error)
    return { data: null, error }
  }
}

// Create user profile after first login
export const createUserProfile = async (userId: string, email: string, name: string) => {
  if (!supabase) {
    return { data: null, error: { message: "Supabase not available" } }
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .insert([
        {
          id: userId,
          email,
          name,
          role: "agent",
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    return { data, error }
  } catch (error) {
    console.error("Create profile error:", error)
    return { data: null, error }
  }
}
