import { WizardFormData, IEEEDocumentObject } from '../types';

export function buildIEEEStructuredPrompt(data: WizardFormData): { systemInstruction: string; userPrompt: string } {
  const systemInstruction = `You are ThesisCraft OS, an elite Academic Document Architect and Professor of Software Engineering.
Your task is to generate a comprehensive, flawless, university-defense-grade IEEE-compliant document object in JSON format conforming strictly to IEEE-830 (SRS) or IEEE-1016 (SDS) or Capstone Proposal guidelines.

IMPORTANT: Return ONLY valid raw JSON with NO markdown code block ticks, NO commentary.
The JSON must adhere strictly to this schema:
{
  "documentTitle": string,
  "subtitle": string,
  "documentMode": "SRS" | "SDS" | "PROPOSAL",
  "academicStandard": string,
  "degreeProgram": string,
  "authors": string[],
  "supervisor": string,
  "abstract": string,
  "keywords": string[],
  "page1": {
    "sectionI_Introduction": {
      "title": string,
      "purpose": string,
      "problemHorizon": string,
      "scope": string
    },
    "sectionII_BaselineComparison": {
      "title": string,
      "summary": string,
      "comparisonTable": [
        { "metric": string, "commercialBaseline": string, "sotaOpenSource": string, "proposedSystem": string }
      ]
    },
    "sectionIII_SystemRequirements": {
      "title": string,
      "functionalRequirements": [
        { "id": string, "name": string, "description": string, "priority": "High" | "Medium" | "Low", "rfc2119": "SHALL" | "SHOULD" | "MUST" }
      ],
      "systemBoundaries": {
        "inScope": string[],
        "outOfScope": string[]
      }
    }
  },
  "page2": {
    "sectionIV_ArchitectureAndDataFlow": {
      "title": string,
      "architecturePattern": string,
      "componentTopology": string,
      "databaseSchemaDDL": string
    },
    "sectionV_RiskMitigationMatrix": {
      "title": string,
      "risks": [
        { "riskId": string, "description": string, "likelihood": number, "impact": number, "mitigation": string }
      ]
    },
    "sectionVI_EthicalAndSDGAlignment": {
      "title": string,
      "sdgGoals": string[],
      "societalImpact": string
    },
    "sectionVII_ConclusionAndTimeline": {
      "title": string,
      "deliverables": string[],
      "defenseReadiness": string
    },
    "references": string[]
  },
  "rubricScorecard": {
    "overallScore": number,
    "obeScore": number,
    "ieeeSyntaxScore": number,
    "baselineRigorScore": number
  }
}`;

  const userPrompt = `Generate the complete IEEE-compliant JSON document object for:
Project Title: "${data.title}"
Core Problem: "${data.problemStatement}"
Domain: ${data.domain}
Tech Stack: ${data.coreLanguagesAndFrameworks}
Database & Deployment: ${data.databaseArchitecture} / ${data.targetDeployment}
Document Mode: ${data.documentMode}
Academic Standard: ${data.universityStandard}
Degree Program: ${data.degreeProgram}
Authors: ${data.authors}
Supervisor: ${data.supervisor}

Ensure all technical descriptions, SOTA baseline tables, RFC 2119 keywords, DDL SQL schemas, and Risk matrices are deeply detailed and relevant to this specific project.`;

  return { systemInstruction, userPrompt };
}

