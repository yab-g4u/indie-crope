"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Building2, Landmark, Smartphone, ArrowRight, CheckCircle } from "lucide-react"

interface RoleSelectionProps {
  onRoleSelect: (role: "agent" | "ngo" | "government") => void
  onFarmerAccess: () => void
}

const roles = [
  {
    id: "agent" as const,
    title: "Field Agent",
    description: "Collect data and deliver recommendations directly to farmers",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
    features: ["Farm data collection", "Crop recommendations", "Verification workflows", "Mobile-first interface"],
  },
  {
    id: "ngo" as const,
    title: "NGO / FAO",
    description: "Monitor programs and manage verification at organizational scale",
    icon: Building2,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
    features: ["Program monitoring", "Adoption tracking", "Impact measurement", "Multi-agent management"],
  },
  {
    id: "government" as const,
    title: "Government",
    description: "Access aggregated insights for agricultural policy development",
    icon: Landmark,
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
    features: ["Policy insights", "Regional analytics", "Climate adaptation data", "Aggregated reporting"],
  },
]

export function RoleSelection({ onRoleSelect, onFarmerAccess }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<"agent" | "ngo" | "government" | null>(null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-agri-50 to-earth-50 dark:from-agri-950 dark:to-earth-950 p-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to IndieCrop</h1>
          <p className="text-muted-foreground text-lg">Choose your role to get started with personalized features</p>
        </div>

        {/* Farmer Quick Access */}
        <div className="mb-8">
          <Card className="bg-dark-accent/10 border-dark-accent/30 hover:border-dark-accent/50 transition-all cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-dark-accent/20 flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-dark-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dark-text-primary">Are you a Farmer?</h3>
                    <p className="text-dark-text-secondary">
                      Direct access for farmers with smartphones - በቀጥታ የገበሬዎች መዳረሻ
                    </p>
                  </div>
                </div>
                <Button onClick={onFarmerAccess} className="neon-gradient text-dark-primary">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Farmer Access / የገበሬ መዳረሻ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => (
            <Card
              key={role.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedRole === role.id ? "ring-2 ring-agri-500 shadow-lg" : ""
              }`}
              onClick={() => setSelectedRole(role.id)}
            >
              <CardHeader className="text-center">
                <div className={`mx-auto h-16 w-16 rounded-full ${role.bgColor} flex items-center justify-center mb-4`}>
                  <role.icon className={`h-8 w-8 ${role.color}`} />
                </div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription className="text-base">{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-agri-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                {selectedRole === role.id && <Badge className="w-full justify-center mt-4 bg-agri-500">Selected</Badge>}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => selectedRole && onRoleSelect(selectedRole)}
            disabled={!selectedRole}
            size="lg"
            className="px-8"
          >
            Continue as {selectedRole && roles.find((r) => r.id === selectedRole)?.title}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
