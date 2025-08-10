"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QrCode, MapPin, User, Smartphone, Calendar, Shield, Download, Share } from "lucide-react"

interface FarmData {
  id: string
  farmer_name: string
  phone: string
  kebele: string
  plot_size: number
  crops_grown: string[]
  soil_type?: string
  altitude_meters?: number
  water_source?: string
  blockchain_hash: string
  created_at: string
  agent_id: string
  verification_status: "verified" | "pending" | "unverified"
}

interface SmartFarmCardProps {
  farmData: FarmData
  viewMode: "agent" | "farmer" | "government"
  onExport?: (data: FarmData) => void
  onShare?: (data: FarmData) => void
}

export function SmartFarmCard({ farmData, viewMode, onExport, onShare }: SmartFarmCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "unverified":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="bg-dark-secondary border-dark-accent/20 hover:border-dark-accent/50 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-dark-accent/20 flex items-center justify-center">
              <User className="h-6 w-6 text-dark-accent" />
            </div>
            <div>
              <CardTitle className="text-lg text-dark-text-primary">{farmData.farmer_name}</CardTitle>
              <CardDescription className="text-dark-text-secondary">Farm ID: {farmData.id}</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={`${getStatusColor(farmData.verification_status)} text-white`}>
              {farmData.verification_status}
            </Badge>
            {viewMode === "government" && (
              <Badge variant="outline" className="border-dark-accent/50 text-dark-accent">
                <Shield className="h-3 w-3 mr-1" />
                Blockchain
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Smartphone className="h-4 w-4 text-dark-accent" />
            <span className="text-dark-text-secondary">Phone:</span>
            <span className="text-dark-text-primary font-medium">{farmData.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-dark-accent" />
            <span className="text-dark-text-secondary">Kebele:</span>
            <span className="text-dark-text-primary font-medium">{farmData.kebele}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-dark-text-secondary">Plot Size:</span>
            <span className="text-dark-text-primary font-medium">{farmData.plot_size} ha</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-dark-accent" />
            <span className="text-dark-text-secondary">Registered:</span>
            <span className="text-dark-text-primary font-medium">{formatDate(farmData.created_at)}</span>
          </div>
        </div>

        {/* Crops */}
        <div>
          <p className="text-sm text-dark-text-secondary mb-2">Crops Grown:</p>
          <div className="flex flex-wrap gap-2">
            {farmData.crops_grown.map((crop) => (
              <Badge key={crop} variant="outline" className="border-dark-accent/30 text-dark-text-primary">
                {crop}
              </Badge>
            ))}
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="space-y-3 pt-3 border-t border-dark-accent/20">
            {farmData.soil_type && (
              <div className="flex justify-between text-sm">
                <span className="text-dark-text-secondary">Soil Type:</span>
                <span className="text-dark-text-primary capitalize">{farmData.soil_type}</span>
              </div>
            )}
            {farmData.altitude_meters && (
              <div className="flex justify-between text-sm">
                <span className="text-dark-text-secondary">Altitude:</span>
                <span className="text-dark-text-primary">{farmData.altitude_meters}m</span>
              </div>
            )}
            {farmData.water_source && (
              <div className="flex justify-between text-sm">
                <span className="text-dark-text-secondary">Water Source:</span>
                <span className="text-dark-text-primary capitalize">{farmData.water_source}</span>
              </div>
            )}
            {viewMode === "government" && (
              <div className="bg-dark-primary/50 p-3 rounded-lg">
                <p className="text-xs text-dark-text-secondary mb-1">Blockchain Hash:</p>
                <p className="text-xs font-mono text-dark-accent break-all">{farmData.blockchain_hash}</p>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-dark-accent/20">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-dark-accent hover:text-dark-accent-soft"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </Button>

          <div className="flex space-x-2">
            {viewMode === "agent" && onShare && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onShare(farmData)}
                className="border-dark-accent/50 text-dark-accent hover:bg-dark-accent hover:text-dark-primary bg-transparent"
              >
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
            )}

            {(viewMode === "agent" || viewMode === "government") && onExport && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onExport(farmData)}
                className="border-dark-accent/50 text-dark-accent hover:bg-dark-accent hover:text-dark-primary bg-transparent"
              >
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            )}

            <Button size="sm" className="neon-gradient text-dark-primary hover:glow-effect transition-all duration-300">
              <QrCode className="h-4 w-4 mr-1" />
              QR Code
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
