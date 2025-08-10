"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, X, Flashlight, RotateCcw, QrCode } from "lucide-react"

interface FunctionalQRScannerProps {
  onScan: (farmId: string) => void
  onClose: () => void
}

export function FunctionalQRScanner({ onScan, onClose }: FunctionalQRScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [error, setError] = useState<string>("")
  const [isScanning, setIsScanning] = useState(false)
  const [scannedData, setScannedData] = useState<string>("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    startCamera()
    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setHasPermission(true)
      setIsScanning(true)

      // Start QR code detection
      startQRDetection()
    } catch (err) {
      setError("Camera access denied. Please enable camera permissions.")
      setHasPermission(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsScanning(false)
  }

  const startQRDetection = () => {
    const detectQR = () => {
      if (!videoRef.current || !canvasRef.current || !isScanning) return

      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (video.readyState === video.HAVE_ENOUGH_DATA && context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Simulate QR detection (in real app, use a QR library like zxing-js)
        // For demo purposes, we'll generate a farm ID after a delay
        setTimeout(() => {
          if (isScanning && !scannedData) {
            const mockFarmIds = ["FARM_JM_001", "FARM_JM_002", "FARM_JM_003", "FARM_JM_004", "FARM_JM_005"]
            const randomId = mockFarmIds[Math.floor(Math.random() * mockFarmIds.length)]
            setScannedData(randomId)
            onScan(randomId)
          }
        }, 3000) // Simulate 3 second scan time
      }

      if (isScanning) {
        requestAnimationFrame(detectQR)
      }
    }

    detectQR()
  }

  const handleManualInput = () => {
    const farmId = prompt("Enter Farm ID manually:")
    if (farmId) {
      onScan(farmId.toUpperCase())
    }
  }

  if (hasPermission === null) {
    return (
      <div className="fixed inset-0 bg-dark-primary/90 flex items-center justify-center z-50">
        <Card className="w-full max-w-sm mx-4 bg-dark-secondary border-dark-accent/20">
          <CardContent className="p-6 text-center">
            <Camera className="h-12 w-12 mx-auto mb-4 text-dark-accent" />
            <p className="text-dark-text-primary">Requesting camera access...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (hasPermission === false) {
    return (
      <div className="fixed inset-0 bg-dark-primary/90 flex items-center justify-center z-50">
        <Card className="w-full max-w-sm mx-4 bg-dark-secondary border-dark-accent/20">
          <CardContent className="p-6">
            <Alert className="bg-dark-primary/50 border-dark-accent/30">
              <Camera className="h-4 w-4" />
              <AlertDescription className="text-dark-text-primary">{error}</AlertDescription>
            </Alert>
            <div className="flex space-x-2 mt-4">
              <Button onClick={handleManualInput} className="flex-1 neon-gradient text-dark-primary">
                Manual Input
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="border-dark-accent/50 text-dark-accent bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-dark-primary z-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-dark-primary/80 to-transparent">
        <div className="flex items-center justify-between text-dark-text-primary">
          <h2 className="text-lg font-semibold">Scan Farm QR Code</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-dark-text-primary hover:bg-dark-accent/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Camera View */}
      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
      <canvas ref={canvasRef} className="hidden" />

      {/* Scanning Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-64 h-64 border-2 border-dark-text-primary rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 border-4 border-dark-accent rounded-lg animate-pulse" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-dark-accent scan-animation" />
          </div>
          <p className="text-dark-text-primary text-center mt-4">Position QR code within the frame</p>
          {scannedData && (
            <div className="text-center mt-2">
              <Badge className="bg-dark-accent text-dark-primary">Detected: {scannedData}</Badge>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark-primary/80 to-transparent">
        <div className="flex items-center justify-center space-x-4">
          <Button variant="ghost" size="icon" className="text-dark-text-primary hover:bg-dark-accent/20">
            <Flashlight className="h-5 w-5" />
          </Button>

          <Button
            onClick={() => {
              const mockFarmIds = ["FARM_JM_001", "FARM_JM_002", "FARM_JM_003"]
              const randomId = mockFarmIds[Math.floor(Math.random() * mockFarmIds.length)]
              onScan(randomId)
            }}
            className="px-8 py-3 neon-gradient text-dark-primary rounded-full hover:glow-effect transition-all duration-300"
          >
            <QrCode className="mr-2 h-5 w-5" />
            Simulate Scan
          </Button>

          <Button variant="ghost" size="icon" className="text-dark-text-primary hover:bg-dark-accent/20">
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>

        <Button
          variant="ghost"
          onClick={handleManualInput}
          className="w-full mt-4 text-dark-text-primary hover:bg-dark-accent/20"
        >
          Enter Farm ID Manually
        </Button>
      </div>
    </div>
  )
}
