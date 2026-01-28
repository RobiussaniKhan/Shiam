
export type CategoryId = 'islamic' | 'romantic' | 'sad' | 'attitude' | 'friendship' | 'motivational';

export type Tone = 'short' | 'long' | 'emotional' | 'deep' | 'poetic' | 'modern';

export type Language = 'english' | 'bangla' | 'banglish';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  seoTitle: string;
  seoDescription: string;
  promptGuidance: string;
}

export interface GeneratedCaption {
  id: string;
  text: string;
  category: CategoryId;
  timestamp: number;
}

export interface GeneratorOptions {
  category: CategoryId;
  tone: Tone;
  language: Language;
  context?: string;
}
