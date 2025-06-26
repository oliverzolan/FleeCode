import { ChevronRight, FileCode } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"

export function DataStructureTree() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Structures & Algorithms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <DataStructureCategory
          name="Arrays & Strings"
          progress={65}
          problems={[
            { id: 1, name: "Two Sum", difficulty: "Easy", completed: true },
            { id: 2, name: "Valid Anagram", difficulty: "Easy", completed: true },
            { id: 3, name: "Group Anagrams", difficulty: "Medium", completed: true },
            { id: 4, name: "Longest Substring Without Repeating Characters", difficulty: "Medium", completed: false },
            { id: 5, name: "Longest Palindromic Substring", difficulty: "Medium", completed: false },
          ]}
        />

        <DataStructureCategory
          name="Linked Lists"
          progress={30}
          problems={[
            { id: 6, name: "Reverse Linked List", difficulty: "Easy", completed: true },
            { id: 7, name: "Merge Two Sorted Lists", difficulty: "Easy", completed: false },
            { id: 8, name: "Linked List Cycle", difficulty: "Easy", completed: false },
            { id: 9, name: "Remove Nth Node From End of List", difficulty: "Medium", completed: false },
            { id: 10, name: "LRU Cache", difficulty: "Medium", completed: false },
          ]}
        />

        <DataStructureCategory
          name="Trees & Graphs"
          progress={15}
          problems={[
            { id: 11, name: "Maximum Depth of Binary Tree", difficulty: "Easy", completed: true },
            { id: 12, name: "Validate Binary Search Tree", difficulty: "Medium", completed: false },
            { id: 13, name: "Binary Tree Level Order Traversal", difficulty: "Medium", completed: false },
            { id: 14, name: "Number of Islands", difficulty: "Medium", completed: false },
            { id: 15, name: "Course Schedule", difficulty: "Medium", completed: false },
          ]}
        />

        <DataStructureCategory
          name="Dynamic Programming"
          progress={10}
          problems={[
            { id: 16, name: "Climbing Stairs", difficulty: "Easy", completed: true },
            { id: 17, name: "House Robber", difficulty: "Medium", completed: false },
            { id: 18, name: "Coin Change", difficulty: "Medium", completed: false },
            { id: 19, name: "Longest Increasing Subsequence", difficulty: "Medium", completed: false },
            { id: 20, name: "Word Break", difficulty: "Medium", completed: false },
          ]}
        />
      </CardContent>
    </Card>
  )
}

interface DataStructureCategoryProps {
  name: string
  progress: number
  problems: {
    id: number
    name: string
    difficulty: "Easy" | "Medium" | "Hard"
    completed: boolean
  }[]
}

function DataStructureCategory({ name, progress, problems }: DataStructureCategoryProps) {
  return (
    <Collapsible className="border rounded-lg">
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-1 items-center gap-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
              <ChevronRight className="h-4 w-4 transition-transform duration-200 [&[data-state=open]>svg]:rotate-90" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
          <span className="font-medium">{name}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{progress}%</span>
            <div className="w-24">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
          <Badge variant="outline" className="ml-auto">
            {problems.length} problems
          </Badge>
        </div>
      </div>
      <CollapsibleContent>
        <div className="space-y-1 p-2">
          {problems.map((problem) => (
            <Link
              key={problem.id}
              href={`/problem/${problem.id}`}
              className="flex items-center gap-2 rounded-md px-4 py-2 hover:bg-muted"
            >
              <FileCode className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={problem.completed ? "text-muted-foreground line-through" : ""}>{problem.name}</span>
                  {problem.completed && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Completed
                    </Badge>
                  )}
                </div>
              </div>
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
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
