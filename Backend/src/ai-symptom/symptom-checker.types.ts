import { z } from 'zod';

export const SymptomAnalysisSchema = z.object({
  summary: z.string(),
  urgency: z.enum(['low', 'medium', 'high', 'emergency']),
  recommendedCategoryIds: z.array(z.string()),
  redFlags: z.array(z.string()),
});
