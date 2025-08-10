import { type NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

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

export async function POST(request: NextRequest) {
  try {
    const { farmProfile }: { farmProfile: FarmProfile } = await request.json()

    const prompt = `You are IndieCrop, an AI agronomist assistant specialized in Jimma, Ethiopia. Your job is to analyze the following farm profile and 10-year climate data, then recommend the most suitable high-value or climate-resilient crops for the specific plot or kebele.

Farm Profile:
{
  "soil_type": "${farmProfile.soil_type}",
  "altitude_meters": ${farmProfile.altitude_meters},
  "monthly_rainfall_mm": [${farmProfile.monthly_rainfall_mm.join(", ")}],
  "past_yields_kg_per_ha": {
    "maize": ${farmProfile.past_yields_kg_per_ha.maize},
    "teff": ${farmProfile.past_yields_kg_per_ha.teff},
    "sorghum": ${farmProfile.past_yields_kg_per_ha.sorghum},
    "coffee": ${farmProfile.past_yields_kg_per_ha.coffee}
  }
}

10-year Climate Summary (Jimma):
{
  "average_temperature_c": [22, 23, 23, 24, 25, 25, 24, 24, 23, 22, 21, 22],
  "humidity_percent": [75, 73, 74, 78, 82, 85, 84, 83, 79, 77, 76, 74],
  "drought_years": [2012, 2015],
  "flood_years": [2016, 2018]
}

Instructions:
1. Based on the farm profile and climate data, recommend the top 3 crops best suited for planting this season.
2. Focus on high-value or climate-resilient crops considering soil, rainfall, altitude, and past yields.
3. For each crop, provide:
   - Name
   - Expected profit range (min and max in Ethiopian Birr)
   - Resilience score (0 to 1, where 1 means highly resilient)
4. Generate a 6-week actionable crop calendar with weekly tasks, each task containing:
   - Task ID
   - Task description
   - Start date and end date (ISO format, starting from today)
   - Rationale explaining the importance of the task given the climate and farm profile

Return ONLY strict JSON matching this schema:
{
  "top_crops": [
    {
      "name": string,
      "expected_profit_min": number,
      "expected_profit_max": number,
      "resilience_score": number
    }
  ],
  "calendar": [
    {
      "task_id": string,
      "task": string,
      "date_from": "YYYY-MM-DD",
      "date_to": "YYYY-MM-DD",
      "rationale": string
    }
  ],
  "confidence": number
}`

    if (!GEMINI_API_KEY) {
      // Fallback response for demo
      const today = new Date()
      const getDateString = (daysFromNow: number) => {
        const date = new Date(today)
        date.setDate(date.getDate() + daysFromNow)
        return date.toISOString().split("T")[0]
      }

      return NextResponse.json({
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
            date_from: getDateString(0),
            date_to: getDateString(7),
            rationale: `For ${farmProfile.soil_type} soil at ${farmProfile.altitude_meters}m altitude, proper land preparation is crucial for optimal crop establishment.`,
          },
          {
            task_id: "WEEK2_SEED",
            task: "Seed selection and treatment",
            date_from: getDateString(7),
            date_to: getDateString(14),
            rationale:
              "Select climate-resilient varieties suitable for Jimma's rainfall pattern and treat seeds to prevent diseases.",
          },
          {
            task_id: "WEEK3_PLANT",
            task: "Planting and initial irrigation",
            date_from: getDateString(14),
            date_to: getDateString(21),
            rationale: `Optimal planting window for ${farmProfile.water_source} water source, considering the wet season timing.`,
          },
          {
            task_id: "WEEK4_FERT",
            task: "First fertilizer application",
            date_from: getDateString(21),
            date_to: getDateString(28),
            rationale: `Apply organic fertilizer suitable for ${farmProfile.soil_type} soil to support early growth phase.`,
          },
          {
            task_id: "WEEK5_WEED",
            task: "Weeding and pest monitoring",
            date_from: getDateString(28),
            date_to: getDateString(35),
            rationale: "Critical period for weed control and pest monitoring during the humid season in Jimma.",
          },
          {
            task_id: "WEEK6_WATER",
            task: "Irrigation management and growth assessment",
            date_from: getDateString(35),
            date_to: getDateString(42),
            rationale:
              "Monitor soil moisture and adjust irrigation based on rainfall patterns and crop development stage.",
          },
        ],
        confidence: 0.87,
      })
    }

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`)
    }

    const data = await response.json()
    const generatedText = data.candidates[0].content.parts[0].text

    // Parse the JSON response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response")
    }

    const recommendations = JSON.parse(jsonMatch[0])
    return NextResponse.json(recommendations)
  } catch (error) {
    console.error("Error generating recommendations:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
