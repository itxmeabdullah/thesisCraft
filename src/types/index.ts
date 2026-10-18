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

export interface IEEEDocumentObject {
  documentTitle: string;
  subtitle: string;
  documentMode: 'SRS' | 'SDS' | 'PROPOSAL';
  academicStandard: string;
  degreeProgram: string;
  authors: string[];
  supervisor: string;
  abstract: string;
  keywords: string[];
  page1: {
    sectionI_Introduction: {
      title: string;
      purpose: string;
      problemHorizon: string;
      scope: string;
    };
    sectionII_BaselineComparison: {
      title: string;
      summary: string;
      comparisonTable: Array<{
        metric: string;
        commercialBaseline: string;
        sotaOpenSource: string;
        proposedSystem: string;
      }>;
    };
    sectionIII_SystemRequirements: {
      title: string;
      functionalRequirements: Array<{
        id: string;
        name: string;
        description: string;
        priority: string;
        rfc2119: 'SHALL' | 'SHOULD' | 'MUST';
      }>;
      systemBoundaries: {
        inScope: string[];
        outOfScope: string[];
      };
    };
  };
  page2: {
    sectionIV_ArchitectureAndDataFlow: {
      title: string;
      architecturePattern: string;
      componentTopology: string;
      mermaidDiagram: string;
      databaseSchemaDDL: string;
    };
    sectionV_RiskMitigationMatrix: {
      title: string;
      risks: Array<{
        riskId: string;
        description: string;
        likelihood: number;
        impact: number;
        mitigation: string;
      }>;
    };
    sectionVI_EthicalAndSDGAlignment: {
      title: string;
      sdgGoals: string[];
      societalImpact: string;
    };
    sectionVII_ConclusionAndTimeline: {
      title: string;
      deliverables: string[];
      defenseReadiness: string;
    };
    references: string[];
  };
  rubricScorecard: {
    overallScore: number;
    obeScore: number;
    ieeeSyntaxScore: number;
    baselineRigorScore: number;
  };
  defenseQuestions?: DefenseQuestion[];
  isUnlocked?: boolean;
}

export interface DefenseQuestion {
  id: string;
  question: string;
  focusArea: 'Architecture & Tech Stack' | 'Baseline Justification' | 'Scalability & Latency' | 'Failure Modes' | 'Novelty Gap';
  defenseStrategy: string;
  modelAnswerGuideline: string;
  difficulty: 'Tough' | 'Probing' | 'Critical';
}

export interface WizardFormData {
  // Step 1: Project Idea & Scope
  title: string;
  problemStatement: string;
  domain: string;
  // Step 2: Tech Stack & Architecture
  coreLanguagesAndFrameworks: string;
  databaseArchitecture: string;
  targetDeployment: string;
  // Step 3: Document Type
  documentMode: 'SRS' | 'SDS' | 'PROPOSAL';
  // Step 4: University Standard & Department
  universityStandard: string;
  degreeProgram: string;
  // Step 5: Academic Constraints & Meta
  authors: string;
  supervisor: string;
  includeSDG: boolean;
  includeSOTABaseline: boolean;
  includeRiskMatrix: boolean;
  includeSQLSchema: boolean;
}

