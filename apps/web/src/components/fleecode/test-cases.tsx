import { CheckCircle, XCircle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TestCasesProps {
  examples: Array<{
    input: string
    output: string
    explanation: string
  }>
}

export function TestCases({ examples }: TestCasesProps) {
  const testResults = [
    { passed: true, runtime: "68ms", memory: "42.1MB" },
    { passed: true, runtime: "72ms", memory: "41.8MB" },
    { passed: false, runtime: "N/A", memory: "N/A" },
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Test Cases</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {examples.map((example, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Test Case {index + 1}</h3>
                <div className="flex items-center gap-2">
                  {testResults[index]?.passed ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Passed
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      <XCircle className="mr-1 h-3 w-3" />
                      Failed
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Input:</span>
                  <code className="ml-2 bg-muted px-2 py-1 rounded text-xs">{example.input}</code>
                </div>
                <div>
                  <span className="font-medium">Expected Output:</span>
                  <code className="ml-2 bg-muted px-2 py-1 rounded text-xs">{example.output}</code>
                </div>
                {testResults[index]?.passed && (
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Runtime: {testResults[index].runtime}</span>
                    <span>Memory: {testResults[index].memory}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
