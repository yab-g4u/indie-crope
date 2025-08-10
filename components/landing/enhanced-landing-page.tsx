"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  Users,
  Building2,
  Landmark,
  Cloud,
  Droplets,
  TrendingUp,
  Calendar,
  ArrowRight,
  CheckCircle,
  Smartphone,
  BarChart3,
  Menu,
  X,
} from "lucide-react"

interface EnhancedLandingPageProps {
  onGetStarted: () => void
}

export function EnhancedLandingPage({ onGetStarted }: EnhancedLandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // Custom cursor effect
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  // Scroll reveal animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".scroll-reveal")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const features = [
    {
      icon: Users,
      title: "Field Agents",
      description:
        "Collect data, deliver AI-powered recommendations, and verify sustainable practices directly with farmers.",
      image: "/images/farmers-working.jpg",
    },
    {
      icon: Building2,
      title: "NGOs & FAO",
      description: "Monitor program effectiveness, track adoption rates, and manage verification workflows at scale.",
      image: "/images/hands-grain.avif",
    },
    {
      icon: Landmark,
      title: "Governments",
      description: "Access aggregated data insights to inform agricultural policies and climate adaptation strategies.",
      image: "/images/geometric-fields.jpg",
    },
  ]

  const cropRecommendationFeatures = [
    {
      icon: Cloud,
      title: "Climate Analysis",
      description: "AI analysis of 10-year climate data for Jimma, Ethiopia with rainfall and temperature patterns.",
    },
    {
      icon: Droplets,
      title: "Soil Assessment",
      description: "Comprehensive soil type analysis including loamy, sandy, and clay soil recommendations.",
    },
    {
      icon: TrendingUp,
      title: "High-Value Crops",
      description: "Focus on climate-resilient and high-value crops with expected profit ranges.",
    },
  ]

  const howItWorksSteps = [
    {
      step: 1,
      title: "Farm Assessment",
      description: "Field agents collect soil type, altitude, and historical yield data.",
      icon: Smartphone,
    },
    {
      step: 2,
      title: "AI Analysis",
      description: "IndieCrop AI processes farm profile against 10-year Jimma climate data.",
      icon: BarChart3,
    },
    {
      step: 3,
      title: "Smart Recommendations",
      description: "Generate top 3 climate-resilient crops with 6-week actionable calendar.",
      icon: Calendar,
    },
    {
      step: 4,
      title: "Verification & Impact",
      description: "Track implementation and measure agricultural impact with blockchain verification.",
      icon: CheckCircle,
    },
  ]

  return (
    <div className="min-h-screen bg-dark-primary text-dark-text-primary overflow-hidden">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? "hover" : ""}`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-effect border-b border-dark-accent/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="h-8 w-8 relative">
                <Image
                  src="/images/indiecrop-logo.png"
                  alt="IndieCrop Logo"
                  width={32}
                  height={32}
                  className="animate-glow"
                />
              </div>
              <span className="text-xl font-bold text-dark-accent">IndieCrop</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-dark-text-secondary hover:text-dark-accent transition-colors duration-300 cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-dark-text-secondary hover:text-dark-accent transition-colors duration-300 cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-dark-text-secondary hover:text-dark-accent transition-colors duration-300 cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                How it Works
              </button>
              <Button
                onClick={onGetStarted}
                className="neon-gradient hover:glow-effect transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="h-9 w-9 text-dark-accent"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-dark-accent/20 animate-slide-in">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-dark-text-secondary hover:text-dark-accent transition-colors cursor-pointer text-left"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-dark-text-secondary hover:text-dark-accent transition-colors cursor-pointer text-left"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-dark-text-secondary hover:text-dark-accent transition-colors cursor-pointer text-left"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  How it Works
                </button>
                <Button
                  onClick={onGetStarted}
                  className="neon-gradient w-full cursor-pointer"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center agri-overlay"
        style={{
          backgroundImage: `url('/images/rice-fields.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <Badge
            variant="secondary"
            className="mb-6 bg-dark-accent/20 text-dark-accent border-dark-accent/30 animate-float"
          >
            🌾 Smart Agriculture for Ethiopian Farmers
          </Badge>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 scroll-reveal">
            <span className="bg-gradient-to-r from-dark-accent to-dark-accent-soft bg-clip-text text-transparent">
              Climate-Resilient Crops
            </span>
            <br />
            <span className="text-dark-text-primary">for Ethiopian Farmers</span>
          </h1>
          <p className="text-xl text-dark-text-secondary mb-8 max-w-3xl mx-auto scroll-reveal">
            IndieCrop analyzes 10-year climate data and farm profiles to recommend high-value, climate-resilient crops
            specifically for Jimma region with actionable 6-week calendars.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-reveal">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="neon-gradient text-lg px-8 hover:glow-effect transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-dark-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-dark-text-primary">
              Built for Ethiopian Agriculture
            </h2>
            <p className="text-xl text-dark-text-secondary max-w-2xl mx-auto">
              Specialized solutions for field agents, organizations, and policymakers in Ethiopia's agricultural
              ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-dark-secondary border-dark-accent/20 hover:border-dark-accent/50 transition-all duration-300 hover:glow-effect scroll-reveal cursor-pointer group"
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div
                  className="h-48 bg-cover bg-center rounded-t-lg agri-overlay"
                  style={{ backgroundImage: `url('${feature.image}')` }}
                >
                  <div className="h-full flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-dark-accent/20 backdrop-blur-md flex items-center justify-center group-hover:bg-dark-accent/30 transition-all duration-300">
                      <feature.icon className="h-8 w-8 text-dark-accent" />
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-dark-text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-dark-text-secondary">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Crop Recommendation Features */}
          <div className="text-center mb-12 scroll-reveal">
            <h3 className="text-2xl md:text-4xl font-bold mb-4 text-dark-text-primary">AI-Powered Crop Intelligence</h3>
            <p className="text-lg text-dark-text-secondary">
              IndieCrop analyzes three critical factors for optimal crop selection in Jimma
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {cropRecommendationFeatures.map((feature, index) => (
              <Card
                key={index}
                className="bg-dark-secondary border-dark-accent/20 hover:border-dark-accent/50 transition-all duration-300 scroll-reveal cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-lg bg-dark-accent/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-dark-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-dark-text-primary">{feature.title}</h4>
                      <p className="text-dark-text-secondary">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 px-4 relative agri-overlay"
        style={{
          backgroundImage: `url('/images/terraced-fields.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-dark-text-primary">How IndieCrop Works</h2>
            <p className="text-xl text-dark-text-secondary max-w-2xl mx-auto">
              From farm assessment to actionable insights in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div
                key={index}
                className="text-center scroll-reveal cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="relative mb-6">
                  <div className="h-16 w-16 rounded-full bg-dark-accent text-dark-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold animate-glow">
                    {step.step}
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-dark-secondary/80 backdrop-blur-md border border-dark-accent/20 flex items-center justify-center mx-auto">
                    <step.icon className="h-6 w-6 text-dark-accent" />
                  </div>
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-dark-accent/30 -translate-y-1/2" />
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-dark-text-primary">{step.title}</h3>
                <p className="text-dark-text-secondary text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 neon-gradient">
        <div className="container mx-auto text-center scroll-reveal">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-dark-primary">
            Ready to Transform Ethiopian Agriculture?
          </h2>
          <p className="text-xl mb-8 text-dark-primary/80 max-w-2xl mx-auto">
            Join field agents and agricultural organizations using IndieCrop to make data-driven farming decisions in
            Jimma and beyond.
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            variant="secondary"
            className="text-lg px-8 bg-dark-primary text-dark-accent hover:bg-dark-secondary transition-all duration-300 cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-dark-primary border-t border-dark-accent/20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="h-8 w-8 relative">
              <Image src="/images/indiecrop-logo.png" alt="IndieCrop Logo" width={32} height={32} />
            </div>
            <span className="text-xl font-bold text-dark-accent">IndieCrop</span>
          </div>
          <p className="text-dark-text-secondary mb-4">
            Empowering Ethiopian agriculture through AI-driven climate insights
          </p>
          <p className="text-sm text-dark-text-secondary/60">© 2024 IndieCrop. Built for agricultural innovation.</p>
        </div>
      </footer>
    </div>
  )
}
