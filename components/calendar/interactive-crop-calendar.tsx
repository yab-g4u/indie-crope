"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ArrowLeft, ChevronLeft, ChevronRight, Download, Share } from "lucide-react"
import Image from "next/image"

interface CalendarTask {
  task_id: string
  task: string
  date_from: string
  date_to: string
  rationale: string
  category: string
  priority: string
}

interface CropRecommendation {
  name: string
  expected_profit_min: number
  expected_profit_max: number
  resilience_score: number
}

interface CalendarData {
  top_crops: CropRecommendation[]
  calendar: CalendarTask[]
  confidence: number
}

interface InteractiveCropCalendarProps {
  calendarData: CalendarData
  farmProfile?: any
  onBack?: () => void
}

export function InteractiveCropCalendar({ calendarData, farmProfile, onBack }: InteractiveCropCalendarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTask, setSelectedTask] = useState<CalendarTask | null>(null)
  const [currentWeek, setCurrentWeek] = useState(0)

  // Generate calendar weeks
  const generateWeeks = () => {
    const startDate = new Date("2024-08-10")
    const weeks = []

    for (let i = 0; i < 8; i++) {
      const weekStart = new Date(startDate)
      weekStart.setDate(startDate.getDate() + i * 7)
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)

      weeks.push({
        start: weekStart,
        end: weekEnd,
        tasks: calendarData.calendar.filter((task) => {
          const taskStart = new Date(task.date_from)
          return taskStart >= weekStart && taskStart <= weekEnd
        }),
      })
    }

    return weeks
  }

  const weeks = generateWeeks()
  const currentWeekData = weeks[currentWeek]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "planting":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "maintenance":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "harvesting":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "pest_control":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-black" style={{ cursor: "default" }}>
      {/* Header */}
      <header className="border-b bg-black/80 backdrop-blur-md sticky top-0 z-50 border-green-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {onBack && (
              <Button onClick={onBack} variant="ghost" className="text-green-500 hover:text-green-400 mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="h-8 w-8 relative">
              <Image src="/images/indiecrop-logo.png" alt="IndieCrop Logo" width={32} height={32} />
            </div>
            <div>
              <h1 className="font-bold text-lg text-white">Crop Calendar</h1>
              <p className="text-sm text-gray-400">AI-powered farming schedule for optimal yields</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-500/20 text-green-400">
              AI Confidence: {Math.round(calendarData.confidence * 100)}%
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Top Crops Recommendations */}
        <Card className="bg-gray-900 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-white">Recommended Crops</CardTitle>
            <CardDescription className="text-gray-400">Based on your farm profile and local conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {calendarData.top_crops.map((crop, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4 border border-green-500/20">
                  <h3 className="font-semibold text-white mb-2">{crop.name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Expected Profit:</span>
                      <span className="text-green-400">
                        {formatCurrency(crop.expected_profit_min)} - {formatCurrency(crop.expected_profit_max)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Resilience Score:</span>
                      <span className="text-white">{Math.round(crop.resilience_score * 100)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-green-500/30 text-white placeholder-gray-400"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="bg-transparent border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black"
            >
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Weekly View */}
        <Card className="bg-gray-900 border-green-500/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Weekly View</CardTitle>
                <CardDescription className="text-gray-400">
                  Click on tasks to view detailed information and rationale
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
                  disabled={currentWeek === 0}
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-white font-medium">
                  {formatDate(currentWeekData.start)} - {formatDate(currentWeekData.end)}, 2025
                </span>
                <Button
                  onClick={() => setCurrentWeek(Math.min(weeks.length - 1, currentWeek + 1))}
                  disabled={currentWeek === weeks.length - 1}
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-gray-400 font-medium py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 min-h-[200px]">
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const currentDate = new Date(currentWeekData.start)
                currentDate.setDate(currentWeekData.start.getDate() + dayIndex)

                const dayTasks = currentWeekData.tasks.filter((task) => {
                  const taskDate = new Date(task.date_from)
                  return taskDate.toDateString() === currentDate.toDateString()
                })

                return (
                  <div key={dayIndex} className="bg-gray-800 rounded-lg p-2 min-h-[150px]">
                    <div className="text-center mb-2">
                      <span className="text-white font-medium">{currentDate.getDate()}</span>
                    </div>
                    <div className="space-y-1">
                      {dayTasks.map((task) => (
                        <div
                          key={task.task_id}
                          onClick={() => setSelectedTask(task)}
                          className={`p-2 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity ${getCategoryColor(task.category)}`}
                        >
                          <div className="flex items-center space-x-1 mb-1">
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                            <span className="font-medium truncate">{task.task}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Task Details Modal */}
        {selectedTask && (
          <Card className="bg-gray-900 border-green-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Task Details</CardTitle>
                <Button
                  onClick={() => setSelectedTask(null)}
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">{selectedTask.task}</h3>
                <div className="flex items-center space-x-2 mb-3">
                  <Badge className={getCategoryColor(selectedTask.category)}>
                    {selectedTask.category.replace("_", " ")}
                  </Badge>
                  <Badge className={`${getPriorityColor(selectedTask.priority)} text-white`}>
                    {selectedTask.priority} priority
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400 text-sm">Start Date:</span>
                  <p className="text-white">{new Date(selectedTask.date_from).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">End Date:</span>
                  <p className="text-white">{new Date(selectedTask.date_to).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Rationale:</span>
                <p className="text-white mt-1">{selectedTask.rationale}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
