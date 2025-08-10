"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Satellite, Layers, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface FullScreenMapProps {
  onBack: () => void
}

export function FullScreenMap({ onBack }: FullScreenMapProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [mapStyle, setMapStyle] = useState("satellite")

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b bg-black/80 backdrop-blur-md sticky top-0 z-50 border-green-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button onClick={onBack} variant="ghost" className="text-green-500 hover:text-green-400 mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="font-bold text-lg text-white">Farm Locations Map</h1>
              <p className="text-sm text-gray-400">Ethiopia - Jimma Region</p>
            </div>
          </div>
          <Badge className="bg-green-500 text-black">Interactive Map</Badge>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-80 bg-gray-900 border-r border-green-500/20 p-4 space-y-4 overflow-y-auto">
          {/* Search */}
          <Card className="bg-gray-800 border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">Search Locations</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search farms, kebeles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-700 border-green-500/30 text-white placeholder-gray-400"
                />
              </div>
            </CardContent>
          </Card>

          {/* Map Controls */}
          <Card className="bg-gray-800 border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">Map Style</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <Button
                onClick={() => setMapStyle("satellite")}
                variant={mapStyle === "satellite" ? "default" : "outline"}
                className={`w-full justify-start ${
                  mapStyle === "satellite"
                    ? "bg-green-500 text-black"
                    : "bg-transparent border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black"
                }`}
              >
                <Satellite className="mr-2 h-4 w-4" />
                Satellite View
              </Button>
              <Button
                onClick={() => setMapStyle("terrain")}
                variant={mapStyle === "terrain" ? "default" : "outline"}
                className={`w-full justify-start ${
                  mapStyle === "terrain"
                    ? "bg-green-500 text-black"
                    : "bg-transparent border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black"
                }`}
              >
                <Layers className="mr-2 h-4 w-4" />
                Terrain View
              </Button>
            </CardContent>
          </Card>

          {/* Farm Statistics */}
          <Card className="bg-gray-800 border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">Farm Statistics</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Total Farms</span>
                <Badge className="bg-green-500/20 text-green-400">0</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Verified</span>
                <Badge className="bg-green-500/20 text-green-400">0</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Pending</span>
                <Badge className="bg-yellow-500/20 text-yellow-400">0</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Locations */}
          <Card className="bg-gray-800 border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">Recent Locations</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-center py-8">
                <MapPin className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No locations visited yet</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <iframe
            src={`https://api.maptiler.com/maps/${mapStyle}/?key=7QM1kFuQqp5kD5Blg8oX#8.5/8.97487/-4.28220`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />

          {/* Map Overlay Info */}
          <div className="absolute top-4 left-4 bg-black/80 text-white px-4 py-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-green-500" />
              <span className="text-sm">Ethiopia - Jimma Region</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Coordinates: 8.97487, -4.28220</p>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-black/80 text-white px-4 py-3 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">Legend</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs">Verified Farms</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-xs">Pending Verification</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs">Issues Detected</span>
              </div>
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 bg-black/80 rounded-lg p-2 space-y-2">
            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-black w-8 h-8 p-0">
              +
            </Button>
            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-black w-8 h-8 p-0">
              -
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
