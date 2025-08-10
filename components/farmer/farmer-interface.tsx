"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Smartphone, ArrowRight } from "lucide-react"

interface FarmerData {
  name: string
  phone: string
  kebele: string
  plot_size: number
  crops_grown: string[]
  language: "amharic" | "english"
}

interface FarmerInterfaceProps {
  onDataSubmit: (data: FarmerData) => void
}

const translations = {
  english: {
    title: "Farmer Registration",
    subtitle: "Register to access IndieCrop recommendations",
    name: "Full Name",
    phone: "Phone Number",
    kebele: "Kebele",
    plotSize: "Plot Size (hectares)",
    cropsGrown: "Crops Currently Grown",
    language: "Preferred Language",
    submit: "Register & Get Recommendations",
    selectCrops: "Select crops you currently grow",
    namePlaceholder: "Enter your full name",
    phonePlaceholder: "Enter phone number",
    kebelePlaceholder: "Enter your kebele",
    plotPlaceholder: "Enter plot size in hectares",
  },
  amharic: {
    title: "የገበሬ ምዝገባ",
    subtitle: "የIndieCrop ምክሮችን ለማግኘት ይመዝገቡ",
    name: "ሙሉ ስም",
    phone: "ስልክ ቁጥር",
    kebele: "ቀበሌ",
    plotSize: "የመሬት መጠን (ሄክታር)",
    cropsGrown: "አሁን የሚያመርቷቸው ሰብሎች",
    language: "የሚመርጡት ቋንቋ",
    submit: "ይመዝገቡ እና ምክሮችን ያግኙ",
    selectCrops: "አሁን የሚያመርቷቸውን ሰብሎች ይምረጡ",
    namePlaceholder: "ሙሉ ስምዎን ያስገቡ",
    phonePlaceholder: "ስልክ ቁጥር ያስገቡ",
    kebelePlaceholder: "ቀበሌዎን ያስገቡ",
    plotPlaceholder: "የመሬት መጠን በሄክታር ያስገቡ",
  },
}

const cropOptions = {
  english: [
    { value: "teff", label: "Teff" },
    { value: "maize", label: "Maize" },
    { value: "sorghum", label: "Sorghum" },
    { value: "coffee", label: "Coffee" },
    { value: "barley", label: "Barley" },
    { value: "wheat", label: "Wheat" },
  ],
  amharic: [
    { value: "teff", label: "ጤፍ" },
    { value: "maize", label: "በቆሎ" },
    { value: "sorghum", label: "ማሽላ" },
    { value: "coffee", label: "ቡና" },
    { value: "barley", label: "ገብስ" },
    { value: "wheat", label: "ስንዴ" },
  ],
}

export function FarmerInterface({ onDataSubmit }: FarmerInterfaceProps) {
  const [language, setLanguage] = useState<"amharic" | "english">("amharic")
  const [formData, setFormData] = useState<Partial<FarmerData>>({
    language: "amharic",
    crops_grown: [],
  })

  const t = translations[language]
  const crops = cropOptions[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.phone && formData.kebele && formData.plot_size) {
      onDataSubmit(formData as FarmerData)
    }
  }

  const toggleCrop = (cropValue: string) => {
    const currentCrops = formData.crops_grown || []
    const updatedCrops = currentCrops.includes(cropValue)
      ? currentCrops.filter((c) => c !== cropValue)
      : [...currentCrops, cropValue]

    setFormData({ ...formData, crops_grown: updatedCrops })
  }

  return (
    <div className="min-h-screen bg-dark-primary p-4">
      <div className="max-w-2xl mx-auto">
        {/* Language Toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-dark-secondary rounded-lg p-1 border border-dark-accent/20">
            <Button
              variant={language === "amharic" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("amharic")}
              className={language === "amharic" ? "bg-dark-accent text-dark-primary" : "text-dark-text-secondary"}
            >
              አማርኛ
            </Button>
            <Button
              variant={language === "english" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("english")}
              className={language === "english" ? "bg-dark-accent text-dark-primary" : "text-dark-text-secondary"}
            >
              English
            </Button>
          </div>
        </div>

        <Card className="bg-dark-secondary border-dark-accent/20">
          <CardHeader className="text-center">
            <div className="h-16 w-16 rounded-full bg-dark-accent/20 flex items-center justify-center mx-auto mb-4">
              <Smartphone className="h-8 w-8 text-dark-accent" />
            </div>
            <CardTitle className="text-2xl text-dark-text-primary">{t.title}</CardTitle>
            <CardDescription className="text-dark-text-secondary">{t.subtitle}</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-dark-text-primary">
                  {t.name}
                </Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.namePlaceholder}
                  className="bg-dark-primary border-dark-accent/30 text-dark-text-primary"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-dark-text-primary">
                  {t.phone}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone || ""}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t.phonePlaceholder}
                  className="bg-dark-primary border-dark-accent/30 text-dark-text-primary"
                  required
                />
              </div>

              {/* Kebele */}
              <div className="space-y-2">
                <Label htmlFor="kebele" className="text-dark-text-primary">
                  {t.kebele}
                </Label>
                <Input
                  id="kebele"
                  value={formData.kebele || ""}
                  onChange={(e) => setFormData({ ...formData, kebele: e.target.value })}
                  placeholder={t.kebelePlaceholder}
                  className="bg-dark-primary border-dark-accent/30 text-dark-text-primary"
                  required
                />
              </div>

              {/* Plot Size */}
              <div className="space-y-2">
                <Label htmlFor="plot_size" className="text-dark-text-primary">
                  {t.plotSize}
                </Label>
                <Input
                  id="plot_size"
                  type="number"
                  step="0.1"
                  value={formData.plot_size || ""}
                  onChange={(e) => setFormData({ ...formData, plot_size: Number.parseFloat(e.target.value) })}
                  placeholder={t.plotPlaceholder}
                  className="bg-dark-primary border-dark-accent/30 text-dark-text-primary"
                  required
                />
              </div>

              {/* Crops Currently Grown */}
              <div className="space-y-2">
                <Label className="text-dark-text-primary">{t.cropsGrown}</Label>
                <p className="text-sm text-dark-text-secondary">{t.selectCrops}</p>
                <div className="grid grid-cols-2 gap-2">
                  {crops.map((crop) => (
                    <Button
                      key={crop.value}
                      type="button"
                      variant={formData.crops_grown?.includes(crop.value) ? "default" : "outline"}
                      onClick={() => toggleCrop(crop.value)}
                      className={
                        formData.crops_grown?.includes(crop.value)
                          ? "bg-dark-accent text-dark-primary"
                          : "border-dark-accent/50 text-dark-accent hover:bg-dark-accent hover:text-dark-primary bg-transparent"
                      }
                    >
                      {crop.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full neon-gradient text-dark-primary hover:glow-effect transition-all duration-300"
                size="lg"
              >
                {t.submit}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
