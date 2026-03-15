import { BadRequestException, Injectable } from '@nestjs/common';
import { OpenrouterService } from 'src/openrouter/openrouter.service';
import { PrismaService } from '../prisma/prisma.service';
import { AnalyzeSymptomDto } from './dto/analyze-symptom.dto';
import { checkEmergencyRules } from './ai-symptom-rule-engine';
import { ServicesService } from 'src/services/services.service';
import { SymptomAnalysisSchema } from './symptom-checker.types';
import { extractJsonFromText } from 'src/Utils/llm-json.util';
@Injectable()
export class AiSymptomService {
  constructor(
    private readonly openrouterService: OpenrouterService,
    private readonly serviceServices: ServicesService,
    private readonly prisma: PrismaService,
  ) {}
  async analyzeSymptom(data: AnalyzeSymptomDto): Promise<any> {
    const services = await this.serviceServices.findAll();

    const emergencyOverride = checkEmergencyRules(data.symptomText);

    const serviceNames = services.map((s) => `${s.id}:${s.name}`).join('|');

    const prompt = `
    You are a healthcare triage assistant for a doctor booking platform.
Your job is to analyze symptom information and return a structured JSON response.
Return JSON only.
No diagnosis.
Choose category IDs only from provided list.
Urgency must be one of: low, medium, high, emergency.
Keep summary under 20 words.
Max 3 redFlags.
Format:
{"summary":"string","urgency":"low|medium|high|emergency","recommendedCategoryIds":["string"],"redFlags":["string"]}
`.trim();

    const userPrompt = `symptoms:${data.symptomText};age:${data.age ?? ''};gender:${data.gender};duration:${data.duration};categories:${serviceNames}`;

    const rawResponse =
      await this.openrouterService.generateStructureMedicalResponse(
        prompt,
        userPrompt,
      );
    let parsed: any;

    try {
      const jsonText = extractJsonFromText(rawResponse);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      parsed = JSON.parse(jsonText);
    } catch (error) {
      console.error('Failed to parse LLM JSON:', error);
      throw new BadRequestException('AI returned an invalid response format');
    }

    const validated = SymptomAnalysisSchema.safeParse(parsed);
    if (!validated.success) {
      console.error('LLM schema validation failed:', validated.error.flatten());
      throw new BadRequestException('AI response failed validation');
    }
    const llmResult = validated.data;

    const matchedCategories = services.filter((c) =>
      llmResult.recommendedCategoryIds.includes(c.id.toString()),
    );

    return {
      success: true,
      message: 'Symptom analysis completed',
      data: {
        summary: llmResult.summary,
        urgency: emergencyOverride ? 'emergency' : llmResult.urgency,
        recommendedCategories: matchedCategories,
        redFlags: emergencyOverride
          ? ['Emergency symptoms detected']
          : llmResult.redFlags,
        disclaimer:
          'This is not a diagnosis. Seek urgent care for severe or worsening symptoms.',
        emergencyOverrideTriggered: emergencyOverride,
      },
    };
  }
}
