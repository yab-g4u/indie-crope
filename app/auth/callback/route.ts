import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const origin = requestUrl.origin

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (!error && data.user) {
        // Check if user profile exists, create if not
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

        if (!profile) {
          // Create user profile
          await supabase.from("profiles").insert([
            {
              id: data.user.id,
              email: data.user.email,
              name: data.user.user_metadata?.full_name || data.user.email,
              role: "agent", // default role
              avatar_url: data.user.user_metadata?.avatar_url,
              created_at: new Date().toISOString(),
            },
          ])
        }

        // Redirect to the main app with authentication success
        return NextResponse.redirect(`${origin}/?authenticated=true`)
      }
    } catch (error) {
      console.error("Auth callback error:", error)
    }
  }

  // Redirect to demo mode if there's an error or no code
  return NextResponse.redirect(`${origin}/?demo=true`)
}
