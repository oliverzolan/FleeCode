import { BookOpen, Code, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StudyRecommendations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended for You</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border p-3">
          <div className="flex items-start gap-3">
            <div className="rounded-md bg-primary/10 p-2">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Learn Linked List Fundamentals</h3>
              <p className="text-sm text-muted-foreground">
                Master the basics of linked lists before tackling more problems
              </p>
              <div className="flex items-center gap-2 pt-1">
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  Start Learning
                </Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs">
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Resources
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-3">
          <div className="flex items-start gap-3">
            <div className="rounded-md bg-primary/10 p-2">
              <Code className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Practice Array Problems</h3>
              <p className="text-sm text-muted-foreground">Continue your progress with array manipulation techniques</p>
              <div className="flex items-center gap-2 pt-1">
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  View Problems
                </Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs">
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Resources
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
