import { ProjectMetadata } from '../types';

export function buildAcademicSystemPrompt(metadata: ProjectMetadata): string {
  const modeLabels = {
    proposal: 'CAPSTONE PROJECT PROPOSAL BLUEPRINT',
    srs: 'SOFTWARE REQUIREMENTS SPECIFICATION (IEEE-830 / ISO/IEC/IEEE 29148 STANDARD)',
    sds: 'SYSTEM DESIGN & ARCHITECTURE SPECIFICATION (IEEE-1016 / ISO/IEC/IEEE 42010 STANDARD)',
  };

  const rubricInstructions = {
    'hec-obe': 'Comply strictly with the National / HEC Outcome-Based Education (OBE) and Washington Accord Framework. Explicitly map deliverables to Program Learning Outcomes (PLO-1 Engineering Knowledge, PLO-2 Problem Analysis, PLO-3 Design/Development of Solutions, PLO-7 Environment and Sustainability, PLO-8 Ethics, PLO-11 Project Management).',
    'novelty-research': 'Focus heavily on State-of-the-Art (SOTA) research gaps, algorithmic novelty, mathematical or pipeline baselines, comparative benchmarks against top IEEE/ACM conference papers, and rigorous statistical hypothesis validation.',
    'ieee-strict': 'Strict adherence to IEEE-830 (SRS) or IEEE-1016 (SDS) structural numbering and RFC 2119 requirement keyword semantics (SHALL, SHALL NOT, SHOULD, MUST, MAY). Uncompromising requirement traceability.',
    'custom-rubric': 'Balanced hybrid university capstone rubric combining production software engineering rigor with academic research defensibility.',
  };

  return `You are "ThesisCraft OS", an elite Academic Document Architect and Professor of Software Engineering / Computer Science.
Your mission is to generate a comprehensive, flawless, production-ready, rubric-compliant ${modeLabels[metadata.documentMode]} for a university capstone or graduate thesis defense.

=== PROJECT METADATA ===
- Project Title: "${metadata.title}"
- Academic Domain: ${metadata.domain}
- Degree Program: ${metadata.degreeLevel}
- Technology Stack: ${metadata.techStack.join(', ')}
- Document Mode: ${metadata.documentMode.toUpperCase()}
- Rubric Preset: ${metadata.rubricPreset} (${rubricInstructions[metadata.rubricPreset]})
- UN Sustainable Development Goals (SDG) Injection: ${metadata.injectSDG ? 'ACTIVE (Include explicit SDG mapping)' : 'INACTIVE'}
- Measurable Metrics Benchmark: ${metadata.generateEvaluationMetrics ? 'ACTIVE (Target quantitative SLAs, F1, latency p99)' : 'INACTIVE'}
- Risk Prioritization Matrix: ${metadata.includeRiskMatrix ? 'ACTIVE (Include Likelihood x Impact matrix)' : 'INACTIVE'}

=== CORE ENGINEERING PRINCIPLES TO ENFORCE ===
1. NO AI FLUFF OR GENERIC PLATITUDES: Do not write vague sentences like "The system will be user-friendly and efficient". Every claim must be concrete, technical, and grounded in the selected tech stack (${metadata.techStack.join(', ')}).
2. PROBLEM HORIZON: Include a deeply specific technical problem context, identify 3 concrete baseline systems (commercial or academic) and state explicit quantitative gaps (e.g. inference latency, cold-start latency, memory overhead, false-positive rate).
3. ARCHITECTURAL BLUEPRINTS & SYSTEM BOUNDARIES:
   - Provide explicit In-Scope vs Out-of-Scope boundaries.
   - For SRS: Detail IEEE-format Use Cases with numbered steps, actors, preconditions, postconditions, and exception flows.
   - For SDS: Detail component decomposition, ASCII/Unicode topological data-flow, complete production SQL DDL tables with primary/foreign keys and indexes, and REST/gRPC API contracts with JSON schemas.
4. ENGINEERING & SOCIETAL CONSTRAINTS:
   - Professional, ethical, and societal considerations (ACM/IEEE Code of Ethics, data privacy, accessibility).
   - Targeted UN Sustainable Development Goals (SDGs e.g. Goal 3, 9, 11) with concrete technical mechanisms explaining how the software furthers each goal.
   - Formal Risk Prioritization Table (Risk ID, Risk Description, Likelihood 1-5, Impact 1-5, Risk Exposure Score, Mitigation Strategy, Contingency Plan).

FORMAT: Deliver rich, beautifully organized Markdown with clear hierarchical headings (#, ##, ###), markdown tables, code blocks for SQL/APIs, and bold lead-in tags.`;
}

