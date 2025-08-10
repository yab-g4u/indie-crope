"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react"

interface FarmProfile {
  soil_type: string
  altitude_meters: number
  monthly_rainfall_mm: number[]
  past_yields_kg_per_ha: {
    maize: number
    teff: number
    sorghum: number
    coffee: number
  }
  farmer_name: string
  kebele: string
  plot_area: number
  water_source: string
}

interface FarmQuestionnaireProps {
  farmId: string
  onComplete: (profile: FarmProfile) => void
  onBack: () => void
}

export function FarmQuestionnaire({ farmId, onComplete, onBack }: FarmQuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [profile, setProfile] = useState<Partial<FarmProfile>>({
    monthly_rainfall_mm: [120, 110, 130, 180, 250, 300, 290, 280, 220, 170, 140, 130],
    past_yields_kg_per_ha: {
      maize: 0,
      teff: 0,
      sorghum: 0,
      coffee: 0,
    },
  })

  const totalSteps = 4

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(profile as FarmProfile)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      onBack()
    }
  }

  const updateProfile = (field: string, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateYield = (crop: string, value: number) => {
    setProfile((prev) => ({
      ...prev,
      past_yields_kg_per_ha: {
        ...prev.past_yields_kg_per_ha,
        [crop]: value,
      },
    }))
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return profile.farmer_name && profile.kebele && profile.plot_area
      case 2:
        return profile.soil_type && profile.altitude_meters
      case 3:
        return profile.water_source
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-dark-primary p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button onClick={handlePrevious} variant="ghost" className="text-dark-accent hover:text-dark-accent-soft">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <Card className="bg-dark-secondary border-dark-accent/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-dark-text-primary">Farm Assessment - {farmId}</CardTitle>
                <CardDescription className="text-dark-text-secondary">
                  Step {currentStep} of {totalSteps}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-sm text-dark-text-secondary">Progress</div>
                <div className="text-lg font-bold text-dark-accent">
                  {Math.round((currentStep / totalSteps) * 100)}%
                </div>
              </div>
            </div>
            <div className="w-full bg-dark-primary rounded-full h-2 mt-4">
              <div
                className="bg-dark-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Basic Farm Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-dark-text-primary">Basic Farm Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="farmer_name" className="text-dark-text-primary">
                    Farmer Name
                  </Label>
                  <Input
                    id="farmer_name"
                    value={profile.farmer_name || ""}
                    onChange={(e) => updateProfile("farmer_name", e.target.value)}
                    placeholder="Enter farmer's full name"
                    className="bg-dark-primary border-dark-accent/30 text-dark-text-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kebele" className="text-dark-text-primary">
                    Kebele
                  </Label>
                  <Input
                    id="kebele"
                    value={profile.kebele || ""}
                    onChange={(e) => updateProfile("kebele", e.target.value)}
                    placeholder="Enter kebele name"
                    className="bg-dark-primary border-dark-accent/30 text-dark-text-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plot_area" className="text-dark-text-primary">
                    Plot Area (hectares)
                  </Label>
                  <Input
                    id="plot_area"
                    type="number"
                    step="0.1"
                    value={profile.plot_area || ""}
                    onChange={(e) => updateProfile("plot_area", Number.parseFloat(e.target.value))}
                    placeholder="Enter plot area in hectares"
                    className="bg-dark-primary border-dark-accent/30 text-dark-text-primary"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Soil and Altitude */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-dark-text-primary">Soil and Location Details</h3>

                <div className="space-y-2">
                  <Label className="text-dark-text-primary">Soil Type</Label>
                  <Select value={profile.soil_type} onValueChange={(value) => updateProfile("soil_type", value)}>
                    <SelectTrigger className="bg-dark-primary border-dark-accent/30 text-dark-text-primary">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-secondary border-dark-accent/30">
                      <SelectItem value="loamy">Loamy</SelectItem>
                      <SelectItem value="sandy">Sandy</SelectItem>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="sandy_loam">Sandy Loam</SelectItem>
                      <SelectItem value="clay_loam">Clay Loam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="altitude" className="text-dark-text-primary">
                    Altitude (meters above sea level)
                  </Label>
                  <Input
                    id="altitude"
                    type="number"
                    value={profile.altitude_meters || ""}
                    onChange={(e) => updateProfile("altitude_meters", Number.parseInt(e.target.value))}
                    placeholder="Enter altitude in meters (e.g., 1780)"
                    className="bg-dark-primary border-dark-accent/30 text-dark-text-primary"
                  />
                  <p className="text-sm text-dark-text-secondary">Jimma region typically ranges from 1000-2500m</p>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-dark-accent/50 text-dark-accent hover:bg-dark-accent hover:text-dark-primary bg-transparent"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Get GPS Location
                </Button>
              </div>
            )}

            {/* Step 3: Water Source */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-dark-text-primary">Water Management</h3>

                <div className="space-y-2">
                  <Label className="text-dark-text-primary">Primary Water Source</Label>
                  <Select value={profile.water_source} onValueChange={(value) => updateProfile("water_source", value)}>
                    <SelectTrigger className="bg-dark-primary border-dark-accent/30 text-dark-text-primary">
                      <SelectValue placeholder="Select water source" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-secondary border-dark-accent/30">
                      <SelectItem value="rainwater">Rainwater</SelectItem>
                      <SelectItem value="borehole">Borehole</SelectItem>
                      <SelectItem value="river">River</SelectItem>
                      <SelectItem value="well">Well</SelectItem>
                      <SelectItem value="irrigation">Irrigation System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-dark-primary/50 rounded-lg border border-dark-accent/20">
                  <h4 className="font-medium text-dark-text-primary mb-2">Jimma Climate Info</h4>
                  <p className="text-sm text-dark-text-secondary">
                    Average annual rainfall: 1500-2000mm
                    <br />
                    Wet season: June-September
                    <br />
                    Dry season: December-February
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Historical Yields */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-dark-text-primary">Historical Crop Yields</h3>
                <p className="text-dark-text-secondary">
                  Enter previous yields in kg per hectare (leave 0 if never grown)
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maize_yield" className="text-dark-text-primary">
                      Maize (kg/ha)
                    </Label>
                    <Input
                      id="maize_yield"
                      type="number"
                      value={profile.past_yields_kg_per_ha?.maize || ""}
                      onChange={(e) => updateYield("maize", Number.parseInt(e.target.value) || 0)}
                      placeholder="e.g., 2500"
                      className="bg-dark-primary border-dark-accent/30 text-dark-text-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teff_yield" className="text-dark-text-primary">
                      Teff (kg/ha)
                    </Label>
                    <Input
                      id="teff_yield"
                      type="number"
                      value={profile.past_yields_kg_per_ha?.teff || ""}
                      onChange={(e) => updateYield("teff", Number.parseInt(e.target.value) || 0)}
                      placeholder="e.g., 1800"
                      className="bg-dark-primary border-dark-accent/30 text-dark-text-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sorghum_yield" className="text-dark-text-primary">
                      Sorghum (kg/ha)
                    </Label>
                    <Input
                      id="sorghum_yield"
                      type="number"
                      value={profile.past_yields_kg_per_ha?.sorghum || ""}
                      onChange={(e) => updateYield("sorghum", Number.parseInt(e.target.value) || 0)}
                      placeholder="e.g., 2200"
                      className="bg-dark-primary border-dark-accent/30 text-dark-text-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coffee_yield" className="text-dark-text-primary">
                      Coffee (kg/ha)
                    </Label>
                    <Input
                      id="coffee_yield"
                      type="number"
                      value={profile.past_yields_kg_per_ha?.coffee || ""}
                      onChange={(e) => updateYield("coffee", Number.parseInt(e.target.value) || 0)}
                      placeholder="e.g., 1200"
                      className="bg-dark-primary border-dark-accent/30 text-dark-text-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button
                onClick={handlePrevious}
                variant="outline"
                className="border-dark-accent/50 text-dark-accent hover:bg-dark-accent hover:text-dark-primary bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="neon-gradient text-dark-primary hover:glow-effect transition-all duration-300"
              >
                {currentStep === totalSteps ? "Generate Recommendations" : "Next"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
