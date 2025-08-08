'use client'

import { useState, useEffect } from 'react'
import { Copy, Clapperboard, Shuffle, Eye, EyeOff, Github, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function FauxSpoil() {
  const [showName, setShowName] = useState('')
  const [intensity, setIntensity] = useState('')
  const [spoiler, setSpoiler] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [showCopyTooltip, setShowCopyTooltip] = useState(false)
  const [typewriterText, setTypewriterText] = useState('')
  const [isUpcoming, setIsUpcoming] = useState(false)
  const [error, setError] = useState('')

  const intensityOptions = [
    { value: 'mild', label: 'Mildly Wrong' },
    { value: 'twisted', label: 'Totally Twisted' },
    { value: 'psychotic', label: 'Psychotic' }
  ]

  const randomShows = [
    'Stranger Things Season 5',
    'The Last of Us Season 3', 
    'Wednesday Season 2',
    'House of the Dragon Season 3',
    'The Witcher Season 4',
    'Avatar: The Last Airbender Netflix',
    'Dune: Prophecy',
    'The Boys Season 5',
    'Breaking Bad Season 6',
    'Game of Thrones Season 9'
  ]

  useEffect(() => {
    if (spoiler && isRevealed) {
      let i = 0
      const timer = setInterval(() => {
        if (i < spoiler.length) {
          setTypewriterText(spoiler.slice(0, i + 1))
          i++
        } else {
          clearInterval(timer)
        }
      }, 30)
      return () => clearInterval(timer)
    }
  }, [spoiler, isRevealed])

  const generateSpoiler = async () => {
    if (!intensity) return
    
    setIsGenerating(true)
    setIsRevealed(false)
    setTypewriterText('')
    setError('')
    
    try {
      const inputText = showName.trim() || 'a random popular TV series'
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          showName: inputText,
          intensity: intensity
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate spoiler')
      }

      const data = await response.json()
      
      setSpoiler(data.spoiler)
      setIsUpcoming(data.isUpcoming || false)
      setIsGenerating(false)
      setIsRevealed(true)
      
    } catch (err) {
      setError('Failed to generate spoiler. Please try again.')
      setIsGenerating(false)
      console.error('Error generating spoiler:', err)
    }
  }

  const feelingLucky = async () => {
    const randomShow = randomShows[Math.floor(Math.random() * randomShows.length)]
    const randomIntensity = intensityOptions[Math.floor(Math.random() * intensityOptions.length)]
    
    setShowName(randomShow)
    setIntensity(randomIntensity.value)
    
    // Auto-generate after setting values
    setTimeout(() => {
      generateSpoiler()
    }, 500)
  }

  const copyToClipboard = async () => {
    if (spoiler) {
      await navigator.clipboard.writeText(spoiler)
      setShowCopyTooltip(true)
      setTimeout(() => setShowCopyTooltip(false), 2000)
    }
  }

  const toggleReveal = () => {
    setIsRevealed(!isRevealed)
    if (!isRevealed) {
      setTypewriterText('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-cyan-400 glitch-text">
            FauxSpoil
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            Absurdly believable spoilers for shows, movies & unreleased chaos
          </p>
          <div className="text-4xl mb-8 animate-bounce">
            📺🕵️‍♂️🔥
          </div>
        </div>

        {/* Input Area */}
        <Card className="bg-gray-800 border-green-500 border-2 mb-8 shadow-lg shadow-green-500/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-cyan-400">
                  Enter a series name, season or episode (optional)
                </label>
                <Input
                  value={showName}
                  onChange={(e) => setShowName(e.target.value)}
                  placeholder="e.g., Stranger Things Season 5, Wednesday S2E8, Breaking Bad"
                  className="bg-gray-700 border-gray-600 text-green-400 placeholder-gray-500 focus:border-cyan-400"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty for a random spoiler • Powered by Gemini AI
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-cyan-400">
                  Spoiler Intensity
                </label>
                <Select value={intensity} onValueChange={setIntensity}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-green-400">
                    <SelectValue placeholder="Choose your chaos level..." />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {intensityOptions.map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        className="text-green-400 focus:bg-gray-700 focus:text-cyan-400"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={generateSpoiler}
                  disabled={!intensity || isGenerating}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-black font-bold py-3 disabled:opacity-50"
                >
                  <Clapperboard className="mr-2 h-5 w-5" />
                  {isGenerating ? 'AI is Fabricating...' : 'Generate Spoiler 🎬'}
                </Button>
                
                <Button
                  onClick={feelingLucky}
                  disabled={isGenerating}
                  variant="outline"
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-3"
                >
                  <Shuffle className="mr-2 h-5 w-5" />
                  Feeling Lucky?
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="bg-red-900/20 border-red-500 border-2 mb-8">
            <CardContent className="p-4">
              <p className="text-red-400">⚠️ {error}</p>
            </CardContent>
          </Card>
        )}

        {/* Output Section */}
        {spoiler && (
          <Card className="bg-gray-800 border-red-500 border-2 mb-8 shadow-lg shadow-red-500/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-red-400">🚨 SPOILER ALERT 🚨</h3>
                <Button
                  onClick={toggleReveal}
                  variant="ghost"
                  size="sm"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  {isRevealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {isRevealed ? 'Hide' : 'Reveal'}
                </Button>
              </div>
              
              <div className={`p-4 rounded-lg bg-gray-900 border border-gray-700 min-h-[100px] ${!isRevealed ? 'blur-sm select-none' : ''}`}>
                <p className="text-lg leading-relaxed text-gray-200">
                  {isRevealed ? typewriterText : spoiler}
                  {isRevealed && typewriterText.length < spoiler.length && (
                    <span className="animate-pulse">|</span>
                  )}
                </p>
              </div>

              {isUpcoming && (
                <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg">
                  <p className="text-yellow-400 text-sm">
                    🚨 The show isn't out yet, but AI made something up just for you.
                  </p>
                </div>
              )}

              {/* Share Button */}
              <div className="mt-4 relative">
                <Button
                  onClick={copyToClipboard}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Spoiler
                </Button>
                {showCopyTooltip && (
                  <div className="absolute top-full left-0 mt-2 px-3 py-1 bg-gray-700 text-green-400 text-sm rounded-lg border border-green-500">
                    Spoiler copied! 📋
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm border-t border-gray-700 pt-8">
          <p className="mb-4">
            Built for the <span className="text-cyan-400">Dare to Build the Useless Hackathon</span> with ✨, sarcasm & AI
          </p>
          <div className="flex justify-center gap-6">
            <a 
              href="#" 
              className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Zap className="h-4 w-4" />
              Credits
            </a>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .glitch-text {
          position: relative;
          animation: glitch 2s infinite;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: 'FauxSpoil';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch-text::before {
          animation: glitch-1 0.5s infinite;
          color: #ff0000;
          z-index: -1;
        }
        
        .glitch-text::after {
          animation: glitch-2 0.5s infinite;
          color: #00ffff;
          z-index: -2;
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, 2px); }
          80% { transform: translate(-2px, -2px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, -2px); }
          40% { transform: translate(-2px, 2px); }
          60% { transform: translate(2px, -2px); }
          80% { transform: translate(2px, 2px); }
        }
      `}</style>
    </div>
  )
}
