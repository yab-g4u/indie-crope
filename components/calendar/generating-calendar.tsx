"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Calendar, Leaf, TrendingUp, CheckCircle, Sparkles } from "lucide-react"

interface GeneratingCalendarProps {
  farmProfile: any
  onComplete: (recommendations: any) => void
}

const generationSteps = [
  {
    id: 1,
    title: "Analyzing Farm Profile",
    description: "Processing soil type, altitude, and historical yields",
    icon: Brain,
    duration: 2000,
  },
  {
    id: 2,
    title: "Climate Data Processing",
    description: "Analyzing 10-year weather patterns for Jimma region",
    icon: TrendingUp,
    duration: 2500,
  },
  {
    id: 3,
    title: "Crop Matching",
    description: "Identifying optimal climate-resilient crops",
    icon: Leaf,
    duration: 2000,
  },
  {
    id: 4,
    title: "Calendar Generation",
    description: "Creating 6-week actionable farming schedule",
    icon: Calendar,
    duration: 1500,
  },
]

export function GeneratingCalendar({ farmProfile, onComplete }: GeneratingCalendarProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let stepTimer: NodeJS.Timeout
    let progressTimer: NodeJS.Timeout

    const runStep = (stepIndex: number) => {
      if (stepIndex >= generationSteps.length) {
        setIsComplete(true)
        setTimeout(() => {
          // Generate mock recommendations
          const mockRecommendations = {
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
                rationale: `For ${farmProfile.soil_type} soil at ${farmProfile.altitude_meters}m altitude, proper land preparation is crucial for optimal crop establishment.`,
                category: "maintenance",
                priority: "high",
              },
              {
                task_id: "WEEK2_SEED",
                task: "Seed selection and treatment",
                date_from: "2024-01-22",
                date_to: "2024-01-28",
                rationale:
                  "Select climate-resilient varieties suitable for Jimma's rainfall pattern and treat seeds to prevent diseases.",
                category: "planting",
                priority: "high",
              },
              {
                task_id: "WEEK3_PLANT",
                task: "Planting and initial irrigation",
                date_from: "2024-01-29",
                date_to: "2024-02-04",
                rationale: `Optimal planting window for ${farmProfile.water_source} water source, considering the wet season timing.`,
                category: "planting",
                priority: "high",
              },
              {
                task_id: "WEEK4_FERT",
                task: "First fertilizer application",
                date_from: "2024-02-05",
                date_to: "2024-02-11",
                rationale: `Apply organic fertilizer suitable for ${farmProfile.soil_type} soil to support early growth phase.`,
                category: "fertilizer",
                priority: "medium",
              },
              {
                task_id: "WEEK5_WEED",
                task: "Weeding and pest monitoring",
                date_from: "2024-02-12",
                date_to: "2024-02-18",
                rationale: "Critical period for weed control and pest monitoring during the humid season in Jimma.",
                category: "maintenance",
                priority: "medium",
              },
              {
                task_id: "WEEK6_WATER",
                task: "Irrigation management and growth assessment",
                date_from: "2024-02-19",
                date_to: "2024-02-25",
                rationale:
                  "Monitor soil moisture and adjust irrigation based on rainfall patterns and crop development stage.",
                category: "irrigation",
                priority: "medium",
              },
            ],
            confidence: 0.87,
          }
          onComplete(mockRecommendations)
        }, 1000)
        return
      }

      setCurrentStep(stepIndex)
      const step = generationSteps[stepIndex]

      // Animate progress for current step
      let currentProgress = (stepIndex / generationSteps.length) * 100
      const targetProgress = ((stepIndex + 1) / generationSteps.length) * 100
      const progressIncrement = (targetProgress - currentProgress) / (step.duration / 50)

      progressTimer = setInterval(() => {
        currentProgress += progressIncrement
        setProgress(Math.min(currentProgress, targetProgress))
      }, 50)

      stepTimer = setTimeout(() => {
        clearInterval(progressTimer)
        runStep(stepIndex + 1)
      }, step.duration)
    }

    runStep(0)

    return () => {
      clearTimeout(stepTimer)
      clearInterval(progressTimer)
    }
  }, [farmProfile, onComplete])

  return (
    <div className="min-h-screen bg-dark-primary p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="h-16 w-16 rounded-full bg-dark-accent/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="h-8 w-8 text-dark-accent animate-spin" />
          </div>
          <h1 className="text-3xl font-bold text-dark-text-primary mb-2">IndieCrop AI Processing</h1>
          <p className="text-dark-text-secondary">
            Generating personalized crop recommendations for {farmProfile.farmer_name}
          </p>
        </div>

        {/* Progress Card */}
        <Card className="bg-dark-secondary border-dark-accent/20">
          <CardHeader>
            <CardTitle className="text-dark-text-primary">AI Analysis Progress</CardTitle>
            <Progress value={progress} className="mt-2" />
            <div className="text-right text-sm text-dark-text-secondary">{Math.round(progress)}% Complete</div>
          </CardHeader>
          <CardContent className="space-y-6">
            {generationSteps.map((step, index) => {
              const isActive = index === currentStep
              const isCompleted = index < currentStep || isComplete
              const isPending = index > currentStep && !isComplete

              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                    isActive
                      ? "bg-dark-accent/20 border border-dark-accent/50 scale-105"
                      : isCompleted
                        ? "bg-dark-primary/50 border border-dark-accent/30"
                        : "bg-dark-primary/30 border border-dark-accent/10"
                  }`}
                >
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? "bg-dark-accent text-dark-primary animate-pulse"
                        : isCompleted
                          ? "bg-dark-accent/80 text-dark-primary"
                          : "bg-dark-accent/20 text-dark-accent"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <step.icon className={`h-6 w-6 ${isActive ? "animate-bounce" : ""}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold transition-colors duration-300 ${
                        isActive
                          ? "text-dark-accent"
                          : isCompleted
                            ? "text-dark-text-primary"
                            : "text-dark-text-secondary"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isActive || isCompleted ? "text-dark-text-secondary" : "text-dark-text-secondary/60"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                  {isActive && (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-dark-accent rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-dark-accent rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-dark-accent rounded-full animate-bounce delay-200" />
                    </div>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Farm Profile Summary */}
        <Card className="bg-dark-secondary border-dark-accent/20">
          <CardHeader>
            <CardTitle className="text-dark-text-primary">Farm Profile Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-dark-text-secondary">Farmer:</span>
                <p className="font-medium text-dark-text-primary">{farmProfile.farmer_name}</p>
              </div>
              <div>
                <span className="text-dark-text-secondary">Kebele:</span>
                <p className="font-medium text-dark-text-primary">{farmProfile.kebele}</p>
              </div>
              <div>
                <span className="text-dark-text-secondary">Soil Type:</span>
                <p className="font-medium text-dark-text-primary capitalize">{farmProfile.soil_type}</p>
              </div>
              <div>
                <span className="text-dark-text-secondary">Altitude:</span>
                <p className="font-medium text-dark-text-primary">{farmProfile.altitude_meters}m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {isComplete && (
          <div className="text-center">
            <Badge className="bg-dark-accent text-dark-primary animate-pulse">
              ✨ Recommendations Generated Successfully!
            </Badge>
          </div>
        )}
      </div>
    </div>
  )
}
