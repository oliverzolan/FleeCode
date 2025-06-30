"use client"

import {
  Trophy,
  Target,
  Clock,
  Users,
  Play
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCallback } from "react"

export function Blind75Hero() {
  const handleStart = useCallback(() => {
    if (typeof window !== 'undefined') {
      document.getElementById('blind75-problems')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="relative overflow-hidden">
      <Card className="border-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <CardContent className="p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            {/* Left Copy */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-8 w-8 text-yellow-400" />
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Interview Prep
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Master the <span className="block text-yellow-300">Blind 75</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  The most essential coding interview problems, carefully curated to cover all fundamental patterns and
                  data structures you need to succeed.
                </p>
              </div>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <Target className="h-4 w-4" />
                  <span className="text-sm font-medium">75 Essential Problems</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">40–60 Hours</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">Used by 100k+ Engineers</span>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" onClick={handleStart}>
                  <Play className="mr-2 h-5 w-5" /> Start Your Journey
                </Button>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-400/20 border-4 border-green-400 flex items-center justify-center">
                    <span className="text-sm font-bold">12</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-400/20 border-4 border-blue-400 flex items-center justify-center">
                    <span className="text-xs font-bold">5</span>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="w-14 h-14 rounded-full bg-yellow-400/20 border-4 border-yellow-400 flex items-center justify-center">
                    <span className="text-sm font-bold">8</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-400/20 border-4 border-purple-400 flex items-center justify-center">
                    <span className="text-xs font-bold">3</span>
                  </div>
                </div>
                <div className="space-y-4 pt-4">
                  <div className="w-12 h-12 rounded-full bg-pink-400/20 border-4 border-pink-400 flex items-center justify-center">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-orange-400/20 border-4 border-orange-400 flex items-center justify-center">
                    <span className="text-sm font-bold">15</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 