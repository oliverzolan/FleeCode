"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function ProblemsFilters() {
  const [openSections, setOpenSections] = useState({
    difficulty: true,
    category: true,
    status: true,
    concepts: false,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Difficulty Filter */}
        <Collapsible open={openSections.difficulty} onOpenChange={() => toggleSection("difficulty")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="font-medium">Difficulty</span>
              {openSections.difficulty ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="easy" />
              <Label htmlFor="easy" className="text-sm">
                Easy (45)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="medium" />
              <Label htmlFor="medium" className="text-sm">
                Medium (78)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="hard" />
              <Label htmlFor="hard" className="text-sm">
                Hard (27)
              </Label>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Category Filter */}
        <Collapsible open={openSections.category} onOpenChange={() => toggleSection("category")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="font-medium">Category</span>
              {openSections.category ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="arrays" />
              <Label htmlFor="arrays" className="text-sm">
                Arrays & Strings (32)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="linkedlists" />
              <Label htmlFor="linkedlists" className="text-sm">
                Linked Lists (18)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="trees" />
              <Label htmlFor="trees" className="text-sm">
                Trees & Graphs (25)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="dp" />
              <Label htmlFor="dp" className="text-sm">
                Dynamic Programming (22)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="sorting" />
              <Label htmlFor="sorting" className="text-sm">
                Sorting & Searching (15)
              </Label>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Status Filter */}
        <Collapsible open={openSections.status} onOpenChange={() => toggleSection("status")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="font-medium">Status</span>
              {openSections.status ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="not-started" />
              <Label htmlFor="not-started" className="text-sm">
                Not Started (119)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="in-progress" />
              <Label htmlFor="in-progress" className="text-sm">
                In Progress (8)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="completed" />
              <Label htmlFor="completed" className="text-sm">
                Completed (23)
              </Label>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Concepts Filter */}
        <Collapsible open={openSections.concepts} onOpenChange={() => toggleSection("concepts")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="font-medium">Key Concepts</span>
              {openSections.concepts ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="two-pointers" />
              <Label htmlFor="two-pointers" className="text-sm">
                Two Pointers (12)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="sliding-window" />
              <Label htmlFor="sliding-window" className="text-sm">
                Sliding Window (8)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="hash-table" />
              <Label htmlFor="hash-table" className="text-sm">
                Hash Table (15)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="recursion" />
              <Label htmlFor="recursion" className="text-sm">
                Recursion (20)
              </Label>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        <Button variant="outline" size="sm" className="w-full">
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  )
}
