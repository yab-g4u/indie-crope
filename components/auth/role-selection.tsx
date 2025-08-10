"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Building2, Landmark, User, ArrowLeft } from "lucide-react"
import Image from "next/image"

interface RoleSelectionProps {
  onRoleSelect: (role: "agent" | "ngo" | "government") => void
  onFarmerAccess: () => void
  onBack?: () => void
}

export function RoleSelection({ onRoleSelect, onFarmerAccess, onBack }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const roles = [
    {
      id: "agent",
      title: "Field Agent",
      description: "Collect farm data, deliver recommendations, and verify sustainable practices",
      icon: Users,
      color: "bg-green-500",
      features: ["Data Collection", "Farm Verification", "Recommendation Delivery", "Progress Tracking"],
    },
    {
      id: "ngo",
      title: "NGO / FAO",
      description: "Monitor programs, track adoption rates, and manage verification workflows",
      icon: Building2,
      color: "bg-green-500",
      features: ["Program Monitoring", "Impact Analytics", "AI Assistant", "Farmer Engagement"],
    },
    {
      id: "government",
      title: "Government",
      description: "Access aggregated insights to inform agricultural policies and strategies",
      icon: Landmark,
      color: "bg-green-500",
      features: ["Policy Insights", "Regional Analytics", "Blockchain Registry", "Export Data"],
    },
  ]

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
              <p className="text-sm text-gray-400">Choose Your Access Level</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to IndieCrop</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Select your role to access specialized tools for Ethiopian agricultural development
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {roles.map((role) => (
            <Card
              key={role.id}
              className={`bg-gray-900 border-green-500/20 hover:border-green-500/50 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedRole === role.id ? "border-green-500 ring-2 ring-green-500/20" : ""
              }`}
              onClick={() => setSelectedRole(role.id)}
            >
              <CardHeader className="text-center">
                <div className={`h-16 w-16 rounded-full ${role.color} flex items-center justify-center mx-auto mb-4`}>
                  <role.icon className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-xl text-white">{role.title}</CardTitle>
                <CardDescription className="text-gray-400">{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    onRoleSelect(role.id as "agent" | "ngo" | "government")
                  }}
                  className="w-full mt-6 bg-green-500 hover:bg-green-600 text-black"
                >
                  Access {role.title} Dashboard
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Farmer Access */}
        <div className="text-center">
          <Card className="bg-gray-900 border-green-500/20 max-w-md mx-auto">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle className="text-white">Are you a Farmer?</CardTitle>
              <CardDescription className="text-gray-400">
                Get personalized crop recommendations and agricultural guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={onFarmerAccess}
                variant="outline"
                className="w-full border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black bg-transparent"
              >
                Access Farmer Interface
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
