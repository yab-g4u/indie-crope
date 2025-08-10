"use client"

import { useState, useEffect } from "react"
import { EnhancedLandingPage } from "@/components/landing/enhanced-landing-page"
import { LoginForm } from "@/components/auth/login-form"
import { RoleSelection } from "@/components/auth/role-selection"
import { FieldAgentDashboard } from "@/components/dashboard/field-agent-dashboard"
import { GovernmentDashboard } from "@/components/dashboard/government-dashboard"
import { NGODashboard } from "@/components/dashboard/ngo-dashboard"
import { FarmerInterface } from "@/components/farmer/farmer-interface"
import { FieldDataCollection } from "@/components/agent/field-data-collection"
import { GeneratingCalendar } from "@/components/calendar/generating-calendar"
import { InteractiveCropCalendar } from "@/components/calendar/interactive-crop-calendar"
import { CreateBulletin } from "@/components/bulletin/create-bulletin"
import { FullScreenMap } from "@/components/map/full-screen-map"
import { getCurrentUser } from "@/lib/supabase"
import type { User } from "@/lib/types"

type AppState =
  | "landing"
  | "auth"
  | "role-selection"
  | "dashboard"
  | "government-dashboard"
  | "ngo-dashboard"
  | "farmer-interface"
  | "data-collection"
  | "generating"
  | "recommendations"
  | "calendar"
  | "map"
  | "verify"
  | "bulletin"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing")
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<"agent" | "ngo" | "government" | null>(null)
  const [loading, setLoading] = useState(false)
  const [farmProfile, setFarmProfile] = useState<any>(null)
  const [recommendations, setRecommendations] = useState<any>(null)
  const [farmerData, setFarmerData] = useState<any>(null)

  useEffect(() => {
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const isAuthenticated = urlParams.get("authenticated") === "true"

    if (isAuthenticated) {
      checkUser()
      // Clean up URL
      window.history.replaceState({}, document.title, "/")
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
        setAppState("auth")
      }
    } catch (error) {
      console.error("Error checking user:", error)
      setAppState("auth")
    } finally {
      setLoading(false)
    }
  }

  const handleGetStarted = () => {
    setAppState("auth")
  }

  const handleAuthSuccess = () => {
    setAppState("role-selection")
  }

  const handleRoleSelect = (role: "agent" | "ngo" | "government") => {
    setUserRole(role)
    if (role === "agent") {
      setAppState("dashboard")
    } else if (role === "government") {
      setAppState("government-dashboard")
    } else if (role === "ngo") {
      setAppState("ngo-dashboard")
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

  const handleBackToLanding = () => {
    setAppState("landing")
    setFarmProfile(null)
    setRecommendations(null)
    setUserRole(null)
    setUser(null)
  }

  const handleBackToRoleSelection = () => {
    setAppState("role-selection")
    setUserRole(null)
  }

  const handleBackToDashboard = () => {
    if (userRole === "agent") {
      setAppState("dashboard")
    } else if (userRole === "government") {
      setAppState("government-dashboard")
    } else if (userRole === "ngo") {
      setAppState("ngo-dashboard")
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

  switch (appState) {
    case "landing":
      return <EnhancedLandingPage onGetStarted={handleGetStarted} />

    case "auth":
      return <LoginForm onBack={handleBackToLanding} onSuccess={handleAuthSuccess} />

    case "role-selection":
      return (
        <RoleSelection
          onRoleSelect={handleRoleSelect}
          onFarmerAccess={handleFarmerAccess}
          onBack={handleBackToLanding}
        />
      )

    case "dashboard":
      return (
        <FieldAgentDashboard
          onCollectData={handleCollectData}
          onViewMap={handleViewMap}
          onCreateBulletin={handleCreateBulletin}
          onVerifyAction={handleVerifyAction}
          onBack={handleBackToRoleSelection}
        />
      )

    case "government-dashboard":
      return <GovernmentDashboard onBack={handleBackToRoleSelection} />

    case "ngo-dashboard":
      return <NGODashboard onBack={handleBackToRoleSelection} />

    case "farmer-interface":
      return <FarmerInterface onDataSubmit={handleFarmerDataSubmit} onBack={handleBackToRoleSelection} />

    case "data-collection":
      return <FieldDataCollection onDataSubmit={handleDataSubmit} onBack={handleBackToDashboard} />

    case "generating":
      return <GeneratingCalendar farmProfile={farmProfile} onComplete={handleGenerationComplete} />

    case "recommendations":
      return (
        <InteractiveCropCalendar
          calendarData={recommendations}
          farmProfile={farmProfile}
          onBack={handleBackToDashboard}
        />
      )

    case "calendar":
      return (
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
          onBack={handleBackToRoleSelection}
        />
      )

    case "bulletin":
      return <CreateBulletin onBack={handleBackToDashboard} recommendations={recommendations} />

    case "map":
      return <FullScreenMap onBack={handleBackToDashboard} />

    case "verify":
      return (
        <div className="min-h-screen bg-black p-4">
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-white mb-2">Action Verification</h2>
            <p className="text-gray-400">Photo verification system coming soon...</p>
          </div>
        </div>
      )

    default:
      return <EnhancedLandingPage onGetStarted={handleGetStarted} />
  }
}
