import { BookOpen, Code, FileText, GraduationCap, Home, LineChart, Trophy, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export function SideNav() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="px-2 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Navigation</h2>
        <div className="space-y-1">
          <Button variant="secondary" className="w-full justify-start" asChild>
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button variant="secondary" className="w-full justify-start" asChild>
            <Link href="/problems">
              <Code className="mr-2 h-4 w-4" />
              Problems
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/learn">
              <BookOpen className="mr-2 h-4 w-4" />
              Learn
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/progress">
              <LineChart className="mr-2 h-4 w-4" />
              Progress
            </Link>
          </Button>
        </div>
      </div>
      <Separator />
      <div className="px-2 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Learning</h2>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/tutorials">
              <GraduationCap className="mr-2 h-4 w-4" />
              Tutorials
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/notes">
              <FileText className="mr-2 h-4 w-4" />
              Notes
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/community">
              <Users className="mr-2 h-4 w-4" />
              Community
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/achievements">
              <Trophy className="mr-2 h-4 w-4" />
              Achievements
            </Link>
          </Button>
        </div>
      </div>
      <Separator />
      <div className="px-2 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Your Progress</h2>
        <div className="space-y-3 px-4">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium">Overall</span>
              <span className="text-xs text-muted-foreground">42%</span>
            </div>
            <Progress value={42} className="h-2" />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium">Arrays</span>
              <span className="text-xs text-muted-foreground">65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium">Linked Lists</span>
              <span className="text-xs text-muted-foreground">30%</span>
            </div>
            <Progress value={30} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  )
}
