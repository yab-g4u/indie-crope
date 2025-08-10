"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  Sprout,
  Users,
  Building2,
  Landmark,
  Cloud,
  Droplets,
  TrendingUp,
  Calendar,
  ArrowRight,
  CheckCircle,
  Globe,
  Smartphone,
  BarChart3,
  Menu,
  X,
} from "lucide-react"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: Users,
      title: "Field Agents",
      description:
        "Collect data, deliver AI-powered recommendations, and verify sustainable practices directly with farmers.",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      icon: Building2,
      title: "NGOs & FAO",
      description: "Monitor program effectiveness, track adoption rates, and manage verification workflows at scale.",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      icon: Landmark,
      title: "Governments",
      description: "Access aggregated data insights to inform agricultural policies and climate adaptation strategies.",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ]

  const cropRecommendationFeatures = [
    {
      icon: Cloud,
      title: "Climate Patterns",
      description: "AI analysis of rainfall, temperature, and seasonal patterns for optimal crop timing.",
    },
    {
      icon: Droplets,
      title: "Water Management",
      description: "Smart irrigation recommendations based on soil moisture and water availability.",
    },
    {
      icon: TrendingUp,
      title: "Market Trends",
      description: "Real-time market data integration for profitable crop selection and timing.",
    },
  ]

  const howItWorksSteps = [
    {
      step: 1,
      title: "Data Collection",
      description: "Field agents collect climate data and farmer information using mobile devices.",
      icon: Smartphone,
    },
    {
      step: 2,
      title: "AI Analysis",
      description: "Our AI processes climate patterns, water data, and market trends for personalized recommendations.",
      icon: BarChart3,
    },
    {
      step: 3,
      title: "Smart Recommendations",
      description: "Farmers receive calendar-based crop recommendations with optimal planting and harvest times.",
      icon: Calendar,
    },
    {
      step: 4,
      title: "Verification & Impact",
      description: "Actions are verified and recorded on blockchain, generating sustainability credits.",
      icon: CheckCircle,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-50 via-white to-earth-50 dark:from-agri-950 dark:via-gray-900 dark:to-earth-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-agri-500 flex items-center justify-center">
                <Sprout className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">AgroLedger+</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-foreground hover:text-agri-600 transition-colors">
                Home
              </a>
              <a href="#features" className="text-foreground hover:text-agri-600 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-foreground hover:text-agri-600 transition-colors">
                How it Works
              </a>
              <ThemeToggle />
              <Button onClick={onGetStarted} className="bg-agri-500 hover:bg-agri-600">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="h-9 w-9"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <a href="#home" className="text-foreground hover:text-agri-600 transition-colors">
                  Home
                </a>
                <a href="#features" className="text-foreground hover:text-agri-600 transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-foreground hover:text-agri-600 transition-colors">
                  How it Works
                </a>
                <Button onClick={onGetStarted} className="bg-agri-500 hover:bg-agri-600 w-full">
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            🌱 AI-Powered Agricultural Intelligence
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-agri-600 to-earth-600 bg-clip-text text-transparent">
            Smart Crop Recommendations
            <br />
            for Sustainable Agriculture
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Empowering field agents, NGOs, and governments with AI-driven insights combining climate patterns, water
            management, and market trends for optimal crop recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onGetStarted} size="lg" className="bg-agri-500 hover:bg-agri-600 text-lg px-8">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Globe className="mr-2 h-5 w-5" />
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white/50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Three Key Audiences</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tailored solutions for field agents, organizations, and policymakers in the agricultural ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div
                    className={`mx-auto h-16 w-16 rounded-full ${feature.bgColor} flex items-center justify-center mb-4`}
                  >
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Crop Recommendation Features */}
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Smart Crop Recommendations</h3>
            <p className="text-lg text-muted-foreground">
              Our AI analyzes three critical factors for optimal crop selection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {cropRecommendationFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-lg bg-agri-100 dark:bg-agri-900/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-agri-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How indiecrop+ Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From data collection to actionable insights in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="h-16 w-16 rounded-full bg-agri-500 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-agri-100 dark:bg-agri-900/20 flex items-center justify-center mx-auto">
                    <step.icon className="h-6 w-6 text-agri-600" />
                  </div>
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-agri-200 dark:bg-agri-800 -translate-y-1/2" />
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-agri-500 to-earth-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Agriculture?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            we want to Join thousands of field agents, NGOs, and government agencies using indiecrop to make data-driven
            agricultural decisions.
          </p>
          <Button onClick={onGetStarted} size="lg" variant="secondary" className="text-lg px-8">
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-agri-500 flex items-center justify-center">
              <Sprout className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">indicrop</span>
          </div>
          <p className="text-gray-400 mb-4">Empowering sustainable agriculture through AI-driven insights</p>
          <p className="text-sm text-gray-500">© 2025 indiecrop+. Built for agricultural innovation.</p>
        </div>
      </footer>
    </div>
  )
}
