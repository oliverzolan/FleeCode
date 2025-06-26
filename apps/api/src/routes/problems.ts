import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Get all problems
router.get('/', async (req, res) => {
  try {
    const problems = await prisma.problem.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        difficulty: true,
        description: true,
        learningContent: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    res.json(problems)
  } catch (error) {
    console.error('Error fetching problems:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get problem by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const problem = await prisma.problem.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        title: true,
        slug: true,
        difficulty: true,
        description: true,
        learningContent: true,
        solution: true,
        createdAt: true,
        updatedAt: true,
        testCases: {
          select: {
            id: true,
            input: true,
            expectedOutput: true,
            isHidden: true,
          }
        }
      }
    })

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' })
    }

    res.json(problem)
  } catch (error) {
    console.error('Error fetching problem:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router 