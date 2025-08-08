import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: Request) {
  try {
    const { showName, intensity } = await request.json()
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured')
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    // Create intensity-specific prompts
    const intensityPrompts = {
      mild: 'Create a mildly surprising but believable fake spoiler that could realistically happen in the show. Make it feel authentic and inline with the original plot.',
      twisted: 'Create a dramatically twisted but still believable fake spoiler with major plot twists. Make it shocking but feel like it could actually be part of the show.',
      psychotic: 'Create an absolutely wild and mind-bending fake spoiler that breaks conventional storytelling but still feels like it could be a crazy plot twist the writers might actually do.'
    }

    const intensityPrompt = intensityPrompts[intensity as keyof typeof intensityPrompts] || intensityPrompts.mild

    // Construct the prompt
    const prompt = `Provide me a fake spoiler for "${showName}" such that it feels very authentic and inline with the original plot that it feels very easy to believe. ${intensityPrompt}

Requirements:
- Make it sound like a real spoiler someone would leak
- Use actual character names and plot elements from the show
- Keep it concise (1-3 sentences)
- Make it believable enough that fans would debate if it's real
- Don't mention that it's fake in the response
- Write it as if you're revealing a genuine spoiler

Spoiler:`

    // Generate content
    const result = await model.generateContent(prompt)
    const response = await result.response
    const spoilerText = response.text()

    // Check if it might be an upcoming season/episode
    const isUpcoming = showName.toLowerCase().includes('season') && 
                      (showName.includes('5') || showName.includes('6') || showName.includes('7') || 
                       showName.includes('8') || showName.includes('9') || showName.includes('10') ||
                       showName.toLowerCase().includes('five') || showName.toLowerCase().includes('six') ||
                       showName.toLowerCase().includes('seven') || showName.toLowerCase().includes('eight'))

    return NextResponse.json({
      spoiler: spoilerText.trim(),
      isUpcoming: isUpcoming
    })

  } catch (error) {
    console.error('Error generating spoiler:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate spoiler. Please check your API configuration.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
