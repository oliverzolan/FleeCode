"use client"

import { useState } from "react"
import { Play, RotateCcw, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CodeEditorProps {
  problemId: number
}

export function CodeEditor({ problemId }: CodeEditorProps) {
  const [code, setCode] = useState(`function twoSum(nums, target) {
    // Your code here
    
}`)

  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = async () => {
    setIsRunning(true)
    // Simulate code execution
    setTimeout(() => {
      setOutput("Running test cases...\n✅ Test case 1 passed\n✅ Test case 2 passed\n\nAll tests passed!")
      setIsRunning(false)
    }, 2000)
  }

  const handleReset = () => {
    setCode(`function twoSum(nums, target) {
    // Your code here
    
}`)
    setOutput("")
  }

  const starterTemplates = {
    javascript: `function twoSum(nums, target) {
    // Your code here
    
}`,
    python: `def two_sum(nums, target):
    # Your code here
    pass`,
    java: `public int[] twoSum(int[] nums, int target) {
    // Your code here
    
}`,
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Code Editor
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button variant="outline" size="sm">
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button size="sm" onClick={handleRun} disabled={isRunning}>
                <Play className="mr-2 h-4 w-4" />
                {isRunning ? "Running..." : "Run Code"}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="javascript" className="w-full">
            <TabsList>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="java">Java</TabsTrigger>
            </TabsList>

            <TabsContent value="javascript" className="space-y-4">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
                placeholder="Write your solution here..."
              />
            </TabsContent>

            <TabsContent value="python" className="space-y-4">
              <Textarea
                value={starterTemplates.python}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
                placeholder="Write your solution here..."
              />
            </TabsContent>

            <TabsContent value="java" className="space-y-4">
              <Textarea
                value={starterTemplates.java}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
                placeholder="Write your solution here..."
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg text-sm whitespace-pre-wrap">{output}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
