"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LogIn,
  Upload,
  Brain,
  MessageSquare,
  CheckCircle,
  Link,
  BarChart3,
  ArrowRight,
  Users,
  Shield,
  Coins,
} from "lucide-react"

const flowSteps = [
  {
    id: 1,
    title: "Login/Auth",
    description: "Role-based access control",
    icon: LogIn,
    roles: ["Field Agents", "Co-op Admins", "Researchers"],
    color: "bg-blue-500",
    details: "Google OAuth with role assignment (agent/admin/researcher)",
  },
  {
    id: 2,
    title: "Data Input",
    description: "Climate data & proof collection",
    icon: Upload,
    roles: ["Field Agents"],
    color: "bg-green-500",
    details: "Upload climate CSV, images/videos with geo-tags and timestamps",
  },
  {
    id: 3,
    title: "AI Analysis",
    description: "Gemini processes data",
    icon: Brain,
    roles: ["System"],
    color: "bg-purple-500",
    details: "Gemini model analyzes climate data + live inputs for tailored recommendations",
  },
  {
    id: 4,
    title: "Advice Delivery",
    description: "Show recommendations to farmer",
    icon: MessageSquare,
    roles: ["Field Agents"],
    color: "bg-orange-500",
    details: "Field agent presents AI-generated crop recommendations and calendar",
  },
  {
    id: 5,
    title: "Verification",
    description: "Proof of implementation",
    icon: CheckCircle,
    roles: ["Field Agents"],
    color: "bg-teal-500",
    details: "Submit geo-tagged, timestamped proof of climate-smart actions",
  },
  {
    id: 6,
    title: "Blockchain Record",
    description: "Immutable action logging",
    icon: Link,
    roles: ["System"],
    color: "bg-indigo-500",
    details: "Action logged on-chain, Resilience Credits issued to user wallet",
  },
  {
    id: 7,
    title: "Reporting",
    description: "Aggregated metrics",
    icon: BarChart3,
    roles: ["Admins", "Researchers"],
    color: "bg-red-500",
    details: "View anonymized data, verification status, and credit balances",
  },
]

const userTypes = [
  {
    type: "Field Agents",
    icon: Users,
    description: "Collect data, deliver advice, submit proof",
    color: "text-green-600",
  },
  {
    type: "Co-op Admins/NGOs",
    icon: Shield,
    description: "Manage accounts, track verified actions",
    color: "text-blue-600",
  },
  {
    type: "Researchers/Policy",
    icon: BarChart3,
    description: "Access aggregated anonymized data",
    color: "text-purple-600",
  },
]

export function UserFlowDiagram() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">AgroLedger+ User Flow</h1>
        <p className="text-muted-foreground text-lg">
          Agent-first crop recommendation & sustainability verification platform
        </p>
      </div>

      {/* User Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>User Types & Roles</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {userTypes.map((user) => (
              <div key={user.type} className="p-4 border rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <user.icon className={`h-5 w-5 ${user.color}`} />
                  <h3 className="font-semibold">{user.type}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{user.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Flow Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Process Flow</CardTitle>
          <CardDescription>Step-by-step user journey through the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {flowSteps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="flex items-start space-x-4">
                  {/* Step Icon */}
                  <div className={`${step.color} rounded-full p-3 text-white flex-shrink-0`}>
                    <step.icon className="h-6 w-6" />
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <div className="flex space-x-1">
                        {step.roles.map((role) => (
                          <Badge key={role} variant="secondary" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-2">{step.description}</p>
                    <p className="text-sm bg-muted/50 p-3 rounded-lg">{step.details}</p>
                  </div>
                </div>

                {/* Arrow to next step */}
                {index < flowSteps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Blockchain Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Coins className="h-5 w-5" />
            <span>Blockchain Integration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Immutable Proof</h3>
              <p className="text-sm text-muted-foreground">
                Each verified climate-smart action is recorded on-chain as immutable proof, creating a transparent and
                tamper-proof record of sustainable farming practices.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Resilience Credits</h3>
              <p className="text-sm text-muted-foreground">
                Verified actions earn Resilience Credits stored in user wallets, incentivizing sustainable practices and
                creating economic value for farmers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
