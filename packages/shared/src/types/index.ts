import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
});

export const ProblemSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  description: z.string(),
  learningContent: z.string(),
  starterCode: z.string(),
});

export const SubmissionSchema = z.object({
  code: z.string(),
  language: z.string(),
  problemId: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type Problem = z.infer<typeof ProblemSchema>;
export type Submission = z.infer<typeof SubmissionSchema>;