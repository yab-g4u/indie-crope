"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Leaf, TrendingUp, ArrowLeft, Clock, CheckCircle } from "lucide-react"

interface CropRecommendation {
  name: string
  expected_profit_min: number
  expected_profit_max: number
  resilience_score: number
}

interface CalendarTask {
  task_id: string
  task: string
  date_from: string
  date_to: string
  rationale: string
}

interface AIResponse {
  top_crops: CropRecommendation[]
  calendar: CalendarTask[]
  confidence: number
}

interface AICropRecommendationsProps {
  farmProfile: any
  onBack: () => void
  onCreateBulletin: (recommendations: AIResponse) => void
}

export function AICropRecommendations({ farmProfile, onBack, onCreateBulletin }: AICropRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<AIResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    generateRecommendations()
  }, [farmProfile])

  const generateRecommendations = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/generate-recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ farmProfile }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate recommendations")
      }

      const data = await response.json()
      setRecommendations(data)
    } catch (err) {
      setError("Failed to generate recommendations. Please try again.")
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-primary p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-accent mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-dark-text-primary mb-2">Analyzing Farm Profile</h2>
            <p className="text-dark-text-secondary">
              IndieCrop AI is processing your farm data against 10-year climate patterns...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !recommendations) {
    return (
      <div className="min-h-screen bg-dark-primary p-4">
        <div className="max-w-4xl mx-auto">
          <Button onClick={onBack} variant="ghost" className="text-dark-accent hover:text-dark-accent-soft mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Card className="bg-dark-secondary border-dark-accent/20">
            <CardContent className="text-center py-12">
              <h2 className="text-xl font-semibold text-dark-text-primary mb-2">Error Generating Recommendations</h2>
              <p className="text-dark-text-secondary mb-4">{error}</p>
              <Button onClick={generateRecommendations} className="neon-gradient text-dark-primary">
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-primary p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button onClick={onBack} variant="ghost" className="text-dark-accent hover:text-dark-accent-soft">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Badge className="bg-dark-accent text-dark-primary">
            AI Confidence: {Math.round(recommendations.confidence * 100)}%
          </Badge>
        </div>

        {/* Farm Summary */}
        <Card className="bg-dark-secondary border-dark-accent/20">
          <CardHeader>
            <CardTitle className="text-dark-text-primary">Farm Profile Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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

        {/* Top Crop Recommendations */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-dark-text-primary">Top Crop Recommendations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.top_crops.map((crop, index) => (
              <Card
                key={crop.name}
                className={`bg-dark-secondary border-dark-accent/20 hover:border-dark-accent/50 transition-all duration-300 ${
                  index === 0 ? "ring-2 ring-dark-accent" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-dark-accent/20 flex items-center justify-center">
                        <Leaf className="h-5 w-5 text-dark-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-dark-text-primary">{crop.name}</CardTitle>
                        <CardDescription className="text-dark-text-secondary">
                          Resilience: {Math.round(crop.resilience_score * 100)}%
                        </CardDescription>
                      </div>
                    </div>
                    {index === 0 && <Badge className="bg-dark-accent text-dark-primary">Recommended</Badge>}
                  </div>
                  <Progress value={crop.resilience_score * 100} className="mt-2" />
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-dark-primary/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-dark-accent" />
                      <span className="text-sm font-medium text-dark-text-primary">Expected Profit</span>
                    </div>
                    <span className="text-sm font-bold text-dark-accent">
                      {crop.expected_profit_min.toLocaleString()} - {crop.expected_profit_max.toLocaleString()} ETB
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 6-Week Action Calendar */}
        <Card className="bg-dark-secondary border-dark-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-dark-text-primary">
              <Calendar className="h-5 w-5" />
              <span>6-Week Action Calendar</span>
            </CardTitle>
            <CardDescription className="text-dark-text-secondary">
              AI-generated actionable tasks based on your farm profile and Jimma climate data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.calendar.map((task, index) => (
                <div
                  key={task.task_id}
                  className="flex items-start space-x-4 p-4 rounded-lg border border-dark-accent/20 hover:border-dark-accent/40 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-dark-accent text-dark-primary flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-dark-text-primary">{task.task}</h4>
                      <div className="flex items-center space-x-2 text-sm text-dark-text-secondary">
                        <Clock className="h-4 w-4" />
                        <span>
                          {new Date(task.date_from).toLocaleDateString()} -{" "}
                          {new Date(task.date_to).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-dark-text-secondary bg-dark-primary/30 p-3 rounded">
                      <strong>Rationale:</strong> {task.rationale}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-dark-accent/50 text-dark-accent hover:bg-dark-accent hover:text-dark-primary bg-transparent"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => onCreateBulletin(recommendations)}
            className="flex-1 neon-gradient text-dark-primary hover:glow-effect transition-all duration-300"
          >
            Create Kebele Bulletin
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-dark-accent/50 text-dark-accent hover:bg-dark-accent hover:text-dark-primary bg-transparent"
          >
            Export Calendar
          </Button>
        </div>
      </div>
    </div>
  )
}
