"use client"
import { CheckCircle, Circle, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface StepByStepGuideProps {
  currentStep: number
  onStepChange: (step: number) => void
  onComplete: () => void
}

export function StepByStepGuide({ currentStep, onStepChange, onComplete }: StepByStepGuideProps) {
  const steps = [
    {
      title: "Understand the Problem",
      content: "We need to find two numbers in an array that add up to a target value and return their indices.",
      questions: [
        "What are we looking for? → Two indices whose values sum to target",
        "What should we return? → The indices (positions) of these numbers",
        "Any constraints? → Each input has exactly one solution",
      ],
    },
    {
      title: "Think About Approaches",
      content: "Let's consider different ways to solve this problem:",
      questions: [
        "Brute Force: Check every pair of numbers → O(n²) time",
        "Hash Table: Store numbers we've seen → O(n) time, O(n) space",
        "Two Pointers: Only works if array is sorted → O(n) time",
      ],
    },
    {
      title: "Choose the Best Approach",
      content: "For this problem, the hash table approach is optimal because:",
      questions: [
        "We can solve it in one pass through the array",
        "For each number, we check if its complement exists",
        "Complement = target - current number",
        "If complement exists, we found our answer!",
      ],
    },
    {
      title: "Plan the Algorithm",
      content: "Here's our step-by-step plan:",
      questions: [
        "1. Create an empty hash table (Map or Object)",
        "2. Loop through the array with index and value",
        "3. Calculate complement = target - current value",
        "4. Check if complement exists in hash table",
        "5. If yes: return [complement_index, current_index]",
        "6. If no: store current value and index in hash table",
      ],
    },
    {
      title: "Trace Through Example",
      content: "Let's trace through nums = [2,7,11,15], target = 9:",
      questions: [
        "i=0, num=2: complement=7, not in map → store {2: 0}",
        "i=1, num=7: complement=2, found in map at index 0 → return [0,1]",
        "We found our answer! The indices 0 and 1 give us 2+7=9",
      ],
    },
  ]

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Step-by-Step Problem Solving Guide
            <span className="text-sm font-normal text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
          </CardTitle>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Step Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {steps.map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <button
                    onClick={() => onStepChange(index)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                      index === currentStep
                        ? "bg-primary text-primary-foreground"
                        : index < currentStep
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {index < currentStep ? <CheckCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                    Step {index + 1}
                  </button>
                  {index < steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                </div>
              ))}
            </div>

            {/* Current Step Content */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{steps[currentStep].title}</h3>
              <p className="text-muted-foreground">{steps[currentStep].content}</p>

              <div className="space-y-2">
                {steps[currentStep].questions.map((question, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm">{question}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => onStepChange(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Previous Step
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button onClick={() => onStepChange(currentStep + 1)}>Next Step</Button>
              ) : (
                <Button onClick={onComplete}>Start Coding!</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
