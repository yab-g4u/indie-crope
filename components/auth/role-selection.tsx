"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, Building, Smartphone, ArrowLeft } from "lucide-react"
import Image from "next/image"

interface RoleSelectionProps {
  onRoleSelect: (role: "agent" | "ngo" | "government") => void
  onFarmerAccess: () => void
  onBack?: () => void
}

export function RoleSelection({ onRoleSelect, onFarmerAccess, onBack }: RoleSelectionProps) {
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
              <p className="text-sm text-gray-400">Choose your role</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to IndieCrop</h1>
          <p className="text-gray-400 text-lg">Choose your role to get started with personalized features</p>
        </div>

        {/* Farmer Access - Responsive */}
        <div className="mb-8">
          <Card className="bg-green-500/10 border-green-500/30 hover:border-green-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-white">Are you a Farmer?</h3>
                    <p className="text-gray-400">Direct access for farmers with smartphones - የገበሬዎች መዳረሻ</p>
                  </div>
                </div>
                <Button
                  onClick={onFarmerAccess}
                  className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 w-full sm:w-auto"
                >
                  <Smartphone className="mr-2 h-4 w-4" />
                  Farmer Access / የገበሬ መዳረሻ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Field Agent */}
          <Card className="bg-gray-900 border-green-500/20 hover:border-green-500/50 transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center">
              <div className="h-16 w-16 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors">
                <Users className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-white text-xl">Field Agent</CardTitle>
              <CardDescription className="text-gray-400">
                Collect data and deliver recommendations directly to farmers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Farm data collection</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Crop recommendations</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Verification workflows</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Mobile-first interface</span>
                </div>
              </div>
              <Button
                onClick={() => onRoleSelect("agent")}
                className="w-full bg-green-500 hover:bg-green-600 text-black"
              >
                Continue as Field Agent
              </Button>
            </CardContent>
          </Card>

          {/* NGO/FAO */}
          <Card className="bg-gray-900 border-green-500/20 hover:border-green-500/50 transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center">
              <div className="h-16 w-16 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors">
                <FileText className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-white text-xl">NGO / FAO</CardTitle>
              <CardDescription className="text-gray-400">
                Monitor programs and manage verification at organizational scale
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Program monitoring</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Adoption tracking</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Impact measurement</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Multi-agent management</span>
                </div>
              </div>
              <Button onClick={() => onRoleSelect("ngo")} className="w-full bg-green-500 hover:bg-green-600 text-black">
                Continue as NGO/FAO
              </Button>
            </CardContent>
          </Card>

          {/* Government */}
          <Card className="bg-gray-900 border-green-500/20 hover:border-green-500/50 transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center">
              <div className="h-16 w-16 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors">
                <Building className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-white text-xl">Government</CardTitle>
              <CardDescription className="text-gray-400">
                Access aggregated insights for agricultural policy development
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Policy insights</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Regional analytics</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Climate adaptation data</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Aggregated reporting</span>
                </div>
              </div>
              <Button
                onClick={() => onRoleSelect("government")}
                className="w-full bg-green-500 hover:bg-green-600 text-black"
              >
                Continue as Government
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
