"use client"

import { InteractiveCropCalendar } from "@/components/calendar/interactive-crop-calendar"

// Sample data for the interactive calendar
const sampleCalendarData = {
  top_crops: [
    {
      name: "Teff",
      expected_profit_min: 45000,
      expected_profit_max: 65000,
      resilience_score: 0.92,
    },
    {
      name: "Coffee",
      expected_profit_min: 80000,
      expected_profit_max: 120000,
      resilience_score: 0.88,
    },
    {
      name: "Maize",
      expected_profit_min: 35000,
      expected_profit_max: 55000,
      resilience_score: 0.75,
    },
  ],
  calendar: [
    {
      task_id: "WEEK1_PREP",
      task: "Land preparation and soil testing",
      date_from: "2024-01-15",
      date_to: "2024-01-21",
      rationale: "Proper land preparation is crucial for optimal crop establishment in loamy soil at 1780m altitude.",
      category: "maintenance",
      priority: "high",
    },
    {
      task_id: "WEEK2_SEED",
      task: "Seed selection and treatment",
      date_from: "2024-01-22",
      date_to: "2024-01-28",
      rationale:
        "Select climate-resilient varieties suitable for Jimma's rainfall pattern and treat seeds to prevent diseases.",
      category: "planting",
      priority: "high",
    },
    {
      task_id: "WEEK3_PLANT",
      task: "Planting and initial irrigation",
      date_from: "2024-01-29",
      date_to: "2024-02-04",
      rationale: "Optimal planting window considering the wet season timing and water source availability.",
      category: "planting",
      priority: "high",
    },
    {
      task_id: "WEEK4_FERT",
      task: "First fertilizer application",
      date_from: "2024-02-05",
      date_to: "2024-02-11",
      rationale: "Apply organic fertilizer suitable for loamy soil to support early growth phase.",
      category: "fertilizer",
      priority: "medium",
    },
    {
      task_id: "WEEK5_WEED",
      task: "Weeding and pest monitoring",
      date_from: "2024-02-12",
      date_to: "2024-02-18",
      rationale: "Critical period for weed control and pest monitoring during the humid season in Jimma.",
      category: "maintenance",
      priority: "medium",
    },
    {
      task_id: "WEEK6_WATER",
      task: "Irrigation management and growth assessment",
      date_from: "2024-02-19",
      date_to: "2024-02-25",
      rationale: "Monitor soil moisture and adjust irrigation based on rainfall patterns and crop development stage.",
      category: "irrigation",
      priority: "medium",
    },
  ],
  confidence: 0.87,
}

const sampleFarmProfile = {
  soil_type: "loamy",
  altitude_meters: 1780,
  monthly_rainfall_mm: [120, 110, 130, 180, 250, 300, 290, 280, 220, 170, 140, 130],
  past_yields_kg_per_ha: {
    maize: 2500,
    teff: 1800,
    sorghum: 2200,
    coffee: 1200,
  },
}

export function CropCalendar() {
  return <InteractiveCropCalendar calendarData={sampleCalendarData} farmProfile={sampleFarmProfile} />
}
