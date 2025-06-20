import { PrismaClient } from "@prisma/client"
import fs from 'fs'
const prisma = new PrismaClient()

async function main() {
    const data = JSON.parse(fs.readFileSync('apps/api/prisma/problem_list.json', 'utf8'))

    for (const problem of data) {
        await prisma.problem.upsert({
            where: { slug: problem.slug },
            update: {},
            create: {
                slug: problem.slug,
                title: problem.title,
                difficulty: problem.difficulty,
                description: problem.description,
                learningContent: problem.learningContent,
                starterCodeJson: problem.starterCodeJson,
                solution: problem.solution,
            }
        })
    }
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())