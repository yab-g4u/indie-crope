"use client"

import { useState, useEffect } from "react"
import { EnhancedLandingPage } from "@/components/landing/enhanced-landing-page"
import { LoginForm } from "@/components/auth/login-form"
import { RoleSelection } from "@/components/auth/role-selection"
import { FieldAgentDashboard } from "@/components/dashboard/field-agent-dashboard"
import { GovernmentDashboard } from "@/components/dashboard/government-dashboard"
import { FarmerInterface } from "@/components/farmer/farmer-interface"
import { FarmQuestionnaire } from "@/components/farm/farm-questionnaire"
import { GeneratingCalendar } from "@/components/calendar/generating-calendar"
import { InteractiveCropCalendar } from "@/components/calendar/interactive-crop-calendar"
import { FunctionalQRScanner } from "@/components/scanner/functional-qr-scanner"
import { getCurrentUser } from "@/lib/supabase"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/lib/types"

type AppState =
  | "landing"
  | "auth"
  | "role-selection"
  | "dashboard"
  | "government-dashboard"
  | "farmer-interface"
  | "scanner"
  | "questionnaire"
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
  const [selectedFarmId, setSelectedFarmId] = useState<string>("")
  const [farmProfile, setFarmProfile] = useState<any>(null)
  const [recommendations, setRecommendations] = useState<any>(null)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [farmerData, setFarmerData] = useState<any>(null)

  useEffect(() => {
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const isAuthenticated = urlParams.get("authenticated") === "true"
    const isDemo = urlParams.get("demo") === "true"

    if (isDemo) {
      setIsDemoMode(true)
      setAppState("role-selection")
      // Clean up URL
      window.history.replaceState({}, document.title, "/")
    } else if (isAuthenticated) {
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

  const handleGetStarted = () => {
    setAppState("auth")
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

  const handleScanQR = () => {
    setAppState("scanner")
  }

  const handleQRScanned = (farmId: string) => {
    setSelectedFarmId(farmId)
    setAppState("questionnaire")
  }

  const handleQuestionnaireComplete = (profile: any) => {
    setFarmProfile(profile)
    setAppState("generating")
  }

  const handleGenerationComplete = (recs: any) => {
    setRecommendations(recs)
    setAppState("recommendations")
  }

  const handleCreateBulletin = (recs: any) => {
    setRecommendations(recs)
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
    // Store farmer data in blockchain-backed card format
    const farmCard = {
      id: `FARMER_${Date.now()}`,
      ...data,
      blockchain_hash: `0x${Math.random().toString(16).substr(2, 40)}`,
      created_at: new Date().toISOString(),
      verification_status: "pending",
    }
    console.log("Farmer card created:", farmCard)
    setAppState("calendar")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dark-accent mx-auto mb-4" />
          <p className="text-dark-text-secondary">Loading IndieCrop...</p>
        </div>
      </div>
    )
  }

  // Demo mode banner component
  const DemoBanner = () =>
    isDemoMode ? (
      <div className="fixed top-16 left-0 right-0 z-40 p-2">
        <Alert className="max-w-md mx-auto bg-dark-accent/20 border-dark-accent/50 text-dark-text-primary">
          <Badge className="bg-dark-accent text-dark-primary mr-2">DEMO</Badge>
          <AlertDescription>You're using demo mode with sample data</AlertDescription>
        </Alert>
      </div>
    ) : null

  switch (appState) {
    case "landing":
      return <EnhancedLandingPage onGetStarted={handleGetStarted} />

    case "auth":
      return <LoginForm onBack={() => setAppState("landing")} />

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
            onScanQR={handleScanQR}
            onViewMap={handleViewMap}
            onCreateBulletin={() => setAppState("bulletin")}
            onVerifyAction={handleVerifyAction}
          />
        </>
      )

    case "government-dashboard":
      return (
        <>
          <DemoBanner />
          <GovernmentDashboard onBack={() => setAppState("role-selection")} />
        </>
      )

    case "farmer-interface":
      return (
        <>
          <DemoBanner />
          <FarmerInterface onDataSubmit={handleFarmerDataSubmit} />
        </>
      )

    case "scanner":
      return (
        <>
          <DemoBanner />
          <FunctionalQRScanner onScan={handleQRScanned} onClose={() => setAppState("dashboard")} />
        </>
      )

    case "questionnaire":
      return (
        <>
          <DemoBanner />
          <FarmQuestionnaire
            farmId={selectedFarmId}
            onComplete={handleQuestionnaireComplete}
            onBack={() => setAppState("dashboard")}
          />
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
          <InteractiveCropCalendar calendarData={recommendations} farmProfile={farmProfile} />
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
                  date_from: "2024-01-15",
                  date_to: "2024-01-21",
                  rationale: "Proper land preparation is crucial for optimal crop establishment.",
                  category: "maintenance",
                  priority: "high",
                },
                {
                  task_id: "WEEK2_SEED",
                  task: "Seed selection and treatment",
                  date_from: "2024-01-22",
                  date_to: "2024-01-28",
                  rationale: "Select climate-resilient varieties and treat seeds to prevent diseases.",
                  category: "planting",
                  priority: "high",
                },
              ],
              confidence: 0.87,
            }}
            farmProfile={farmerData}
          />
        </>
      )

    case "map":
      return (
        <div className="min-h-screen bg-dark-primary p-4">
          <DemoBanner />
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-dark-text-primary mb-2">MapTiler Integration</h2>
            <p className="text-dark-text-secondary">Map view with farm locations coming soon...</p>
          </div>
        </div>
      )

    case "verify":
      return (
        <div className="min-h-screen bg-dark-primary p-4">
          <DemoBanner />
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-dark-text-primary mb-2">Action Verification</h2>
            <p className="text-dark-text-secondary">Photo verification system coming soon...</p>
          </div>
        </div>
      )

    case "bulletin":
      return (
        <div className="min-h-screen bg-dark-primary p-4">
          <DemoBanner />
          <div className="text-center py-20">
            <h2 className="text-xl font-semibent text-dark-text-primary mb-2">Kebele Bulletin</h2>
            <p className="text-dark-text-secondary">Bulletin creation system coming soon...</p>
          </div>
        </div>
      )

    default:
      return <EnhancedLandingPage onGetStarted={handleGetStarted} />
  }
}
