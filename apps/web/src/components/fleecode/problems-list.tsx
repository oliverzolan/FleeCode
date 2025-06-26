"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { ArrowUpDown, BookOpen, CheckCircle, Clock, Play, Star } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Problem {
  id: number
  title: string
  difficulty: string
  category: string
  description: string
  acceptanceRate?: number
  likes?: number
  estimatedTime?: string
  status?: "completed" | "in-progress" | "not-started"
}

export function ProblemsList() {
  const { data: session, status } = useSession()
  const [sortBy, setSortBy] = useState("recommended")
  const [problems, setProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProblems = async () => {
      if (status === 'loading' || !session) {
        return
      }

      try {
        const response = await fetch('/api/problems', {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (response.ok) {
          const data = await response.json()
          // Transform the data to match the expected format
          const transformedProblems = data.map((problem: any) => ({
            id: problem.id,
            title: problem.title,
            difficulty: problem.difficulty,
            category: problem.category || "Algorithms",
            description: problem.description,
            acceptanceRate: problem.acceptanceRate || Math.floor(Math.random() * 50) + 30,
            likes: problem.likes || Math.floor(Math.random() * 2000) + 500,
            estimatedTime: problem.estimatedTime || "15-30 min",
            status: "not-started" as const // Default status, you can implement user progress tracking later
          }))
          setProblems(transformedProblems)
        } else {
          console.error('Failed to fetch problems')
        }
      } catch (error) {
        console.error('Error fetching problems:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProblems()
  }, [session, status])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      default:
        return <Play className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200"
      case "in-progress":
        return "bg-blue-50 text-blue-700 border-blue-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-50 text-green-700 border-green-200"
      case "Medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "Hard":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center h-32">
          <div className="text-lg">Loading problems...</div>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center h-32">
          <div className="text-lg">Please sign in to view problems</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Showing {problems.length} problems</span>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="difficulty">Difficulty</SelectItem>
            <SelectItem value="acceptance">Acceptance Rate</SelectItem>
            <SelectItem value="frequency">Frequency</SelectItem>
            <SelectItem value="recent">Recently Added</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {problems.map((problem) => (
          <Card key={problem.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {getStatusIcon(problem.status || "not-started")}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Link
                        href={`/problem/${problem.id}`}
                        className="font-medium hover:text-primary transition-colors truncate"
                      >
                        {problem.title}
                      </Link>
                      <Badge
                        variant="outline"
                        className={getDifficultyColor(problem.difficulty)}
                      >
                        {problem.difficulty}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getStatusColor(problem.status || "not-started")}
                      >
                        {problem.status === "completed" ? "Completed" : 
                         problem.status === "in-progress" ? "In Progress" : "Not Started"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {problem.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{problem.category}</span>
                      <span>•</span>
                      <span>{problem.acceptanceRate}% acceptance</span>
                      <span>•</span>
                      <span>{problem.likes} likes</span>
                      <span>•</span>
                      <span>{problem.estimatedTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/problem/${problem.id}`}>
                      <BookOpen className="mr-2 h-3 w-3" />
                      Solve
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
