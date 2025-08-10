export interface User {
  id: string
  email: string
  role: "agent" | "admin" | "researcher"
  name: string
  kebele?: string
  created_at: string
}

export interface Farm {
  id: string
  qr_code: string
  farmer_name: string
  kebele: string
  plot_area: number
  water_source: string
  soil_class: string
  lat: number
  lng: number
  ndvi_score?: number
  last_visit?: string
  created_at: string
}

export interface CropRecommendation {
  name: string
  score: number
  expected_profit_min: number
  expected_profit_max: number
  water_per_kg: number
  plant_before: string
}

export interface CalendarTask {
  task_id: string
  task: string
  date_from: string
  date_to: string
  rationale: string
  completed?: boolean
}

export interface AIResponse {
  top_crops: CropRecommendation[]
  calendar: CalendarTask[]
  confidence: number
}

export interface VerificationRecord {
  id: string
  farm_id: string
  action_type: "planting" | "harvest" | "irrigation"
  image_url?: string
  ai_confidence?: number
  ai_label?: string
  verified: boolean
  blockchain_hash?: string
  created_at: string
}
