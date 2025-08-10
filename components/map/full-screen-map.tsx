"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, MapPin, Satellite, MapIcon, Plus, Minus, Navigation } from "lucide-react"
import Image from "next/image"

interface FullScreenMapProps {
  onBack: () => void
}

export function FullScreenMap({ onBack }: FullScreenMapProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [mapStyle, setMapStyle] = useState<"satellite" | "streets">("satellite")
  const [showLegend, setShowLegend] = useState(true)

  const farmMarkers = [
    { id: "F001", name: "Alemayehu Farm", lat: 7.6667, lng: 36.8333, status: "verified" },
    { id: "F002", name: "Meseret Farm", lat: 7.7, lng: 36.85, status: "pending" },
    { id: "F003", name: "Hailu Farm", lat: 7.65, lng: 36.8, status: "verified" },
  ]

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
              <p className="text-sm text-gray-400">Farm Location Map</p>
            </div>
          </div>
          <Badge className="bg-green-500 text-black">Interactive Map</Badge>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-80 bg-gray-900 border-r border-green-500/20 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-green-500/20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search farms, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black border-green-500/30 text-white"
              />
            </div>
          </div>

          {/* Map Controls */}
          <div className="p-4 border-b border-green-500/20">
            <h3 className="text-white font-medium mb-3">Map Style</h3>
            <div className="flex space-x-2">
              <Button
                variant={mapStyle === "satellite" ? "default" : "outline"}
                size="sm"
                onClick={() => setMapStyle("satellite")}
                className={
                  mapStyle === "satellite"
                    ? "bg-green-500 text-black"
                    : "border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black bg-transparent"
                }
              >
                <Satellite className="h-4 w-4 mr-1" />
                Satellite
              </Button>
              <Button
                variant={mapStyle === "streets" ? "default" : "outline"}
                size="sm"
                onClick={() => setMapStyle("streets")}
                className={
                  mapStyle === "streets"
                    ? "bg-green-500 text-black"
                    : "border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black bg-transparent"
                }
              >
                <MapIcon className="h-4 w-4 mr-1" />
                Streets
              </Button>
            </div>
          </div>

          {/* Farm List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-white font-medium mb-3">Registered Farms ({farmMarkers.length})</h3>
              <div className="space-y-3">
                {farmMarkers.map((farm) => (
                  <Card
                    key={farm.id}
                    className="bg-black border-green-500/20 hover:border-green-500/50 transition-colors cursor-pointer"
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{farm.name}</p>
                            <p className="text-gray-400 text-xs">{farm.id}</p>
                          </div>
                        </div>
                        <Badge
                          variant={farm.status === "verified" ? "default" : "secondary"}
                          className={farm.status === "verified" ? "bg-green-500 text-black" : "bg-gray-600 text-white"}
                        >
                          {farm.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          {showLegend && (
            <div className="p-4 border-t border-green-500/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-medium">Legend</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLegend(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-400">Verified Farms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-gray-400">Pending Verification</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-400">Issues Reported</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <div className="h-full bg-gray-800 relative overflow-hidden">
            <iframe
              src={`https://api.maptiler.com/maps/${mapStyle}/?key=7QM1kFuQqp5kD5Blg8oX#8.5/7.6667/36.8333`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Map Overlay Info */}
            <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-2 rounded">
              <p className="text-sm font-medium">Ethiopia - Jimma Region</p>
              <p className="text-xs text-gray-400">Showing {farmMarkers.length} registered farms</p>
            </div>

            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <Button size="sm" className="bg-black/80 text-white hover:bg-black/90 border border-green-500/20">
                <Plus className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-black/80 text-white hover:bg-black/90 border border-green-500/20">
                <Minus className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-black/80 text-white hover:bg-black/90 border border-green-500/20">
                <Navigation className="h-4 w-4" />
              </Button>
            </div>

            {/* Stats Overlay */}
            <div className="absolute bottom-4 left-4 bg-black/80 text-white px-4 py-2 rounded">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>2 Verified</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span>1 Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
