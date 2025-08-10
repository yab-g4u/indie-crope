"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, User, MapPin, Sprout, CheckCircle } from "lucide-react"
import Image from "next/image"

interface FieldDataCollectionProps {
  onDataSubmit: (data: any) => void
  onBack: () => void
}

export function FieldDataCollection({ onDataSubmit, onBack }: FieldDataCollectionProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Farmer Information
    farmerName: "",
    phoneNumber: "",
    kebele: "",
    age: "",
    gender: "",
    educationLevel: "",

    // Step 2: Location & Farm Details
    plotArea: "",
    soilType: "",
    altitude: "",
    waterSource: "",
    latitude: "",
    longitude: "",

    // Step 3: Agricultural Information
    cropsGrown: "",
    previousYield: "",
    challenges: "",
    recommendationFocus: "",
    farmingExperience: "",
    currentPractices: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    onDataSubmit(formData)
  }

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return <User className="h-5 w-5" />
      case 2:
        return <MapPin className="h-5 w-5" />
      case 3:
        return <Sprout className="h-5 w-5" />
      default:
        return <CheckCircle className="h-5 w-5" />
    }
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return "Farmer Information"
      case 2:
        return "Location & Farm Details"
      case 3:
        return "Agricultural Information"
      default:
        return "Complete"
    }
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.farmerName && formData.phoneNumber && formData.kebele
      case 2:
        return formData.plotArea && formData.soilType && formData.waterSource
      case 3:
        return formData.cropsGrown && formData.challenges && formData.recommendationFocus
      default:
        return false
    }
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
              <h1 className="font-bold text-lg text-white">Farm Data Collection</h1>
              <p className="text-sm text-gray-400">Step {currentStep} of 3</p>
            </div>
          </div>
          <Badge className="bg-green-500 text-black">Field Agent</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step <= currentStep
                      ? "bg-green-500 border-green-500 text-black"
                      : "bg-gray-800 border-gray-600 text-gray-400"
                  }`}
                >
                  {getStepIcon(step)}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${step <= currentStep ? "text-white" : "text-gray-400"}`}>
                    {getStepTitle(step)}
                  </p>
                </div>
                {step < 3 && (
                  <div className={`w-16 h-0.5 ml-4 ${step < currentStep ? "bg-green-500" : "bg-gray-600"}`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / 3) * 100} className="h-2" />
        </div>

        {/* Form Content */}
        <Card className="bg-gray-900 border-green-500/20 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              {getStepIcon(currentStep)}
              <span>{getStepTitle(currentStep)}</span>
            </CardTitle>
            <CardDescription className="text-gray-400">
              {currentStep === 1 && "Enter basic farmer information"}
              {currentStep === 2 && "Provide location and farm details"}
              {currentStep === 3 && "Add agricultural information and preferences"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Farmer Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="farmerName" className="text-white">
                      Farmer Name *
                    </Label>
                    <Input
                      id="farmerName"
                      value={formData.farmerName}
                      onChange={(e) => handleInputChange("farmerName", e.target.value)}
                      className="bg-gray-800 border-green-500/30 text-white"
                      placeholder="Enter farmer's full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber" className="text-white">
                      Phone Number *
                    </Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      className="bg-gray-800 border-green-500/30 text-white"
                      placeholder="+251..."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="kebele" className="text-white">
                      Kebele *
                    </Label>
                    <Input
                      id="kebele"
                      value={formData.kebele}
                      onChange={(e) => handleInputChange("kebele", e.target.value)}
                      className="bg-gray-800 border-green-500/30 text-white"
                      placeholder="Enter kebele name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age" className="text-white">
                      Age
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className="bg-gray-800 border-green-500/30 text-white"
                      placeholder="Age in years"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gender" className="text-white">
                      Gender
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger className="bg-gray-800 border-green-500/30 text-white">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="educationLevel" className="text-white">
                      Education Level
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("educationLevel", value)}>
                      <SelectTrigger className="bg-gray-800 border-green-500/30 text-white">
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No formal education</SelectItem>
                        <SelectItem value="primary">Primary school</SelectItem>
                        <SelectItem value="secondary">Secondary school</SelectItem>
                        <SelectItem value="tertiary">Higher education</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location & Farm Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="plotArea" className="text-white">
                      Plot Area (hectares) *
                    </Label>
                    <Input
                      id="plotArea"
                      type="number"
                      step="0.1"
                      value={formData.plotArea}
                      onChange={(e) => handleInputChange("plotArea", e.target.value)}
                      className="bg-gray-800 border-green-500/30 text-white"
                      placeholder="e.g., 2.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="altitude" className="text-white">
                      Altitude (meters)
                    </Label>
                    <Input
                      id="altitude"
                      type="number"
                      value={formData.altitude}
                      onChange={(e) => handleInputChange("altitude", e.target.value)}
                      className="bg-gray-800 border-green-500/30 text-white"
                      placeholder="e.g., 1800"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="soilType" className="text-white">
                      Soil Type *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("soilType", value)}>
                      <SelectTrigger className="bg-gray-800 border-green-500/30 text-white">
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clay">Clay</SelectItem>
                        <SelectItem value="loam">Loam</SelectItem>
                        <SelectItem value="sandy">Sandy</SelectItem>
                        <SelectItem value="silt">Silt</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="waterSource" className="text-white">
                      Water Source *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("waterSource", value)}>
                      <SelectTrigger className="bg-gray-800 border-green-500/30 text-white">
                        <SelectValue placeholder="Select water source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rainfall">Rainfall only</SelectItem>
                        <SelectItem value="irrigation">Irrigation</SelectItem>
                        <SelectItem value="river">River/Stream</SelectItem>
                        <SelectItem value="well">Well</SelectItem>
                        <SelectItem value="mixed">Mixed sources</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="latitude" className="text-white">
                      Latitude (GPS)
                    </Label>
                    <Input
                      id="latitude"
                      value={formData.latitude}
                      onChange={(e) => handleInputChange("latitude", e.target.value)}
                      className="bg-gray-800 border-green-500/30 text-white"
                      placeholder="e.g., 8.97487"
                    />
                  </div>
                  <div>
                    <Label htmlFor="longitude" className="text-white">
                      Longitude (GPS)
                    </Label>
                    <Input
                      id="longitude"
                      value={formData.longitude}
                      onChange={(e) => handleInputChange("longitude", e.target.value)}
                      className="bg-gray-800 border-green-500/30 text-white"
                      placeholder="e.g., -4.28220"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Agricultural Information */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cropsGrown" className="text-white">
                    Current Crops Grown *
                  </Label>
                  <Textarea
                    id="cropsGrown"
                    value={formData.cropsGrown}
                    onChange={(e) => handleInputChange("cropsGrown", e.target.value)}
                    className="bg-gray-800 border-green-500/30 text-white"
                    placeholder="List the crops currently grown (e.g., Teff, Maize, Coffee)"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="previousYield" className="text-white">
                      Previous Year Yield
                    </Label>
                    <Input
                      id="previousYield"
                      value={formData.previousYield}
                      onChange={(e) => handleInputChange("previousYield", e.target.value)}
                      className="bg-gray-800 border-green-500/30 text-white"
                      placeholder="e.g., 2.5 tons/hectare"
                    />
                  </div>
                  <div>
                    <Label htmlFor="farmingExperience" className="text-white">
                      Farming Experience (years)
                    </Label>
                    <Input
                      id="farmingExperience"
                      type="number"
                      value={formData.farmingExperience}
                      onChange={(e) => handleInputChange("farmingExperience", e.target.value)}
                      className="bg-gray-800 border-green-500/30 text-white"
                      placeholder="Years of farming"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="challenges" className="text-white">
                    Main Challenges *
                  </Label>
                  <Textarea
                    id="challenges"
                    value={formData.challenges}
                    onChange={(e) => handleInputChange("challenges", e.target.value)}
                    className="bg-gray-800 border-green-500/30 text-white"
                    placeholder="Describe main farming challenges (e.g., pests, weather, market access)"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="recommendationFocus" className="text-white">
                    Recommendation Focus *
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("recommendationFocus", value)}>
                    <SelectTrigger className="bg-gray-800 border-green-500/30 text-white">
                      <SelectValue placeholder="What should recommendations focus on?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yield">Increase yield</SelectItem>
                      <SelectItem value="profit">Maximize profit</SelectItem>
                      <SelectItem value="sustainability">Sustainable practices</SelectItem>
                      <SelectItem value="resilience">Climate resilience</SelectItem>
                      <SelectItem value="diversification">Crop diversification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currentPractices" className="text-white">
                    Current Farming Practices
                  </Label>
                  <Textarea
                    id="currentPractices"
                    value={formData.currentPractices}
                    onChange={(e) => handleInputChange("currentPractices", e.target.value)}
                    className="bg-gray-800 border-green-500/30 text-white"
                    placeholder="Describe current farming methods and practices"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                variant="outline"
                className="bg-transparent border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black disabled:opacity-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                  className="bg-green-500 hover:bg-green-600 text-black disabled:opacity-50"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepValid(currentStep)}
                  className="bg-green-500 hover:bg-green-600 text-black disabled:opacity-50"
                >
                  Generate Recommendations
                  <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
