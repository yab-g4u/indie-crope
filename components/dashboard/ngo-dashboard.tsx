"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  Users,
  TrendingUp,
  Send,
  Bot,
  User,
  ArrowLeft,
  Target,
  Download,
  Filter,
  Search,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import Image from "next/image"

interface NGODashboardProps {
  onBack: () => void
}

interface ChatMessage {
  id: string
  type: "user" | "bot"
  message: string
  timestamp: Date
}

interface ProgramData {
  id: string
  name: string
  region: string
  farmers_enrolled: number
  adoption_rate: number
  status: "active" | "planning" | "completed"
  start_date: string
  impact_score: number
}

export function NGODashboard({ onBack }: NGODashboardProps) {
  const [stats, setStats] = useState({
    totalPrograms: 12,
    activeFarmers: 156,
    adoptionRate: 73,
    impactScore: 8.4,
  })

  const [programs, setPrograms] = useState<ProgramData[]>([
    {
      id: "PROG_001",
      name: "Climate-Resilient Crops Program",
      region: "Jimma",
      farmers_enrolled: 89,
      adoption_rate: 87,
      status: "active",
      start_date: "2024-01-15",
      impact_score: 9.2,
    },
    {
      id: "PROG_002",
      name: "Sustainable Agriculture Initiative",
      region: "Oromia",
      farmers_enrolled: 67,
      adoption_rate: 73,
      status: "active",
      start_date: "2024-02-01",
      impact_score: 8.1,
    },
    {
      id: "PROG_003",
      name: "Digital Agriculture Pilot",
      region: "Addis Ababa",
      farmers_enrolled: 34,
      adoption_rate: 45,
      status: "planning",
      start_date: "2024-03-01",
      impact_score: 7.5,
    },
  ])

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      message:
        "Hello! I'm your IndieCrop AI assistant for NGO operations. I can help you analyze program effectiveness, track farmer adoption rates, generate reports, and provide insights on agricultural impact. How can I assist you today?",
      timestamp: new Date(),
    },
  ])

  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: currentMessage,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    const messageToProcess = currentMessage
    setCurrentMessage("")
    setIsTyping(true)

    // Simulate AI response with realistic delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        message: generateAIResponse(messageToProcess),
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("adoption") || message.includes("rate")) {
      return `Current program adoption analysis:

📊 **Overall Adoption Rate: 73%**
- Climate-Resilient Crops Program: 87% (Jimma region)
- Sustainable Agriculture Initiative: 73% (Oromia region)  
- Digital Agriculture Pilot: 45% (Addis Ababa - still ramping up)

**Key Success Factors:**
✅ Field agent support increases adoption by 34%
✅ Local language materials boost engagement by 28%
✅ Peer farmer demonstrations show 41% higher uptake

**Recommendations:**
• Focus on expanding successful Jimma model to other regions
• Increase field agent presence in lower-performing areas
• Implement peer-to-peer learning programs`
    } else if (message.includes("impact") || message.includes("effectiveness") || message.includes("performance")) {
      return `📈 **Program Impact Analysis:**

**Overall Impact Score: 8.4/10**

**Top Performing Program:**
🏆 Climate-Resilient Crops Program (9.2/10)
- 89 farmers enrolled
- 87% adoption rate
- Average yield increase: 42%
- Income improvement: 65%

**Key Impact Metrics:**
• Total farmers reached: 156
• Average income increase: 58%
• Crop yield improvement: 38%
• Climate resilience score: 85%

**Areas for Improvement:**
⚠️ Digital Agriculture Pilot needs more support
⚠️ Consider expanding successful programs to new regions
⚠️ Increase follow-up visits frequency`
    } else if (message.includes("farmer") || message.includes("data") || message.includes("report")) {
      return `👥 **Farmer Engagement Report:**

**Active Farmers: 156 across 3 programs**

**Demographics:**
• Average farm size: 2.3 hectares
• Primary crops: Coffee (45%), Teff (32%), Maize (23%)
• Age distribution: 25-45 years (67%)
• Gender: 58% male, 42% female

**Engagement Metrics:**
📱 Mobile app usage: 78% weekly active
📞 Field agent contact: 89% monthly
📚 Training completion: 82%
💰 Income tracking: 91% report increases

**Top Performing Regions:**
1. Jimma: 89 farmers, 87% adoption
2. Oromia: 67 farmers, 73% adoption
3. Addis Ababa: 34 farmers, 45% adoption

Would you like detailed breakdowns for any specific region or program?`
    } else if (message.includes("recommendation") || message.includes("crop") || message.includes("ai")) {
      return `🤖 **AI Recommendation System Performance:**

**System Accuracy: 87%**
- Crop recommendations: 92% accuracy
- Weather predictions: 84% accuracy  
- Market timing: 81% accuracy

**Most Recommended Crops:**
1. **Teff** - 89% resilience score, high market demand
2. **Coffee** - Premium pricing, export potential
3. **Sorghum** - Drought resistant, food security

**AI Insights Generated:**
📊 1,247 personalized recommendations this month
🌱 Climate-adapted varieties suggested for 78% of farmers
💹 Market timing advice provided to 156 farmers
🌧️ Weather alerts sent to 142 farmers

**Success Stories:**
• Farmer in Jimma increased coffee yield by 65% following AI recommendations
• Teff farmers in Oromia report 43% income increase
• Early weather warnings helped 89% of farmers protect crops

The AI system continuously learns from farmer feedback and local conditions.`
    } else if (message.includes("export") || message.includes("download") || message.includes("generate")) {
      return `📄 **Report Generation Options:**

I can help you generate various reports:

**📊 Program Performance Reports:**
• Adoption rate analysis by region
• Impact assessment summaries
• Farmer engagement metrics
• ROI calculations

**📈 Analytics Reports:**
• Crop recommendation effectiveness
• Weather prediction accuracy
• Market timing success rates
• Yield improvement tracking

**👥 Farmer Reports:**
• Individual farmer progress
• Demographic analysis
• Training completion rates
• Income improvement tracking

**🌍 Regional Reports:**
• Regional performance comparison
• Climate adaptation success
• Local market analysis
• Resource allocation recommendations

Which type of report would you like me to generate? I can create detailed PDF exports with charts and actionable insights.`
    } else if (message.includes("help") || message.includes("what can you")) {
      return `🤖 **I can help you with:**

**📊 Program Analytics:**
• Track adoption rates across regions
• Measure program effectiveness and ROI
• Compare performance between initiatives
• Identify success factors and bottlenecks

**👥 Farmer Management:**
• Monitor farmer engagement and progress
• Analyze demographic trends
• Track training completion rates
• Measure income improvements

**📈 Performance Insights:**
• AI recommendation accuracy analysis
• Crop performance tracking
• Weather prediction effectiveness
• Market timing success rates

**📄 Report Generation:**
• Custom analytics reports
• Program impact assessments
• Farmer progress summaries
• Regional performance comparisons

**💡 Strategic Recommendations:**
• Program optimization suggestions
• Resource allocation advice
• Expansion planning insights
• Risk mitigation strategies

Try asking about specific programs, farmer data, or request a particular type of analysis!`
    } else {
      return `I understand you're asking about NGO operations and program management. I can provide detailed insights on:

• **Program Performance** - adoption rates, impact scores, effectiveness metrics
• **Farmer Analytics** - engagement data, demographics, progress tracking  
• **AI System Performance** - recommendation accuracy, crop success rates
• **Report Generation** - custom analytics, impact assessments, regional comparisons

Could you be more specific about what you'd like to analyze? For example:
- "Show me adoption rates by region"
- "Generate an impact report for the Jimma program"
- "How effective are our AI crop recommendations?"
- "What's the farmer engagement data for this month?"`
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400"
      case "planning":
        return "bg-yellow-500/20 text-yellow-400"
      case "completed":
        return "bg-blue-500/20 text-blue-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "planning":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <Target className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const filteredPrograms = programs.filter(
    (program) =>
      program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.region.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleExportData = () => {
    const exportData = {
      summary: stats,
      programs: programs,
      exportDate: new Date().toISOString(),
      totalFarmers: programs.reduce((sum, p) => sum + p.farmers_enrolled, 0),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ngo-dashboard-export-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b bg-black/80 backdrop-blur-md sticky top-0 z-50 border-green-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button onClick={onBack} variant="ghost" className="text-green-500 hover:text-green-400 mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="h-8 w-8 relative">
              <Image src="/images/indiecrop-logo.png" alt="IndieCrop Logo" width={32} height={32} />
            </div>
            <div>
              <h1 className="font-bold text-lg text-white">IndieCrop</h1>
              <p className="text-sm text-gray-400">NGO/FAO Dashboard</p>
            </div>
          </div>
          <Badge className="bg-green-500 text-black">NGO Access</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gray-900 border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold text-white">{stats.totalPrograms}</p>
                      <p className="text-xs text-gray-400">Active Programs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold text-white">{stats.activeFarmers}</p>
                      <p className="text-xs text-gray-400">Active Farmers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold text-white">{stats.adoptionRate}%</p>
                      <p className="text-xs text-gray-400">Adoption Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold text-white">{stats.impactScore}</p>
                      <p className="text-xs text-gray-400">Impact Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Program Overview */}
            <Card className="bg-gray-900 border-green-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Program Overview</CardTitle>
                    <CardDescription className="text-gray-400">
                      Monitor program effectiveness and farmer engagement
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black bg-transparent"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button onClick={handleExportData} size="sm" className="bg-green-500 hover:bg-green-600 text-black">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search programs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-black border-green-500/30 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredPrograms.map((program) => (
                    <div key={program.id} className="p-4 rounded-lg border border-green-500/20 bg-gray-800/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            {getStatusIcon(program.status)}
                          </div>
                          <div>
                            <p className="font-medium text-white">{program.name}</p>
                            <p className="text-sm text-gray-400">
                              {program.region} Region • {program.farmers_enrolled} farmers enrolled
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(program.status)}>{program.status}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Adoption Rate</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={program.adoption_rate} className="flex-1" />
                            <span className="text-sm font-medium text-white">{program.adoption_rate}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Impact Score</p>
                          <p className="text-lg font-semibold text-green-400">{program.impact_score}/10</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Start Date</p>
                          <p className="text-sm text-white">{new Date(program.start_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredPrograms.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No programs found matching your search.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Chatbot */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-green-500/20 h-[700px] flex flex-col sticky top-24">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Bot className="h-5 w-5 text-green-500" />
                  <span>AI Assistant</span>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Get insights on program effectiveness and farmer data
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Chat Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[85%] rounded-lg p-3 ${
                            msg.type === "user"
                              ? "bg-green-500 text-black"
                              : "bg-gray-800 text-white border border-green-500/20"
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {msg.type === "bot" && <Bot className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />}
                            {msg.type === "user" && <User className="h-4 w-4 text-black mt-0.5 flex-shrink-0" />}
                            <div className="text-sm whitespace-pre-wrap">{msg.message}</div>
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
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask about program analytics, adoption rates..."
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="bg-black border-green-500/30 text-white"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!currentMessage.trim() || isTyping}
                      className="bg-green-500 hover:bg-green-600 text-black"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