export function buildAcademicUserPrompt(metadata: ProjectMetadata): string {
  if (metadata.documentMode === 'proposal') {
    return `Generate the complete, formal Academic Project Proposal Blueprint for:
"${metadata.title}"
Tech Stack: ${metadata.techStack.join(', ')}
Domain: ${metadata.domain}
Degree: ${metadata.degreeLevel}

Ensure the document includes:
1.0 Executive Summary & Project Horizon
2.0 Literature & Baseline Systems Comparison (Include a Markdown Table comparing at least 3 existing systems vs Proposed System on Latency, Accuracy, Throughput, Resource Overhead, and Open-Source Availability)
3.0 Research Questions & Measurable Objectives (Include quantitative KPIs: e.g. p99 latency < 50ms, F1 > 0.94)
4.0 Proposed Technical Methodology & System Boundary (In-Scope vs Out-of-Scope)
5.0 High-Level Architectural Flow (ASCII Architecture diagram & component descriptions)
6.0 Feasibility Assessment (Technical, Operational, Economic, Legal/Ethical)
7.0 Work Breakdown Structure (WBS) & 32-Week Milestone Roadmap (Sprint schedule)
8.0 Formal Risk Prioritization Matrix (Markdown table with Likelihood, Impact, Mitigation, Contingency)
9.0 Professional, Societal & UN Sustainable Development Goals (SDG) Alignment
10.0 Evaluation & Defense Criteria against ${metadata.rubricPreset}`;
  }

  if (metadata.documentMode === 'srs') {
    return `Generate the complete, production-ready Software Requirements Specification (SRS) complying with IEEE-830 / ISO/IEC/IEEE 29148 for:
"${metadata.title}"
Tech Stack: ${metadata.techStack.join(', ')}
Domain: ${metadata.domain}
Degree: ${metadata.degreeLevel}

Ensure the document includes:
1.0 Introduction (Purpose, Scope, RFC 2119 Keyword Definitions [SHALL, SHOULD, MUST], References)
2.0 Overall Description (Product Perspective, User Classes, Operating Environment, Design Constraints, Assumptions)
3.0 Detailed Functional Requirements (Categorized modules with formal IDs: FR-01, FR-02... each with Inputs, Processing, Outputs, Priority, and Acceptance Criteria using RFC 2119 keywords)
4.0 Formal IEEE Use Cases (At least 3 comprehensive tabular use cases: Use Case ID, Actors, Preconditions, Trigger, Main Success Scenario with numbered steps, Alternative & Exception Flows)
5.0 External Interface Requirements (User Interfaces, Hardware/Sensor Interfaces, Software Interfaces, Network Protocols)
6.0 Non-Functional Requirements (Performance & Latency SLAs, Security & Cryptography / OWASP, Availability 99.9%, Reliability & MTBF, Maintainability)
7.0 Risk Analysis & Safety Constraints
8.0 Ethical, Regulatory & UN Sustainable Development Goals (SDG) Alignment
9.0 Requirements Traceability Matrix`;
  }

  // SDS
  return `Generate the complete, production-grade Software Design Specification (SDS) / System Architecture Document complying with IEEE-1016 for:
"${metadata.title}"
Tech Stack: ${metadata.techStack.join(', ')}
Domain: ${metadata.domain}
Degree: ${metadata.degreeLevel}

Ensure the document includes:
1.0 System Architecture Overview & Architectural Patterns (Microservices, Event-Driven, Clean Architecture)
2.0 High-Level Architectural Topology (ASCII diagram showing Client, API Gateway, Service Mesh, Storage, Caching, and Message Broker)
3.0 Data Flow & Process Decomposition (DFD Level 0 & Level 1 flow specifications)
4.0 Comprehensive Database Architecture & Production SQL DDL:
   - Provide complete, executable PostgreSQL DDL statements with CREATE TABLE, PRIMARY KEYs (UUIDv4), FOREIGN KEYs with ON DELETE CASCADE, CHECK constraints, and CREATE INDEX statements.
   - Data Dictionary table describing column types and constraints.
5.0 API Contract Specifications (REST / gRPC endpoints with HTTP Method, Path, Request Headers, Request Body Schema, and 200/400/500 JSON Response schemas)
6.0 Security & Zero-Trust Architecture (Authentication flow, JWT/OAuth2, RBAC matrix, STRIDE Threat Modeling table)
7.0 Deployment, Containerization & Infrastructure Topology (Docker Compose / Kubernetes architecture, CI/CD pipeline, Prometheus/Grafana monitoring)
8.0 Risk Mitigation, Failover & Disaster Recovery Matrix
9.0 UN SDG Alignment & Engineering Ethics`;
}
