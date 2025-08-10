"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Camera, Map, FileText, Plus, User, ArrowLeft, MapPin } from "lucide-react"
import Image from "next/image"

interface DashboardStats {
  farmsVisitedToday: number
  weeklyAdoption: number
  totalFarms: number
  pendingVerifications: number
}

interface FieldAgentDashboardProps {
  onCollectData: () => void
  onViewMap: () => void
  onCreateBulletin: () => void
  onVerifyAction: () => void
  onBack?: () => void
}

export function FieldAgentDashboard({
  onCollectData,
  onViewMap,
  onCreateBulletin,
  onVerifyAction,
  onBack,
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
    <div className="min-h-screen bg-black">
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
              <h1 className="font-bold text-lg text-white">IndieCrop</h1>
              <p className="text-sm text-gray-400">Field Agent Dashboard</p>
            </div>
          </div>
          <Badge className="bg-green-500 text-black">Field Agent</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gray-900 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-white">{stats.farmsVisitedToday}</p>
                  <p className="text-xs text-gray-400">Farms Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-white">{stats.weeklyAdoption}%</p>
                  <p className="text-xs text-gray-400">Weekly Adoption</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-white">{stats.totalFarms}</p>
                  <p className="text-xs text-gray-400">Total Farms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-white">{stats.pendingVerifications}</p>
                  <p className="text-xs text-gray-400">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MapTiler Integration */}
        <Card className="bg-gray-900 border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Map className="h-5 w-5" />
              <span>Farm Locations - Ethiopia</span>
            </CardTitle>
            <CardDescription className="text-gray-400">Interactive satellite map of registered farms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-800 rounded-lg border border-green-500/20 relative overflow-hidden">
              <iframe
                src="https://api.maptiler.com/maps/satellite/?key=7QM1kFuQqp5kD5Blg8oX#8.5/8.97487/-4.28220"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
              <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded text-sm">
                Ethiopia - Jimma Region
              </div>
              <div className="absolute bottom-4 right-4 bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                0 Farms Registered
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <Button
                onClick={onViewMap}
                variant="outline"
                className="bg-transparent border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black"
              >
                <Map className="mr-2 h-4 w-4" />
                Full Screen Map
              </Button>
              <div className="text-sm text-gray-400">Satellite view powered by MapTiler</div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gray-900 border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <User className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                onClick={onCollectData}
                className="h-20 flex-col space-y-2 bg-green-500 hover:bg-green-600 text-black"
              >
                <User className="h-6 w-6" />
                <span className="text-sm">Collect Farm Data</span>
              </Button>

              <Button
                onClick={onVerifyAction}
                variant="outline"
                className="h-20 flex-col space-y-2 bg-transparent border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black"
              >
                <Camera className="h-6 w-6" />
                <span className="text-sm">Verify Action</span>
              </Button>

              <Button
                onClick={onViewMap}
                variant="outline"
                className="h-20 flex-col space-y-2 bg-transparent border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black"
              >
                <Map className="h-6 w-6" />
                <span className="text-sm">View Map</span>
              </Button>

              <Button
                onClick={onCreateBulletin}
                variant="outline"
                className="h-20 flex-col space-y-2 bg-transparent border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black"
              >
                <FileText className="h-6 w-6" />
                <span className="text-sm">Create Bulletin</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Farms - Empty State */}
        <Card className="bg-gray-900 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-white">Recent Farm Visits</CardTitle>
            <CardDescription className="text-gray-400">Your latest farm interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">No farm visits yet</h3>
              <p className="text-gray-400 mb-4">Start by collecting farmer data to begin your first assessment</p>
              <Button onClick={onCollectData} className="bg-green-500 hover:bg-green-600 text-black">
                <User className="mr-2 h-4 w-4" />
                Collect Your First Farm Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
