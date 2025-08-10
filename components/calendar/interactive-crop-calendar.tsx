"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Share,
  Bot,
  Send,
  User,
  CalendarIcon,
  Lightbulb,
  CheckCircle,
} from "lucide-react"
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

interface ChatMessage {
  id: string
  type: "user" | "bot"
  message: string
  timestamp: Date
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
  const [showAIChat, setShowAIChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      message:
        "Hello! I'm your IndieCrop AI assistant. I can help you understand your crop calendar, explain recommendations, and answer farming questions. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

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

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    const message = userMessage.toLowerCase()

    // Simulate AI processing with contextual responses
    if (message.includes("task") || message.includes("calendar")) {
      return `Based on your current calendar, you have ${calendarData.calendar.length} scheduled tasks. The most critical upcoming task is "${calendarData.calendar[0]?.task}" scheduled for ${new Date(calendarData.calendar[0]?.date_from).toLocaleDateString()}. This is important because: ${calendarData.calendar[0]?.rationale}`
    } else if (message.includes("crop") || message.includes("recommend")) {
      const topCrop = calendarData.top_crops[0]
      return `Your top recommended crop is ${topCrop.name} with an expected profit range of ${formatCurrency(topCrop.expected_profit_min)} - ${formatCurrency(topCrop.expected_profit_max)}. This crop has a ${Math.round(topCrop.resilience_score * 100)}% resilience score, making it well-suited for your local conditions and climate patterns.`
    } else if (message.includes("weather") || message.includes("climate")) {
      return "Based on current weather patterns and climate data for your region, I recommend monitoring rainfall closely. The upcoming season shows favorable conditions for your recommended crops. Consider implementing water conservation techniques and be prepared for potential dry spells in the later growing season."
    } else if (message.includes("profit") || message.includes("income")) {
      const totalProfit = calendarData.top_crops.reduce((sum, crop) => sum + crop.expected_profit_max, 0)
      return `Based on your crop recommendations, your potential total income could reach ${formatCurrency(totalProfit)} if you follow the suggested planting schedule and best practices. Coffee shows the highest profit potential, followed by Teff and Maize.`
    } else if (message.includes("help") || message.includes("how")) {
      return "I can help you with: 1) Understanding your crop calendar and task priorities, 2) Explaining crop recommendations and profit potential, 3) Weather and climate guidance, 4) Best farming practices for your region, 5) Market timing and harvest planning. What specific area would you like to explore?"
    } else {
      return "I understand you're asking about farming practices. Could you be more specific? I can help with crop calendar questions, recommendation explanations, weather guidance, or farming best practices. Try asking about your upcoming tasks, crop profitability, or weather conditions."
    }
  }

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: currentMessage,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setCurrentMessage("")
    setIsTyping(true)

    // Simulate AI processing time
    setTimeout(async () => {
      const response = await generateAIResponse(currentMessage)
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        message: response,
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleExport = () => {
    const calendarText = `
INDIECROP CROP CALENDAR EXPORT
Generated: ${new Date().toLocaleDateString()}
Confidence Score: ${Math.round(calendarData.confidence * 100)}%

RECOMMENDED CROPS:
${calendarData.top_crops
  .map(
    (crop) =>
      `- ${crop.name}: ${formatCurrency(crop.expected_profit_min)} - ${formatCurrency(crop.expected_profit_max)} (Resilience: ${Math.round(crop.resilience_score * 100)}%)`,
  )
  .join("\n")}

CALENDAR TASKS:
${calendarData.calendar
  .map(
    (task) =>
      `${new Date(task.date_from).toLocaleDateString()} - ${task.task} (${task.priority} priority)\n  Rationale: ${task.rationale}`,
  )
  .join("\n\n")}
    `.trim()

    const blob = new Blob([calendarText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `crop-calendar-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "IndieCrop Crop Calendar",
        text: `My personalized crop calendar shows ${calendarData.top_crops.length} recommended crops with ${Math.round(calendarData.confidence * 100)}% AI confidence.`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Calendar link copied to clipboard!")
    }
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
              <h1 className="font-bold text-lg text-white">AI Crop Calendar</h1>
              <p className="text-sm text-gray-400">Personalized farming schedule with AI insights</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-500/20 text-green-400">
              AI Confidence: {Math.round(calendarData.confidence * 100)}%
            </Badge>
            <Button
              onClick={() => setShowAIChat(!showAIChat)}
              variant="outline"
              className="border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black bg-transparent"
            >
              <Bot className="h-4 w-4 mr-2" />
              AI Assistant
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Calendar Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Crops Recommendations */}
            <Card className="bg-gray-900 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-green-500" />
                  AI Crop Recommendations
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Optimized for your farm conditions and market potential
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {calendarData.top_crops.map((crop, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-4 border border-green-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-white">{crop.name}</h3>
                        <Badge className="bg-green-500/20 text-green-400">#{index + 1}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Expected Profit:</span>
                          <span className="text-green-400 font-medium">
                            {formatCurrency(crop.expected_profit_min)} - {formatCurrency(crop.expected_profit_max)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Climate Resilience:</span>
                          <span className="text-white font-medium">{Math.round(crop.resilience_score * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${crop.resilience_score * 100}%` }}
                          ></div>
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
                  onClick={handleExport}
                  variant="outline"
                  className="bg-transparent border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button
                  onClick={handleShare}
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
                    <CardTitle className="text-white flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2 text-green-500" />
                      Weekly Schedule
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Click on tasks to view detailed information and AI insights
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

            {/* Task Details */}
            {selectedTask && (
              <Card className="bg-gray-900 border-green-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      Task Details
                    </CardTitle>
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
                    <span className="text-gray-400 text-sm">AI Rationale:</span>
                    <p className="text-white mt-1">{selectedTask.rationale}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* AI Chat Sidebar */}
          {showAIChat && (
            <div className="lg:col-span-1">
              <Card className="bg-gray-900 border-green-500/20 h-[600px] flex flex-col sticky top-24">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Bot className="h-5 w-5 text-green-500" />
                    <span>AI Assistant</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Ask about your calendar, crops, or farming advice
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col p-0">
                  {/* Chat Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              msg.type === "user"
                                ? "bg-green-500 text-black"
                                : "bg-gray-800 text-white border border-green-500/20"
                            }`}
                          >
                            <div className="flex items-start space-x-2">
                              {msg.type === "bot" && <Bot className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />}
                              {msg.type === "user" && <User className="h-4 w-4 text-black mt-0.5 flex-shrink-0" />}
                              <p className="text-sm">{msg.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-gray-800 text-white border border-green-500/20 rounded-lg p-3">
                            <div className="flex items-center space-x-2">
                              <Bot className="h-4 w-4 text-green-500" />
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-green-500/20">
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Ask about your calendar, crop recommendations, weather, or farming advice..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSendMessage())
                        }
                        className="bg-black border-green-500/30 text-white resize-none"
                        rows={2}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim() || isTyping}
                        className="w-full bg-green-500 hover:bg-green-600 text-black"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
