import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

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

// Get Blind 75 problems
router.get('/blind75', async (req, res) => {
    try {
      const blind75Path = path.resolve(__dirname, '../../prisma/blind75.json');
      console.log('Blind 75 path:', blind75Path);
      const blind75Data = JSON.parse(fs.readFileSync(blind75Path, 'utf8'));
  
      const allProblems = await prisma.problem.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          difficulty: true,
          description: true,
          learningContent: true,
          createdAt: true,
          updatedAt: true,
        }
      });
  
      const problemMap = new Map(allProblems.map(problem => [problem.slug, problem]));
  
      const blind75Problems = blind75Data
        .map((blind75Item: any) => {
          const problem = problemMap.get(blind75Item.slug);
          if (problem) {
            return {
              ...problem,
              category: blind75Item.category,
              blind75Difficulty: blind75Item.difficulty,
              isSolved: false // placeholder, integrate with user progress!!
            };
          }
          return null;
        })
        .filter(Boolean);
  
      res.json(blind75Problems);
    } catch (error) {
      console.error('Error fetching Blind 75 problems:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

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