import { ArrowLeft, BookOpen, Clock, Trophy } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface ProblemHeaderProps {
  problem: {
    id: number
    title: string
    difficulty: "Easy" | "Medium" | "Hard"
    category: string
    concepts: string[]
    timeComplexity: string
    spaceComplexity: string
  }
}

export function ProblemHeader({ problem }: ProblemHeaderProps) {
  return (
    <div className="border-b bg-background p-6">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold">{problem.title}</h1>
            <Badge
              variant="outline"
              className={
                problem.difficulty === "Easy"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : problem.difficulty === "Medium"
                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                    : "bg-red-50 text-red-700 border-red-200"
              }
            >
              {problem.difficulty}
            </Badge>
          </div>
          <p className="text-muted-foreground">{problem.category}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <BookOpen className="mr-2 h-4 w-4" />
            Study Guide
          </Button>
          <Button variant="outline" size="sm">
            <Trophy className="mr-2 h-4 w-4" />
            Hints
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <h3 className="font-medium">Key Concepts</h3>
          <div className="flex flex-wrap gap-1">
            {problem.concepts.map((concept) => (
              <Badge key={concept} variant="secondary" className="text-xs">
                {concept}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">Complexity</h3>
          <div className="text-sm text-muted-foreground">
            <div>Time: {problem.timeComplexity}</div>
            <div>Space: {problem.spaceComplexity}</div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">Your Progress</h3>
          <div className="flex items-center gap-2">
            <Progress value={25} className="flex-1 h-2" />
            <span className="text-xs text-muted-foreground">25%</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Started 2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
