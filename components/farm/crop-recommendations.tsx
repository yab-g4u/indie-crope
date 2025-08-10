"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Droplets, TrendingUp, Calendar, Clock, Leaf, DollarSign } from "lucide-react"
import type { CropRecommendation } from "@/lib/types"

interface CropRecommendationsProps {
  farmId: string
  onShowCalendar: (crop: CropRecommendation) => void
  onLogAction: (action: string) => void
}

export function CropRecommendations({ farmId, onShowCalendar, onLogAction }: CropRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRecommendations([
        {
          name: "Teff",
          score: 92,
          expected_profit_min: 15000,
          expected_profit_max: 25000,
          water_per_kg: 2.1,
          plant_before: "2024-06-15",
        },
        {
          name: "Maize",
          score: 87,
          expected_profit_min: 12000,
          expected_profit_max: 20000,
          water_per_kg: 1.8,
          plant_before: "2024-05-30",
        },
        {
          name: "Sorghum",
          score: 84,
          expected_profit_min: 10000,
          expected_profit_max: 18000,
          water_per_kg: 1.3,
          plant_before: "2024-06-20",
        },
      ])
      setLoading(false)
    }, 1500)
  }, [farmId])

  const getDaysUntilPlanting = (plantBefore: string) => {
    const today = new Date()
    const plantDate = new Date(plantBefore)
    const diffTime = plantDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/3 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2 mb-4" />
              <div className="h-2 bg-muted rounded w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Top Crop Recommendations</h2>
        <p className="text-muted-foreground">AI-powered suggestions for Farm {farmId}</p>
      </div>

      {recommendations.map((crop, index) => {
        const daysLeft = getDaysUntilPlanting(crop.plant_before)
        const isUrgent = daysLeft <= 7

        return (
          <Card
            key={crop.name}
            className={`transition-all duration-300 hover:shadow-lg ${index === 0 ? "ring-2 ring-agri-500" : ""}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-agri-100 dark:bg-agri-900 flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-agri-600 dark:text-agri-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{crop.name}</CardTitle>
                    <CardDescription>PR-Score: {crop.score}/100</CardDescription>
                  </div>
                </div>
                {index === 0 && <Badge className="bg-agri-500">Recommended</Badge>}
              </div>
              <Progress value={crop.score} className="mt-2" />
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Profit Range */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Expected Profit</span>
                </div>
                <span className="text-sm font-bold">
                  {crop.expected_profit_min.toLocaleString()} - {crop.expected_profit_max.toLocaleString()} ETB
                </span>
              </div>

              {/* Water Efficiency */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Water per kg</span>
                </div>
                <span className="text-sm font-bold">{crop.water_per_kg}L</span>
              </div>

              {/* Plant Before */}
              <div
                className={`flex items-center justify-between p-3 rounded-lg ${isUrgent ? "bg-orange-100 dark:bg-orange-900/20" : "bg-muted/50"}`}
              >
                <div className="flex items-center space-x-2">
                  <Clock className={`h-4 w-4 ${isUrgent ? "text-orange-600" : "text-muted-foreground"}`} />
                  <span className="text-sm font-medium">Plant Before</span>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold ${isUrgent ? "text-orange-600" : ""}`}>
                    {new Date(crop.plant_before).toLocaleDateString()}
                  </span>
                  <p className={`text-xs ${isUrgent ? "text-orange-600" : "text-muted-foreground"}`}>
                    {daysLeft > 0 ? `${daysLeft} days left` : "Overdue"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button
                  onClick={() => onShowCalendar(crop)}
                  className="flex-1"
                  variant={index === 0 ? "default" : "outline"}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Show Calendar
                </Button>
                <Button onClick={() => onLogAction("planting")} variant="outline" size="sm">
                  Log Planting
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Button onClick={() => onLogAction("photo")} variant="outline" className="h-16 flex-col space-y-1">
          <TrendingUp className="h-5 w-5" />
          <span className="text-sm">Upload Photo</span>
        </Button>
        <Button onClick={() => onLogAction("harvest")} variant="outline" className="h-16 flex-col space-y-1">
          <Leaf className="h-5 w-5" />
          <span className="text-sm">Log Harvest</span>
        </Button>
      </div>
    </div>
  )
}
