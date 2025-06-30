"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Search, Filter, ChevronDown } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Problem {
  id: string
  title: string
  difficulty: string
}

export function SimplifiedProblemsList() {
  const { data: session, status } = useSession()
  const [problems, setProblems] = useState<Problem[]>([])
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")

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
          const transformedProblems = data.slice(0, 50).map((problem: any) => ({
            id: problem.id,
            title: problem.title,
            difficulty: problem.difficulty,
          }))
          setProblems(transformedProblems)
          setFilteredProblems(transformedProblems)
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

  useEffect(() => {
    let filtered = problems

    if (searchQuery) {
      filtered = filtered.filter(problem =>
        problem.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (difficultyFilter !== "all") {
      filtered = filtered.filter(problem => problem.difficulty === difficultyFilter)
    }

    setFilteredProblems(filtered)
  }, [problems, searchQuery, difficultyFilter])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "EASY":
        return "bg-green-50 text-green-700 border-green-200"
      case "MEDIUM":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "HARD":
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
      {/* Search and Filter Controls */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setDifficultyFilter("all")}>
              All Difficulties
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDifficultyFilter("EASY")}>
              Easy
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDifficultyFilter("MEDIUM")}>
              Medium
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDifficultyFilter("HARD")}>
              Hard
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Showing {filteredProblems.length} of {problems.length} problems
          </span>
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-2">
        {filteredProblems.map((problem) => (
          <Card key={problem.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Link
                  href={`/problem/${problem.id}`}
                  className="font-medium hover:text-primary transition-colors flex-1"
                >
                  {problem.title}
                </Link>
                <Badge
                  variant="outline"
                  className={getDifficultyColor(problem.difficulty)}
                >
                  {problem.difficulty}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProblems.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No problems found matching your criteria.
        </div>
      )}
    </div>
  )
} 