// symptom-rule-engine.ts
export interface EmergencyRuleResult {
  matched: boolean;
  matchedReasons: string[];
  forcedUrgency?: 'emergency';
  forcedAdvice?: string[];
  forcedRedFlags?: string[];
}

export function checkEmergencyRules(symptomText: string): EmergencyRuleResult {
  const text = symptomText.toLowerCase();

  const rules = [
    {
      keywords: ['chest pain', 'shortness of breath'],
      reason: 'Possible cardiac or respiratory emergency',
    },
    {
      keywords: ['difficulty breathing'],
      reason: 'Breathing difficulty may require urgent care',
    },
    {
      keywords: ['seizure'],
      reason: 'Seizure symptoms require urgent evaluation',
    },
    {
      keywords: ['loss of consciousness'],
      reason: 'Loss of consciousness is an emergency warning sign',
    },
    {
      keywords: ['one-sided weakness', 'slurred speech'],
      reason: 'Possible stroke warning signs',
    },
    {
      keywords: ['heavy bleeding'],
      reason: 'Heavy bleeding may require emergency treatment',
    },
    {
      keywords: ['suicidal thoughts'],
      reason: 'Mental health emergency warning sign',
    },
  ];

  const matchedReasons: string[] = [];

  for (const rule of rules) {
    const allFound = rule.keywords.every((k) => text.includes(k));
    const anySingleCritical =
      rule.keywords.length === 1 && text.includes(rule.keywords[0]);

    if (allFound || anySingleCritical) {
      matchedReasons.push(rule.reason);
    }
  }

  if (matchedReasons.length > 0) {
    return {
      matched: true,
      matchedReasons,
      forcedUrgency: 'emergency',
      forcedAdvice: [
        'Seek immediate medical attention.',
        'Go to the nearest emergency department or call local emergency services.',
        'Do not rely only on an online symptom checker for these symptoms.',
      ],
      forcedRedFlags: matchedReasons,
    };
  }

  return {
    matched: false,
    matchedReasons: [],
  };
}