export function createDefaultIEEEDocumentObject(data: WizardFormData): IEEEDocumentObject {
  const title = data.title || 'Autonomous Edge-AI Real-Time Anomaly Detection Platform';
  const tech = data.coreLanguagesAndFrameworks || 'Python, PyTorch, FastAPI, PostgreSQL, Docker';
  const authorList = data.authors ? data.authors.split(',').map(a => a.trim()) : ['Senior Engineering Cohort', 'Lead Researcher'];
  const supervisor = data.supervisor || 'Dr. H. Vance (Head of Department)';

  return {
    documentTitle: title,
    subtitle: `Formal ${data.documentMode} Specification & Outcome-Based Defense Architecture`,
    documentMode: data.documentMode,
    academicStandard: data.universityStandard || 'HEC National Standard / IEEE-830 OBE',
    degreeProgram: data.degreeProgram || 'BS Computer Science',
    authors: authorList,
    supervisor: supervisor,
    abstract: `This specification formulates the architectural, behavioral, and verification requirements for "${title}". Developed using ${tech}, the system targets deterministic sub-40ms latency and high-availability throughput while overcoming traditional algorithmic bottlenecks and resource exhaustion. The blueprint adheres to the ${data.universityStandard} curriculum, enforcing RFC 2119 syntax, SOTA comparative baselines, 3NF PostgreSQL persistence, and formal risk mitigation matrices.`,
    keywords: [
      'IEEE-830 Standard',
      'Outcome-Based Education (OBE)',
      data.domain || 'Edge AI',
      'Software Requirements Specification',
      'Fault-Tolerant Architecture',
      'PostgreSQL Relational Schema'
    ],
    page1: {
      sectionI_Introduction: {
        title: 'Introduction & Problem Horizon',
        purpose: `This formal ${data.documentMode} specification establishes the evaluation baseline for ${title}. It serves as the primary technical contract for the university FYP defense committee and engineering team.`,
        problemHorizon: data.problemStatement || 'Contemporary production systems in this domain suffer from architectural fragmentation, high resource overhead, and unpredictable latency spikes during burst telemetry influx.',
        scope: `The system coordinates high-throughput ingestion pipelines, distributed processing workers, and localized caches over ${data.databaseArchitecture || 'PostgreSQL 16'}.`
      },
      sectionII_BaselineComparison: {
        title: 'State-of-the-Art (SOTA) Baseline System Comparison',
        summary: 'To validate academic novelty and engineering rigor, the proposed platform is benchmarked against current leading commercial and open-source references.',
        comparisonTable: [
          {
            metric: 'P99 Tail Latency',
            commercialBaseline: '340 ms',
            sotaOpenSource: '165 ms',
            proposedSystem: '< 38 ms (Deterministic)'
          },
          {
            metric: 'Peak Memory Footprint',
            commercialBaseline: '4.2 GB / node',
            sotaOpenSource: '2.1 GB / node',
            proposedSystem: '< 640 MB (Zero-Copy)'
          },
          {
            metric: 'Throughput (Operations/sec)',
            commercialBaseline: '2,400 req/s',
            sotaOpenSource: '5,800 req/s',
            proposedSystem: '> 18,500 req/s'
          },
          {
            metric: 'Failover Recovery (MTTR)',
            commercialBaseline: '18.4 seconds',
            sotaOpenSource: '6.2 seconds',
            proposedSystem: '< 850 milliseconds'
          }
        ]
      },
      sectionIII_SystemRequirements: {
        title: 'Functional Requirements (RFC 2119 Standard)',
        functionalRequirements: [
          {
            id: 'FR-01',
            name: 'Ingestion Protocol Validation',
            priority: 'High',
            rfc2119: 'SHALL',
            description: 'accept and parse incoming telemetry streams over TLS 1.3 encrypted HTTPS and WebSockets within 4.5 milliseconds.'
          },
          {
            id: 'FR-02',
            name: 'Cryptographic Checksum Stamping',
            priority: 'High',
            rfc2119: 'MUST',
            description: 'stamp every completed analytical payload with microsecond UTC timestamps and immutable SHA-256 integrity hashes.'
          },
          {
            id: 'FR-03',
            name: 'Backpressure Queue Buffering',
            priority: 'Medium',
            rfc2119: 'SHOULD',
            description: 'buffer surge payloads into Redis distributed queues when ingestion volume exceeds 12,000 operations per second.'
          },
          {
            id: 'FR-04',
            name: 'Transactional State Isolation',
            priority: 'High',
            rfc2119: 'SHALL',
            description: 'execute all entity mutations within isolated ACID database transactions enforcing READ COMMITTED guarantees.'
          }
        ],
        systemBoundaries: {
          inScope: [
            'Asynchronous pipeline dispatching microservice',
            'Normalized 3NF relational schema and composite indexing',
            'Real-time WebSocket telemetry dashboard'
          ],
          outOfScope: [
            'Direct hardware sensor firmware manufacturing',
            'Third-party commercial payment gateway settlement'
          ]
        }
      }
    },
    page2: {
      sectionIV_ArchitectureAndDataFlow: {
        title: 'System Architecture & Database DDL',
        architecturePattern: 'Hexagonal (Ports & Adapters) with Event-Driven Ingress',
        componentTopology: 'Clients (Web/Mobile) -> NGINX Reverse Proxy -> API Gateway -> Ingestion Bus -> Asynchronous Compute Worker Pool -> PostgreSQL 16 Cluster + Redis Hot Cache',
        databaseSchemaDDL: `CREATE TABLE system_projects (
    project_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    domain VARCHAR(100) NOT NULL,
    degree_track VARCHAR(64) NOT NULL,
    compliance_score NUMERIC(5,2) DEFAULT 98.00,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE document_artifacts (
    artifact_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES system_projects(project_id) ON DELETE CASCADE,
    sha256_hash VARCHAR(64) NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_projects_domain ON system_projects(domain);`
      },
      sectionV_RiskMitigationMatrix: {
        title: 'Formal Risk Prioritization Matrix (Likelihood x Impact)',
        risks: [
          {
            riskId: 'RSK-01',
            description: 'Sudden Ingestion Telemetry Spikes causing memory exhaustion',
            likelihood: 3,
            impact: 4,
            mitigation: 'Dynamic cgroups memory ceilings and backpressure streaming iterators.'
          },
          {
            riskId: 'RSK-02',
            description: 'Schema Migration Conflicts across multi-tenant replicas',
            likelihood: 2,
            impact: 5,
            mitigation: 'Automated blue/green Flyway database migrations with atomic rollback snapshots.'
          },
          {
            riskId: 'RSK-03',
            description: 'Upstream Node Timeout & Network Partition Drops',
            likelihood: 3,
            impact: 3,
            mitigation: 'Circuit breaker pattern with exponential jitter retry backoff.'
          }
        ]
      },
      sectionVI_EthicalAndSDGAlignment: {
        title: 'Professional Ethics & UN SDG Alignment',
        sdgGoals: [
          'UN SDG 9: Industry, Innovation, and Infrastructure',
          'UN SDG 11: Sustainable Cities and Communities',
          'UN SDG 12: Responsible Consumption and Energy Efficiency'
        ],
        societalImpact: 'Minimizes redundant server compute wattage by 28% through zero-copy data pipelines and enforces IEEE/ACM codes of professional integrity.'
      },
      sectionVII_ConclusionAndTimeline: {
        title: 'Defense Readiness Assessment & Timeline',
        deliverables: [
          'Phase 1: SOTA Baselines & IEEE-830 Specification (Completed)',
          'Phase 2: Core Microservices & Database Deployment (Sprint 4)',
          'Phase 3: Formal Verification, Chaos Testing & Capstone Defense (Sprint 8)'
        ],
        defenseReadiness: 'Certified 98.4% Defense-Ready under HEC OBE Washington Accord PLO-1, PLO-2, and PLO-3.'
      },
      references: [
        'IEEE Recommended Practice for Software Requirements Specifications, IEEE Standard 830-1998.',
        'ISO/IEC/IEEE Systems and software engineering — Requirements engineering, ISO/IEC/IEEE 29148:2018.',
        'National Curriculum Revision Committee, HEC Pakistan: Computing Curricula and OBE Implementation Guide, 2024.',
        'IEEE Standard for Information Technology — Systems Design — Software Design Descriptions, IEEE Std 1016-2009.'
      ]
    },
    rubricScorecard: {
      overallScore: 98.4,
      obeScore: 99.0,
      ieeeSyntaxScore: 98.2,
      baselineRigorScore: 97.5
    },
    isUnlocked: false
  };
}

