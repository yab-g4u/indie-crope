"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QrCode, MapPin, Users, Calendar, Camera, Map, FileText, Plus } from "lucide-react"
import Image from "next/image"

interface DashboardStats {
  farmsVisitedToday: number
  weeklyAdoption: number
  totalFarms: number
  pendingVerifications: number
}

interface FieldAgentDashboardProps {
  onScanQR: () => void
  onViewMap: () => void
  onCreateBulletin: () => void
  onVerifyAction: () => void
}

export function FieldAgentDashboard({
  onScanQR,
  onViewMap,
  onCreateBulletin,
  onVerifyAction,
}: FieldAgentDashboardProps) {
  const [stats, setStats] = useState<DashboardStats>({
    farmsVisitedToday: 0,
    weeklyAdoption: 0,
    totalFarms: 0,
    pendingVerifications: 0,
  })

  useEffect(() => {
    // Start with empty stats for new field agents
    setStats({
      farmsVisitedToday: 0,
      weeklyAdoption: 0,
      totalFarms: 0,
      pendingVerifications: 0,
    })
  }, [])

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Header */}
      <header className="border-b bg-dark-secondary/80 backdrop-blur-md sticky top-0 z-50 border-dark-accent/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 relative">
              <Image src="/images/indiecrop-logo.png" alt="IndieCrop Logo" width={32} height={32} />
            </div>
            <div>
              <h1 className="font-bold text-lg text-dark-text-primary">IndieCrop</h1>
              <p className="text-sm text-dark-text-secondary">Field Agent Dashboard</p>
            </div>
          </div>
          <Badge className="bg-dark-accent text-dark-primary">Field Agent</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-dark-secondary border-dark-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-dark-accent" />
                <div>
                  <p className="text-2xl font-bold text-dark-text-primary">{stats.farmsVisitedToday}</p>
                  <p className="text-xs text-dark-text-secondary">Farms Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-secondary border-dark-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-dark-accent" />
                <div>
                  <p className="text-2xl font-bold text-dark-text-primary">{stats.weeklyAdoption}%</p>
                  <p className="text-xs text-dark-text-secondary">Weekly Adoption</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-secondary border-dark-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-dark-accent" />
                <div>
                  <p className="text-2xl font-bold text-dark-text-primary">{stats.totalFarms}</p>
                  <p className="text-xs text-dark-text-secondary">Total Farms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-secondary border-dark-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-dark-accent" />
                <div>
                  <p className="text-2xl font-bold text-dark-text-primary">{stats.pendingVerifications}</p>
                  <p className="text-xs text-dark-text-secondary">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-dark-secondary border-dark-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-dark-text-primary">
              <QrCode className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                onClick={onScanQR}
                className="h-20 flex-col space-y-2 neon-gradient text-dark-primary hover:glow-effect transition-all duration-300"
              >
                <QrCode className="h-6 w-6" />
                <span className="text-sm">Scan Farm QR</span>
              </Button>

              <Button
                onClick={onVerifyAction}
                variant="outline"
                className="h-20 flex-col space-y-2 bg-transparent border-dark-accent/50 text-dark-accent hover:bg-dark-accent hover:text-dark-primary transition-all duration-300"
              >
                <Camera className="h-6 w-6" />
                <span className="text-sm">Verify Action</span>
              </Button>

              <Button
                onClick={onViewMap}
                variant="outline"
                className="h-20 flex-col space-y-2 bg-transparent border-dark-accent/50 text-dark-accent hover:bg-dark-accent hover:text-dark-primary transition-all duration-300"
              >
                <Map className="h-6 w-6" />
                <span className="text-sm">View Map</span>
              </Button>

              <Button
                onClick={onCreateBulletin}
                variant="outline"
                className="h-20 flex-col space-y-2 bg-transparent border-dark-accent/50 text-dark-accent hover:bg-dark-accent hover:text-dark-primary transition-all duration-300"
              >
                <FileText className="h-6 w-6" />
                <span className="text-sm">Create Bulletin</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Farms - Empty State */}
        <Card className="bg-dark-secondary border-dark-accent/20">
          <CardHeader>
            <CardTitle className="text-dark-text-primary">Recent Farm Visits</CardTitle>
            <CardDescription className="text-dark-text-secondary">Your latest farm interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="h-16 w-16 rounded-full bg-dark-accent/20 flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-dark-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-dark-text-primary">No farm visits yet</h3>
              <p className="text-dark-text-secondary mb-4">
                Start by scanning a farm QR code to begin your first assessment
              </p>
              <Button onClick={onScanQR} className="neon-gradient text-dark-primary">
                <QrCode className="mr-2 h-4 w-4" />
                Scan Your First Farm
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
