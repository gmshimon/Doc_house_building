// symptom-checker.types.ts
import { z } from 'zod';

export const SymptomAnalysisSchema = z.object({
  summary: z.string(),
  urgency: z.enum(['low', 'medium', 'high', 'emergency']),
  possibleConditions: z.array(z.string()),
  recommendedCategories: z.array(z.string()),
  advice: z.array(z.string()),
  redFlags: z.array(z.string()),
  disclaimer: z.string(),
});

export type SymptomAnalysisResult = z.infer<typeof SymptomAnalysisSchema>;

export interface FinalSymptomCheckerResponse {
  summary: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  possibleConditions: string[];
  recommendedCategories: Array<{
    id: string;
    name: string;
    slug?: string | null;
  }>;
  advice: string[];
  redFlags: string[];
  disclaimer: string;
  emergencyOverrideTriggered: boolean;
}
