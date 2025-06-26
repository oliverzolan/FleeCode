import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ConceptExplanationProps {
  concepts: string[]
}

export function ConceptExplanation({ concepts }: ConceptExplanationProps) {
  const conceptData = {
    Arrays: {
      explanation:
        "Arrays are a fundamental data structure that stores elements in contiguous memory locations. Each element can be accessed using its index.",
      syntax: `// JavaScript Array Declaration
let numbers = [1, 2, 3, 4, 5];

// Accessing elements
console.log(numbers[0]); // Output: 1

// Array methods
numbers.push(6);        // Add to end
numbers.pop();          // Remove from end
numbers.length;         // Get array size`,
      keyPoints: [
        "Zero-indexed: First element is at index 0",
        "Fixed size in some languages, dynamic in others",
        "O(1) access time by index",
        "O(n) search time for unsorted arrays",
      ],
    },
    "Hash Tables": {
      explanation:
        "Hash tables (or hash maps) store key-value pairs and provide fast lookup, insertion, and deletion operations using a hash function.",
      syntax: `// JavaScript Map (Hash Table)
let map = new Map();

// Adding key-value pairs
map.set('key1', 'value1');
map.set('key2', 'value2');

// Accessing values
console.log(map.get('key1')); // Output: 'value1'

// Check if key exists
map.has('key1'); // Returns true

// Object as Hash Table
let obj = {};
obj['key'] = 'value';`,
      keyPoints: [
        "Average O(1) time for search, insert, delete",
        "Uses hash function to map keys to indices",
        "May have collisions that need to be handled",
        "Great for counting and frequency problems",
      ],
    },
    "Two Pointers": {
      explanation:
        "Two pointers is a technique where you use two pointers to traverse a data structure, often from different positions or directions.",
      syntax: `// Two Pointers Example
function twoSum(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        let sum = nums[left] + nums[right];
        
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;  // Move left pointer right
        } else {
            right--; // Move right pointer left
        }
    }
}`,
      keyPoints: [
        "Reduces time complexity from O(n²) to O(n)",
        "Common patterns: opposite ends, same direction",
        "Useful for sorted arrays and linked lists",
        "Can eliminate need for extra space",
      ],
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Concepts You Need to Know</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={concepts[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {concepts.map((concept) => (
              <TabsTrigger key={concept} value={concept}>
                {concept}
              </TabsTrigger>
            ))}
          </TabsList>

          {concepts.map((concept) => (
            <TabsContent key={concept} value={concept} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">What is {concept}?</h3>
                  <p className="text-muted-foreground">
                    {conceptData[concept as keyof typeof conceptData]?.explanation}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Syntax & Examples</h3>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{conceptData[concept as keyof typeof conceptData]?.syntax}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Key Points</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {conceptData[concept as keyof typeof conceptData]?.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
