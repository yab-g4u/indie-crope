"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { RoleSelection } from "@/components/auth/role-selection"
import { FieldAgentDashboard } from "@/components/dashboard/field-agent-dashboard"
import { GovernmentDashboard } from "@/components/dashboard/government-dashboard"
import { FarmerInterface } from "@/components/farmer/farmer-interface"
import { FieldDataCollection } from "@/components/agent/field-data-collection"
import { GeneratingCalendar } from "@/components/calendar/generating-calendar"
import { InteractiveCropCalendar } from "@/components/calendar/interactive-crop-calendar"
import { CreateBulletin } from "@/components/bulletin/create-bulletin"
import { FullScreenMap } from "@/components/map/full-screen-map"
import { getCurrentUser } from "@/lib/supabase"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/lib/types"

type AppState =
  | "role-selection"
  | "auth"
  | "dashboard"
  | "government-dashboard"
  | "farmer-interface"
  | "data-collection"
  | "generating"
  | "recommendations"
  | "calendar"
  | "map"
  | "verify"
  | "bulletin"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("role-selection")
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<"agent" | "ngo" | "government" | null>(null)
  const [loading, setLoading] = useState(false)
  const [farmProfile, setFarmProfile] = useState<any>(null)
  const [recommendations, setRecommendations] = useState<any>(null)
  const [isDemoMode, setIsDemoMode] = useState(true) // Default to demo mode
  const [farmerData, setFarmerData] = useState<any>(null)

  useEffect(() => {
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const isAuthenticated = urlParams.get("authenticated") === "true"
    const isDemo = urlParams.get("demo") === "true"

    if (isDemo || isAuthenticated) {
      setIsDemoMode(true)
      setAppState("role-selection")
      // Clean up URL
      window.history.replaceState({}, document.title, "/")
    } else {
      // Default to demo mode and role selection
      setIsDemoMode(true)
      setAppState("role-selection")
    }
  }, [])

  const checkUser = async () => {
    setLoading(true)
    try {
      const { user: authUser } = await getCurrentUser()
      if (authUser) {
        setUser({
          id: authUser.id,
          email: authUser.email!,
          role: "agent",
          name: authUser.user_metadata?.full_name || "User",
          created_at: authUser.created_at!,
        })
        setAppState("role-selection")
      } else {
        // If no user found, enable demo mode
        setIsDemoMode(true)
        setAppState("role-selection")
      }
    } catch (error) {
      console.error("Error checking user:", error)
      // Fallback to demo mode
      setIsDemoMode(true)
      setAppState("role-selection")
    } finally {
      setLoading(false)
    }
  }

  const handleRoleSelect = (role: "agent" | "ngo" | "government") => {
    setUserRole(role)
    if (role === "agent") {
      setAppState("dashboard")
    } else if (role === "government") {
      setAppState("government-dashboard")
    } else {
      setAppState("calendar")
    }
  }

  const handleFarmerAccess = () => {
    setAppState("farmer-interface")
  }

  const handleCollectData = () => {
    setAppState("data-collection")
  }

  const handleDataSubmit = (data: any) => {
    setFarmProfile(data)
    setAppState("generating")
  }

  const handleGenerationComplete = (recs: any) => {
    setRecommendations(recs)
    setAppState("recommendations")
  }

  const handleCreateBulletin = () => {
    setAppState("bulletin")
  }

  const handleViewMap = () => {
    setAppState("map")
  }

  const handleVerifyAction = () => {
    setAppState("verify")
  }

  const handleFarmerDataSubmit = (data: any) => {
    setFarmerData(data)
    setAppState("calendar")
  }

  const handleBackToHome = () => {
    setAppState("role-selection")
    setFarmProfile(null)
    setRecommendations(null)
    setUserRole(null)
  }

  const handleBackToDashboard = () => {
    if (userRole === "agent") {
      setAppState("dashboard")
    } else if (userRole === "government") {
      setAppState("government-dashboard")
    } else {
      setAppState("role-selection")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading IndieCrop...</p>
        </div>
      </div>
    )
  }

  // Demo mode banner component
  const DemoBanner = () =>
    isDemoMode ? (
      <div className="fixed top-16 left-0 right-0 z-40 p-2">
        <Alert className="max-w-md mx-auto bg-green-500/20 border-green-500/50 text-white">
          <Badge className="bg-green-500 text-black mr-2">DEMO</Badge>
          <AlertDescription>You're using demo mode with sample data</AlertDescription>
        </Alert>
      </div>
    ) : null

  switch (appState) {
    case "auth":
      return <LoginForm onBack={handleBackToHome} />

    case "role-selection":
      return (
        <>
          <DemoBanner />
          <RoleSelection onRoleSelect={handleRoleSelect} onFarmerAccess={handleFarmerAccess} />
        </>
      )

    case "dashboard":
      return (
        <>
          <DemoBanner />
          <FieldAgentDashboard
            onCollectData={handleCollectData}
            onViewMap={handleViewMap}
            onCreateBulletin={handleCreateBulletin}
            onVerifyAction={handleVerifyAction}
            onBack={handleBackToHome}
          />
        </>
      )

    case "government-dashboard":
      return (
        <>
          <DemoBanner />
          <GovernmentDashboard onBack={handleBackToHome} />
        </>
      )

    case "farmer-interface":
      return (
        <>
          <DemoBanner />
          <FarmerInterface onDataSubmit={handleFarmerDataSubmit} />
        </>
      )

    case "data-collection":
      return (
        <>
          <DemoBanner />
          <FieldDataCollection onDataSubmit={handleDataSubmit} onBack={handleBackToDashboard} />
        </>
      )

    case "generating":
      return (
        <>
          <DemoBanner />
          <GeneratingCalendar farmProfile={farmProfile} onComplete={handleGenerationComplete} />
        </>
      )

    case "recommendations":
      return (
        <>
          <DemoBanner />
          <InteractiveCropCalendar
            calendarData={recommendations}
            farmProfile={farmProfile}
            onBack={handleBackToDashboard}
          />
        </>
      )

    case "calendar":
      return (
        <>
          <DemoBanner />
          <InteractiveCropCalendar
            calendarData={{
              top_crops: [
                {
                  name: "Teff",
                  expected_profit_min: 45000,
                  expected_profit_max: 65000,
                  resilience_score: 0.92,
                },
                {
                  name: "Coffee",
                  expected_profit_min: 80000,
                  expected_profit_max: 120000,
                  resilience_score: 0.88,
                },
                {
                  name: "Maize",
                  expected_profit_min: 35000,
                  expected_profit_max: 55000,
                  resilience_score: 0.75,
                },
              ],
              calendar: [
                {
                  task_id: "WEEK1_PREP",
                  task: "Land preparation and soil testing",
                  date_from: "2024-08-12",
                  date_to: "2024-08-18",
                  rationale: "Proper land preparation is crucial for optimal crop establishment.",
                  category: "maintenance",
                  priority: "high",
                },
                {
                  task_id: "WEEK2_SEED",
                  task: "Seed selection and treatment",
                  date_from: "2024-08-19",
                  date_to: "2024-08-25",
                  rationale: "Select climate-resilient varieties and treat seeds to prevent diseases.",
                  category: "planting",
                  priority: "high",
                },
              ],
              confidence: 0.87,
            }}
            farmProfile={farmerData}
            onBack={handleBackToHome}
          />
        </>
      )

    case "bulletin":
      return (
        <>
          <DemoBanner />
          <CreateBulletin onBack={handleBackToDashboard} recommendations={recommendations} />
        </>
      )

    case "map":
      return (
        <>
          <DemoBanner />
          <FullScreenMap onBack={handleBackToDashboard} />
        </>
      )

    case "verify":
      return (
        <div className="min-h-screen bg-black p-4">
          <DemoBanner />
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-white mb-2">Action Verification</h2>
            <p className="text-gray-400">Photo verification system coming soon...</p>
          </div>
        </div>
      )

    default:
      return (
        <>
          <DemoBanner />
          <RoleSelection onRoleSelect={handleRoleSelect} onFarmerAccess={handleFarmerAccess} />
        </>
      )
  }
}
