import { Search, Filter, BookOpen, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function ProblemsHeader() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Problems</h1>
          <p className="text-muted-foreground">Master data structures and algorithms through guided practice</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <BookOpen className="mr-2 h-4 w-4" />
            Study Plan
          </Button>
          <Button variant="outline" size="sm">
            <TrendingUp className="mr-2 h-4 w-4" />
            Progress Report
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search problems, topics, or concepts..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Quick filters:</span>
        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
          Not Started
        </Badge>
        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
          In Progress
        </Badge>
        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
          Easy
        </Badge>
        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
          Arrays
        </Badge>
      </div>
    </div>
  )
}
