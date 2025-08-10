"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, X, Flashlight, RotateCcw } from "lucide-react"

interface QRScannerProps {
  onScan: (farmId: string) => void
  onClose: () => void
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [error, setError] = useState<string>("")
  const [isScanning, setIsScanning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

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

  const handleManualInput = () => {
    const farmId = prompt("Enter Farm ID manually:")
    if (farmId) {
      onScan(farmId)
    }
  }

  // Simulate QR detection (in real app, use a QR library like zxing-js)
  const simulateScan = () => {
    const mockFarmIds = ["F001", "F002", "F003", "F004", "F005"]
    const randomId = mockFarmIds[Math.floor(Math.random() * mockFarmIds.length)]
    onScan(randomId)
  }

  if (hasPermission === null) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <Card className="w-full max-w-sm mx-4">
          <CardContent className="p-6 text-center">
            <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p>Requesting camera access...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (hasPermission === false) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <Card className="w-full max-w-sm mx-4">
          <CardContent className="p-6">
            <Alert>
              <Camera className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <div className="flex space-x-2 mt-4">
              <Button onClick={handleManualInput} className="flex-1">
                Manual Input
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between text-white">
          <h2 className="text-lg font-semibold">Scan Farm QR Code</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Camera View */}
      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

      {/* Scanning Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-64 h-64 border-2 border-white rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 border-4 border-agri-500 rounded-lg animate-pulse" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-agri-500 scan-animation" />
          </div>
          <p className="text-white text-center mt-4">Position QR code within the frame</p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex items-center justify-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Flashlight className="h-5 w-5" />
          </Button>

          <Button onClick={simulateScan} className="px-8 py-3 bg-agri-500 hover:bg-agri-600 text-white rounded-full">
            Simulate Scan
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>

        <Button variant="ghost" onClick={handleManualInput} className="w-full mt-4 text-white hover:bg-white/20">
          Enter Farm ID Manually
        </Button>
      </div>
    </div>
  )
}
