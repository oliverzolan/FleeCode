"use client"

import { useState } from "react"
import { BookOpen, Code, Lightbulb, TestTube } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ConceptExplanation } from "@/components/fleecode/concept-explanation"
import { CodeEditor } from "@/components/fleecode/code-editor"
import { TestCases } from "@/components/fleecode/test-cases"
import { StepByStepGuide } from "@/components/fleecode/step-by-step-guide"

interface ProblemContentProps {
  problem: {
    id: number
    title: string
    description: string
    examples: Array<{
      input: string
      output: string
      explanation: string
    }>
    constraints: string[]
    concepts: string[]
  }
}

export function ProblemContent({ problem }: ProblemContentProps) {
  const [activeTab, setActiveTab] = useState("learn")
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <div className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="learn" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Learn
          </TabsTrigger>
          <TabsTrigger value="approach" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Approach
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Code
          </TabsTrigger>
          <TabsTrigger value="test" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            Test
          </TabsTrigger>
        </TabsList>

        <TabsContent value="learn" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Problem Statement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{problem.description}</p>

              <div className="space-y-4">
                <h3 className="font-semibold">Examples</h3>
                {problem.examples.map((example, index) => (
                  <div key={index} className="rounded-lg bg-muted p-4">
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">Input:</span>{" "}
                        <code className="ml-2 text-sm bg-background px-2 py-1 rounded">{example.input}</code>
                      </div>
                      <div>
                        <span className="font-medium">Output:</span>{" "}
                        <code className="ml-2 text-sm bg-background px-2 py-1 rounded">{example.output}</code>
                      </div>
                      <div>
                        <span className="font-medium">Explanation:</span>{" "}
                        <span className="ml-2 text-sm text-muted-foreground">{example.explanation}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Constraints</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <ConceptExplanation concepts={problem.concepts} />

          <div className="flex justify-end">
            <Button onClick={() => setActiveTab("approach")}>Next: Learn the Approach</Button>
          </div>
        </TabsContent>

        <TabsContent value="approach" className="space-y-6">
          <StepByStepGuide
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            onComplete={() => setActiveTab("code")}
          />
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <CodeEditor problemId={problem.id} />
        </TabsContent>

        <TabsContent value="test" className="space-y-6">
          <TestCases examples={problem.examples} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
