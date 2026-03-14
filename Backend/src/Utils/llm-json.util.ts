// llm-json.util.ts
export function extractJsonFromText(text: string): string {
  const cleaned = text.trim();

  if (cleaned.startsWith('```')) {
    return cleaned
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();
  }

  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');

  if (firstBrace !== -1 && lastBrace !== -1) {
    return cleaned.slice(firstBrace, lastBrace + 1);
  }

  return cleaned;
}
