"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QrCode, MapPin, TrendingUp, Users, Calendar, Camera, Map, FileText } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface DashboardStats {
  farmsVisitedToday: number
  weeklyAdoption: number
  totalFarms: number
  pendingVerifications: number
}

export function AgentDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    farmsVisitedToday: 0,
    weeklyAdoption: 0,
    totalFarms: 0,
    pendingVerifications: 0,
  })

  const recentFarms = [
    { id: "F001", name: "Alemayehu Tadesse", kebele: "Debre Zeit", lastVisit: "2 hours ago", status: "verified" },
    { id: "F002", name: "Meseret Bekele", kebele: "Bishoftu", lastVisit: "1 day ago", status: "pending" },
    { id: "F003", name: "Hailu Worku", kebele: "Dukem", lastVisit: "2 days ago", status: "verified" },
  ]

  useEffect(() => {
    // Simulate loading stats
    setStats({
      farmsVisitedToday: 8,
      weeklyAdoption: 73,
      totalFarms: 156,
      pendingVerifications: 12,
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-50 to-earth-50 dark:from-agri-950 dark:to-earth-950">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-agri-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A+</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">AgroLedger+</h1>
              <p className="text-sm text-muted-foreground">Field Agent Dashboard</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-effect">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-agri-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.farmsVisitedToday}</p>
                  <p className="text-xs text-muted-foreground">Farms Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-agri-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.weeklyAdoption}%</p>
                  <p className="text-xs text-muted-foreground">Weekly Adoption</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-agri-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalFarms}</p>
                  <p className="text-xs text-muted-foreground">Total Farms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.pendingVerifications}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <QrCode className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-20 flex-col space-y-2 agri-gradient text-white">
                <QrCode className="h-6 w-6" />
                <span className="text-sm">Scan Farm QR</span>
              </Button>

              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                <Camera className="h-6 w-6" />
                <span className="text-sm">Verify Action</span>
              </Button>

              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                <Map className="h-6 w-6" />
                <span className="text-sm">View Map</span>
              </Button>

              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                <FileText className="h-6 w-6" />
                <span className="text-sm">Create Bulletin</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Farms */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Farm Visits</CardTitle>
            <CardDescription>Your latest farm interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFarms.map((farm) => (
                <div key={farm.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-agri-100 dark:bg-agri-900 flex items-center justify-center">
                      <span className="text-sm font-medium text-agri-700 dark:text-agri-300">
                        {farm.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{farm.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {farm.kebele} • {farm.lastVisit}
                      </p>
                    </div>
                  </div>
                  <Badge variant={farm.status === "verified" ? "default" : "secondary"}>{farm.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
