"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search,
  Moon,
  Sun,
  MessageCircle,
  Send,
  X,
  Leaf,
  Clock,
  AlertCircle,
} from "lucide-react"
import { useTheme } from "next-themes"

interface CalendarTask {
  task_id: string
  task: string
  date_from: string
  date_to: string
  rationale: string
  priority?: "high" | "medium" | "low"
  category?: "planting" | "irrigation" | "fertilizer" | "harvest" | "maintenance"
}

interface CropCalendarData {
  top_crops: Array<{
    name: string
    expected_profit_min: number
    expected_profit_max: number
    resilience_score: number
  }>
  calendar: CalendarTask[]
  confidence: number
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface InteractiveCropCalendarProps {
  calendarData: CropCalendarData
  farmProfile?: any
}

export function InteractiveCropCalendar({ calendarData, farmProfile }: InteractiveCropCalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedTask, setSelectedTask] = useState<CalendarTask | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredTasks, setFilteredTasks] = useState<CalendarTask[]>(calendarData.calendar)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your AI farming assistant. Ask me anything about your crop calendar, tasks, or farming advice!",
      timestamp: new Date(),
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { theme, setTheme } = useTheme()
  const chatScrollRef = useRef<HTMLDivElement>(null)

  // Get week dates
  const getWeekDates = (date: Date) => {
    const week = []
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay())

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day)
    }
    return week
  }

  const weekDates = getWeekDates(currentWeek)

  // Filter tasks based on search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTasks(calendarData.calendar)
    } else {
      const filtered = calendarData.calendar.filter(
        (task) =>
          task.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.rationale.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredTasks(filtered)
    }
  }, [searchQuery, calendarData.calendar])

  // Get tasks for a specific date
  const getTasksForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return filteredTasks.filter((task) => {
      const taskStart = new Date(task.date_from)
      const taskEnd = new Date(task.date_to)
      const currentDate = new Date(dateStr)
      return currentDate >= taskStart && currentDate <= taskEnd
    })
  }

  // Task category colors
  const getTaskColor = (category: string) => {
    switch (category) {
      case "planting":
        return "bg-green-500 hover:bg-green-600"
      case "irrigation":
        return "bg-blue-500 hover:bg-blue-600"
      case "fertilizer":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "harvest":
        return "bg-orange-500 hover:bg-orange-600"
      case "maintenance":
        return "bg-purple-500 hover:bg-purple-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  // Navigation
  const navigateWeek = (direction: "prev" | "next") => {
    const newWeek = new Date(currentWeek)
    newWeek.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7))
    setCurrentWeek(newWeek)
  }

  // Chat functionality
  const handleSendMessage = async () => {
    if (!chatInput.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setChatInput("")
    setIsLoading(true)

    try {
      // Simulate AI response (in real app, call your AI API)
      const response = await generateAIResponse(chatInput, calendarData, farmProfile)
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setChatMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
    }
  }, [chatMessages])

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-green-500" />
            <span>Crop Calendar</span>
          </h1>
          <p className="text-muted-foreground">AI-powered farming schedule for optimal yields</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          <Badge className="bg-green-500 text-white">AI Confidence: {Math.round(calendarData.confidence * 100)}%</Badge>
        </div>
      </div>

      {/* Search and Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => navigateWeek("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium min-w-[200px] text-center">
            {weekDates[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
            {weekDates[6].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </div>
          <Button variant="outline" size="icon" onClick={() => navigateWeek("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly View</CardTitle>
          <CardDescription>Click on tasks to view detailed information and rationale</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-medium text-sm text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 min-h-[400px]">
            {weekDates.map((date, index) => {
              const tasks = getTasksForDate(date)
              const isToday = date.toDateString() === new Date().toDateString()

              return (
                <div
                  key={index}
                  className={`border rounded-lg p-2 min-h-[120px] ${
                    isToday ? "bg-green-50 dark:bg-green-950 border-green-500" : "bg-card"
                  }`}
                >
                  <div className={`text-sm font-medium mb-2 ${isToday ? "text-green-600" : ""}`}>{date.getDate()}</div>
                  <div className="space-y-1">
                    {tasks.map((task) => (
                      <button
                        key={task.task_id}
                        onClick={() => setSelectedTask(task)}
                        className={`w-full text-left p-1 rounded text-xs text-white transition-all duration-200 hover:scale-105 ${getTaskColor(
                          task.category || "maintenance",
                        )}`}
                        aria-label={`Task: ${task.task}`}
                      >
                        <div className="truncate font-medium">{task.task}</div>
                        {task.priority === "high" && <AlertCircle className="h-3 w-3 inline-block ml-1" />}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Task Detail Modal */}
      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Leaf className="h-5 w-5 text-green-500" />
              <span>{selectedTask?.task}</span>
            </DialogTitle>
            <DialogDescription>
              {selectedTask?.date_from} to {selectedTask?.date_to}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Duration:{" "}
                {selectedTask &&
                  Math.ceil(
                    (new Date(selectedTask.date_to).getTime() - new Date(selectedTask.date_from).getTime()) /
                      (1000 * 60 * 60 * 24),
                  )}{" "}
                days
              </span>
            </div>
            <div>
              <h4 className="font-medium mb-2">Why this task is important:</h4>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{selectedTask?.rationale}</p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" className="flex-1">
                Mark Complete
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                Set Reminder
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Chat Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        {!isChatOpen ? (
          <Button
            onClick={() => setIsChatOpen(true)}
            size="lg"
            className="rounded-full h-14 w-14 bg-green-500 hover:bg-green-600 shadow-lg"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        ) : (
          <Card className="w-80 h-96 shadow-xl">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">AI Farm Assistant</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-full">
              <ScrollArea className="flex-1 p-4" ref={chatScrollRef}>
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm ${
                          message.role === "user" ? "bg-green-500 text-white" : "bg-muted text-foreground"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Ask about your crops..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className="min-h-[40px] resize-none"
                    rows={1}
                  />
                  <Button onClick={handleSendMessage} disabled={isLoading || !chatInput.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// AI Response Generator (mock implementation)
async function generateAIResponse(question: string, calendarData: CropCalendarData, farmProfile: any): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const lowerQuestion = question.toLowerCase()

  // Context-aware responses based on calendar data
  if (lowerQuestion.includes("water") || lowerQuestion.includes("irrigation")) {
    return `Based on your farm profile with ${farmProfile?.soil_type || "loamy"} soil at ${
      farmProfile?.altitude_meters || 1780
    }m altitude, I recommend checking soil moisture levels every 2-3 days. Your irrigation tasks are scheduled optimally considering Jimma's rainfall patterns. During dry periods, ensure deep watering rather than frequent shallow watering.`
  }

  if (lowerQuestion.includes("next week") || lowerQuestion.includes("prepare")) {
    const nextWeekTasks = calendarData.calendar.filter((task) => {
      const taskDate = new Date(task.date_from)
      const nextWeek = new Date()
      nextWeek.setDate(nextWeek.getDate() + 7)
      return taskDate <= nextWeek && taskDate >= new Date()
    })

    if (nextWeekTasks.length > 0) {
      return `For next week, you have ${nextWeekTasks.length} important tasks: ${nextWeekTasks
        .map((t) => t.task)
        .join(", ")}. Make sure to prepare your tools and check weather conditions beforehand.`
    }
  }

  if (lowerQuestion.includes("why") || lowerQuestion.includes("important")) {
    return `Each task in your calendar is carefully timed based on 10-year climate data for Jimma, Ethiopia. The AI considers your specific soil type, altitude, and historical yields to optimize timing. Following this schedule can increase your yields by 15-25% compared to traditional methods.`
  }

  if (lowerQuestion.includes("crop") || lowerQuestion.includes("plant")) {
    const topCrop = calendarData.top_crops[0]
    return `Your top recommended crop is ${topCrop.name} with a resilience score of ${Math.round(
      topCrop.resilience_score * 100,
    )}%. Expected profit range is ${topCrop.expected_profit_min.toLocaleString()}-${topCrop.expected_profit_max.toLocaleString()} ETB. This crop is well-suited for your farm conditions.`
  }

  // Default response
  return `I'm here to help with your farming questions! I can provide advice about your crop calendar, irrigation schedules, soil management, and more. What specific aspect of farming would you like to know about?`
}