export function convertIEEEDocumentToMarkdown(doc: IEEEDocumentObject): string {
  return `# ${doc.documentTitle}
## ${doc.subtitle}
**Standard:** ${doc.academicStandard} | **Mode:** ${doc.documentMode}  
**Degree Program:** ${doc.degreeProgram}  
**Authors:** ${doc.authors.join(', ')}  
**Supervisor:** ${doc.supervisor}  

---

### Abstract
${doc.abstract}

**Keywords:** ${doc.keywords.join(', ')}

---

## I. ${doc.page1.sectionI_Introduction.title}
${doc.page1.sectionI_Introduction.problemHorizon}

**Purpose & Scope:**  
${doc.page1.sectionI_Introduction.purpose}

---

## II. ${doc.page1.sectionII_BaselineComparison.title}
${doc.page1.sectionII_BaselineComparison.summary}

| Evaluation Metric | Commercial Baseline | SOTA Open-Source | Proposed System |
| :--- | :--- | :--- | :--- |
${doc.page1.sectionII_BaselineComparison.comparisonTable.map(r => `| **${r.metric}** | ${r.commercialBaseline} | ${r.sotaOpenSource} | **${r.proposedSystem}** |`).join('\n')}

---

## III. ${doc.page1.sectionIII_SystemRequirements.title}
${doc.page1.sectionIII_SystemRequirements.functionalRequirements.map(f => `- **[${f.id}] ${f.name}** (${f.priority}): The system **${f.rfc2119}** ${f.description}`).join('\n')}

### System Boundaries
- **In-Scope:** ${doc.page1.sectionIII_SystemRequirements.systemBoundaries.inScope.join(', ')}
- **Out-of-Scope:** ${doc.page1.sectionIII_SystemRequirements.systemBoundaries.outOfScope.join(', ')}

---

## IV. ${doc.page2.sectionIV_ArchitectureAndDataFlow.title}
- **Architectural Pattern:** ${doc.page2.sectionIV_ArchitectureAndDataFlow.architecturePattern}
- **Component Topology:** ${doc.page2.sectionIV_ArchitectureAndDataFlow.componentTopology}

\`\`\`sql
${doc.page2.sectionIV_ArchitectureAndDataFlow.databaseSchemaDDL}
\`\`\`

---

## V. ${doc.page2.sectionV_RiskMitigationMatrix.title}
| Risk ID | Description | Likelihood (1-5) | Impact (1-5) | Mitigation Strategy |
| :--- | :--- | :--- | :--- | :--- |
${doc.page2.sectionV_RiskMitigationMatrix.risks.map(r => `| **${r.riskId}** | ${r.description} | ${r.likelihood} | ${r.impact} | ${r.mitigation} |`).join('\n')}

---

## VI. ${doc.page2.sectionVI_EthicalAndSDGAlignment.title}
- **Target UN SDGs:** ${doc.page2.sectionVI_EthicalAndSDGAlignment.sdgGoals.join('; ')}
- **Societal & Sustainability Impact:** ${doc.page2.sectionVI_EthicalAndSDGAlignment.societalImpact}

---

## VII. ${doc.page2.sectionVII_ConclusionAndTimeline.title}
**Readiness Assessment:** ${doc.page2.sectionVII_ConclusionAndTimeline.defenseReadiness}

**Key Deliverables:**  
${doc.page2.sectionVII_ConclusionAndTimeline.deliverables.map(d => `- ${d}`).join('\n')}

---

## References
${doc.page2.references.map((ref, idx) => `[${idx + 1}] ${ref}`).join('\n\n')}
`;
}
