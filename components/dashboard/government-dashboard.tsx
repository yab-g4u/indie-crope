"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SmartFarmCard } from "@/components/cards/smart-farm-card"
import { BarChart3, Users, MapPin, TrendingUp, Search, Filter, Download, ArrowLeft } from "lucide-react"
import Image from "next/image"

interface GovernmentDashboardProps {
  onBack: () => void
}

export function GovernmentDashboard({ onBack }: GovernmentDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedKebele, setSelectedKebele] = useState("all")
  const [farmData, setFarmData] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalFarms: 0,
    verifiedFarms: 0,
    totalFarmers: 0,
    averageYield: 0,
  })

  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterRegion, setFilterRegion] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Mock farm data
    const mockFarms = [
      {
        id: "FARM_JM_001",
        farmer_name: "አለማየሁ ታደሰ",
        phone: "+251911234567",
        kebele: "Debre Zeit",
        plot_size: 2.5,
        crops_grown: ["teff", "maize"],
        soil_type: "loamy",
        altitude_meters: 1780,
        water_source: "borehole",
        blockchain_hash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
        created_at: "2024-01-15T10:30:00Z",
        agent_id: "agent_001",
        verification_status: "verified" as const,
      },
      {
        id: "FARM_JM_002",
        farmer_name: "መሰረት በቀለ",
        phone: "+251922345678",
        kebele: "Bishoftu",
        plot_size: 1.8,
        crops_grown: ["coffee", "sorghum"],
        soil_type: "sandy_loam",
        altitude_meters: 1850,
        water_source: "river",
        blockchain_hash: "0x2b3c4d5e6f7890abcdef1234567890abcdef123a",
        created_at: "2024-01-16T14:20:00Z",
        agent_id: "agent_002",
        verification_status: "pending" as const,
      },
      {
        id: "FARM_JM_003",
        farmer_name: "ሃይሉ ወርቁ",
        phone: "+251933456789",
        kebele: "Dukem",
        plot_size: 3.2,
        crops_grown: ["maize", "barley"],
        soil_type: "clay",
        altitude_meters: 1720,
        water_source: "rainwater",
        blockchain_hash: "0x3c4d5e6f7890abcdef1234567890abcdef123a2b",
        created_at: "2024-01-17T09:15:00Z",
        agent_id: "agent_001",
        verification_status: "verified" as const,
      },
    ]

    setFarmData(mockFarms)
    setStats({
      totalFarms: mockFarms.length,
      verifiedFarms: mockFarms.filter((f) => f.verification_status === "verified").length,
      totalFarmers: mockFarms.length,
      averageYield: 2.5,
    })
  }, [])

  const filteredFarms = farmData.filter((farm) => {
    const matchesSearch =
      farm.farmer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.kebele.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesKebele = selectedKebele === "all" || farm.kebele === selectedKebele
    const matchesStatus = filterStatus === "all" || farm.verification_status === filterStatus
    const matchesRegion = filterRegion === "all" || farm.kebele.toLowerCase().includes(filterRegion.toLowerCase())

    return matchesSearch && matchesKebele && matchesStatus && matchesRegion
  })

  const handleExportFarm = (farm: any) => {
    // Mock export functionality
    console.log("Exporting farm data:", farm)
    // In real app, this would generate a PDF or CSV export
  }

  const handleExportAll = () => {
    const exportData = {
      summary: stats,
      farms: filteredFarms,
      exportDate: new Date().toISOString(),
      filters: {
        search: searchQuery,
        status: filterStatus,
        region: filterRegion,
        kebele: selectedKebele,
      },
    }

    const csvContent = [
      "Farm ID,Farmer Name,Phone,Kebele,Plot Size,Crops,Status,Created Date",
      ...filteredFarms.map(
        (farm) =>
          `${farm.id},"${farm.farmer_name}",${farm.phone},${farm.kebele},${farm.plot_size},"${farm.crops_grown.join(
            ", ",
          )}",${farm.verification_status},${farm.created_at}`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `government-farms-export-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

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
              <p className="text-sm text-gray-400">Government Dashboard</p>
            </div>
          </div>
          <Badge className="bg-green-500 text-black">Government Access</Badge>
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
                  <p className="text-2xl font-bold text-white">{stats.totalFarms}</p>
                  <p className="text-xs text-gray-400">Total Farms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-white">{stats.verifiedFarms}</p>
                  <p className="text-xs text-gray-400">Verified Farms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-white">{stats.totalFarmers}</p>
                  <p className="text-xs text-gray-400">Registered Farmers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-white">{stats.averageYield}</p>
                  <p className="text-xs text-gray-400">Avg Plot Size (ha)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gray-900 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-white">Farm Registry</CardTitle>
            <CardDescription className="text-gray-400">
              Blockchain-verified farmer data from field agents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by farmer name, kebele, or farm ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-black border-green-500/30 text-white"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black bg-transparent"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button onClick={handleExportAll} className="bg-green-500 hover:bg-green-600 text-black">
                  <Download className="h-4 w-4 mr-2" />
                  Export All ({filteredFarms.length})
                </Button>
              </div>
            </div>
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-800 rounded-lg border border-green-500/20">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full bg-black border border-green-500/30 text-white rounded px-3 py-2"
                  >
                    <option value="all">All Status</option>
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                    <option value="unverified">Unverified</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Region</label>
                  <select
                    value={filterRegion}
                    onChange={(e) => setFilterRegion(e.target.value)}
                    className="w-full bg-black border border-green-500/30 text-white rounded px-3 py-2"
                  >
                    <option value="all">All Regions</option>
                    <option value="debre">Debre Zeit</option>
                    <option value="bishoftu">Bishoftu</option>
                    <option value="dukem">Dukem</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Kebele</label>
                  <select
                    value={selectedKebele}
                    onChange={(e) => setSelectedKebele(e.target.value)}
                    className="w-full bg-black border border-green-500/30 text-white rounded px-3 py-2"
                  >
                    <option value="all">All Kebeles</option>
                    <option value="Debre Zeit">Debre Zeit</option>
                    <option value="Bishoftu">Bishoftu</option>
                    <option value="Dukem">Dukem</option>
                  </select>
                </div>
              </div>
            )}

            {/* Farm Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFarms.map((farm) => (
                <SmartFarmCard key={farm.id} farmData={farm} viewMode="government" onExport={handleExportFarm} />
              ))}
            </div>

            {filteredFarms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No farms found matching your search criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
