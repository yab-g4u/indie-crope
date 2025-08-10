"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Smartphone, Users, TrendingUp, Shield, Zap, Globe, CheckCircle, Star, Play } from "lucide-react"
import Image from "next/image"

interface EnhancedLandingPageProps {
  onGetStarted: () => void
}


  ]

  const features = [
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Optimized for smartphones with offline capabilities for rural areas",
    },
    {
      icon: Users,
      title: "Agent Network",
      description: "Trained field agents deliver personalized recommendations directly to farmers",
    },
    {
      icon: TrendingUp,
      title: "AI-Powered Insights",
      description: "Machine learning algorithms provide crop recommendations based on local conditions",
    },
    {
      icon: Shield,
      title: "Blockchain Verification",
      description: "Immutable records ensure transparency and trust in sustainable practices",
    },
    {
      icon: Zap,
      title: "Real-Time Analytics",
      description: "Live dashboards for NGOs and government agencies to track program effectiveness",
    },
    {
      icon: Globe,
      title: "Climate Resilience",
      description: "Recommendations adapted to climate change and local weather patterns",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Farmers Reached" },
    { number: "87%", label: "Yield Improvement" },
    { number: "156", label: "Field Agents" },
    { number: "12", label: "Active Programs" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-green-500/20 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 relative">
              <Image src="/images/indiecrop-logo.png" alt="IndieCrop Logo" width={32} height={32} />
            </div>
            <span className="text-xl font-bold">IndieCrop</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-400 hover:text-green-500 transition-colors">
              Features
            </a>
            <a href="#impact" className="text-gray-400 hover:text-green-500 transition-colors">
              Impact
            </a>
            <a href="#testimonials" className="text-gray-400 hover:text-green-500 transition-colors">
              Stories
            </a>
            <Button onClick={onGetStarted} className="bg-green-500 hover:bg-green-600 text-black">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  🌱 Transforming Ethiopian Agriculture
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  AI-Powered
                  <span className="text-green-500"> Crop Recommendations</span>
                  for Sustainable Farming
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Empowering Ethiopian farmers with personalized agricultural guidance, blockchain verification, and
                  climate-resilient crop recommendations delivered through trained field agents.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-black text-lg px-8 py-4"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-400">Free for Farmers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-400">Offline Capable</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-400">Local Language</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/images/farmers-working.jpg"
                  alt="Ethiopian farmers using IndieCrop"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-black/80 backdrop-blur-md rounded-xl p-4 border border-green-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="font-semibold">87% Yield Increase</p>
                      <p className="text-sm text-gray-400">Average improvement</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Agricultural Platform</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From AI-powered recommendations to blockchain verification, IndieCrop provides everything needed for
              sustainable farming success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-green-500/20 hover:border-green-500/50 transition-all duration-300"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-green-500" />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Measurable Impact Across Ethiopia</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Increased Food Security</h3>
                    <p className="text-gray-400">
                      expected 87% average yield improvement across all participating farms, directly contributing to household
                      food security and income generation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Climate Adaptation</h3>
                    <p className="text-gray-400">
                      Climate-resilient crop varieties recommended based on local weather patterns and climate change
                      projections for long-term sustainability.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Technology Adoption</h3>
                    <p className="text-gray-400">
                      expected 73% adoption rate of recommended practices through our field agent network, bridging the digital
                      divide in rural communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/terraced-fields.jpg"
                alt="Sustainable farming practices"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Stories from the Field</h2>
            <p className="text-xl text-gray-400">Hear from farmers, field agents, and organizations using IndieCrop</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-900 border-green-500/20">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl text-gray-300 mb-6 italic">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-white">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-400">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-green-500" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500/10 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Agricultural Impact?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers, field agents, and organizations already using IndieCrop to create sustainable
            agricultural change across Ethiopia.
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-black text-lg px-12 py-4"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-500/20 py-12 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 relative">
                  <Image src="/images/indiecrop-logo.png" alt="IndieCrop Logo" width={32} height={32} />
                </div>
                <span className="text-xl font-bold">IndieCrop</span>
              </div>
              <p className="text-gray-400">
                Empowering Ethiopian agriculture through AI-powered recommendations and sustainable practices.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-green-500 transition-colors">
                    Field Agents
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-500 transition-colors">
                    NGO Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-500 transition-colors">
                    Government Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-500 transition-colors">
                    Farmer Interface
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-green-500 transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-500 transition-colors">
                    Training Materials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-500 transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-500 transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Addis Ababa, Ethiopia</li>
                <li>g4uforlife@gmail.com</li>
                <li></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-500/20 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 IndieCrop. All rights reserved. Built for Ethiopian agricultural transformation.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
