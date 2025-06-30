"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Search, Filter, ChevronDown, Trophy } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Blind75Problem {
  id: string
  title: string
  difficulty: string
  blind75Id: number
  category: string
}

export function Blind75ProblemsList() {
  const { data: session, status } = useSession()
  const [problems, setProblems] = useState<Blind75Problem[]>([])
  const [filteredProblems, setFilteredProblems] = useState<Blind75Problem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  useEffect(() => {
    const fetchBlind75Problems = async () => {
      if (status === 'loading' || !session) {
        return
      }

      try {
        const response = await fetch('/api/problems/blind75', {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (response.ok) {
          const data = await response.json()
          setProblems(data)
          setFilteredProblems(data)
        } else {
          console.error('Failed to fetch Blind 75 problems')
        }
      } catch (error) {
        console.error('Error fetching Blind 75 problems:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlind75Problems()
  }, [session, status])

  useEffect(() => {
    let filtered = problems
    // TODO: merge the filters
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(problem =>
        problem.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Difficulty filter
    if (difficultyFilter !== "all") {
      filtered = filtered.filter(problem => problem.difficulty === difficultyFilter)
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(problem => problem.category === categoryFilter)
    }

    setFilteredProblems(filtered)
  }, [problems, searchQuery, difficultyFilter, categoryFilter])

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

  const getCategoryColor = (category: string) => {
    const colors = [
      "bg-blue-50 text-blue-700 border-blue-200",
      "bg-purple-50 text-purple-700 border-purple-200",
      "bg-orange-50 text-orange-700 border-orange-200",
      "bg-pink-50 text-pink-700 border-pink-200",
      "bg-indigo-50 text-indigo-700 border-indigo-200",
      "bg-teal-50 text-teal-700 border-teal-200",
    ]
    const index = category.charCodeAt(0) % colors.length
    return colors[index]
  }

  const categories = Array.from(new Set(problems.map(p => p.category))).sort()

  if (status === 'loading' || loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center h-32">
          <div className="text-lg">Loading Blind 75 problems...</div>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center h-32">
          <div className="text-lg">Please sign in to view Blind 75 problems</div>
        </div>
      </div>
    )
  }

  return (
    <div id="blind75-problems" className="space-y-6">
      {/* Progress Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-6 w-6 text-yellow-600" />
            <div>
              <h3 className="text-lg font-semibold">Your Progress</h3>
              <p className="text-sm text-muted-foreground">Track your Blind 75 completion</p>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">0 of 75 problems completed</span>
            <span className="text-sm text-muted-foreground">0%</span>
          </div>
          <Progress value={0} className="h-2" />
        </CardContent>
      </Card>

      {/* Search and Filter Controls */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search Blind 75 problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Difficulty
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Category
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setCategoryFilter("all")}>
              All Categories
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem key={category} onClick={() => setCategoryFilter(category)}>
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Problems List */}
      <ul className="rounded-md border divide-y">
        {filteredProblems.map((problem) => (
          <li key={problem.id} className="flex items-center justify-between gap-4 p-3 hover:bg-muted">
            <Link href={`/problem/${problem.id}`} className="flex-1 truncate hover:text-primary font-medium">
              {problem.title}
            </Link>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge variant="outline" className={getCategoryColor(problem.category)}>
                {problem.category}
              </Badge>
              <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
                {problem.difficulty}
              </Badge>
            </div>
          </li>
        ))}
      </ul>

      {filteredProblems.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No Blind 75 problems found matching your criteria.
        </div>
      )}
    </div>
  )
} 