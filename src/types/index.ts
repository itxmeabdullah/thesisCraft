export type DocumentMode = 'proposal' | 'srs' | 'sds';

export type CandidacyDepartment =
  | 'BS Computer Science'
  | 'BS Software Engineering'
  | 'BS Data Science & Artificial Intelligence'
  | 'MS Computer Science (Thesis Track)';

export type AcademicDomain = 
  | 'Artificial Intelligence & Machine Learning'
  | 'Cloud & Distributed Systems'
  | 'Cybersecurity & Cryptography'
  | 'Internet of Things & Embedded Edge'
  | 'Healthcare & Biomedical Informatics'
  | 'Full-Stack Web & Enterprise SaaS'
  | 'Data Science & Artificial Intelligence'
  | 'Mobile & Ubiquitous Computing';

export type RubricPreset = 
  | 'hec-obe'
  | 'novelty-research'
  | 'ieee-strict'
  | 'custom-rubric';

export type DegreeLevel = string;

export interface ProjectInputs {
  title: string;
  techStack: string; // comma separated
  department: CandidacyDepartment;
  documentMode: DocumentMode;
  apiKey?: string;
}

export interface ProjectMetadata {
  title: string;
  domain: AcademicDomain | string;
  degreeLevel: DegreeLevel;
  techStack: string[];
  documentMode: DocumentMode;
  rubricPreset: RubricPreset;
  injectSDG?: boolean;
  generateEvaluationMetrics?: boolean;
  includeRiskMatrix?: boolean;
  apiKey?: string;
}

export interface RubricTrackerItem {
  id: string;
  title: string;
  description: string;
  verified: boolean;
  score?: number;
}

export interface RubricScorecard {
  overallScore: number;
  obeAlignment: number;
  ieeeRigor: number;
  measurableMetrics: number;
  riskCompleteness: number;
  feedbackPoints: string[];
  sdgAligned: string[];
}

export interface GeneratedDocument {
  title: string;
  mode: DocumentMode;
  markdown: string;
  wordCount: number;
  sectionsCount: number;
  generatedAt: string;
  isUnlocked: boolean;
  rubricTrackers: RubricTrackerItem[];
  rubricScorecard?: RubricScorecard;
  executiveSummary?: string;
}

export interface SampleProject {
  id: string;
  name: string;
  badge: string;
  title: string;
  domain: AcademicDomain;
  degreeLevel: DegreeLevel;
  techStack: string[];
  documentMode: DocumentMode;
  rubricPreset: RubricPreset;
  description: string;
}
