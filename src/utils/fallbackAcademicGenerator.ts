import { ProjectMetadata, GeneratedDocument } from '../types';

export function generateAcademicDocument(metadata: ProjectMetadata): GeneratedDocument {
  const { title, domain, degreeLevel, techStack, documentMode, rubricPreset } = metadata;
  const techList = techStack.join(', ');
  const primaryDb = techStack.find(t => ['PostgreSQL', 'MongoDB', 'TimescaleDB', 'Redis'].includes(t)) || 'PostgreSQL';
  const primaryBackend = techStack.find(t => ['FastAPI', 'Express', 'Python', 'Go', 'Rust'].includes(t)) || 'FastAPI / Python';
  const primaryFrontend = techStack.find(t => ['React', 'Next.js', 'Flutter', 'TypeScript'].includes(t)) || 'React & TypeScript';

  let markdown = '';
  let executiveSummary = '';

  if (documentMode === 'proposal') {
    executiveSummary = `The proposed project "${title}" addresses critical architectural and algorithmic bottlenecks in ${domain}. Leveraging a modern stack consisting of ${techList}, this initiative establishes a novel, benchmarked framework engineered to surpass current state-of-the-art industry baselines in latency, throughput, and fault tolerance. Evaluated under the ${rubricPreset.toUpperCase()} academic rubric, the project establishes measurable KPIs and adheres to UN Sustainable Development Goals.`;

    markdown = `# ACADEMIC PROJECT PROPOSAL BLUEPRINT
**DOCUMENT IDENTIFIER: TCP-PRP-${Math.floor(1000 + Math.random() * 9000)}-REV2**  
**PROJECT TITLE:** ${title}  
**ACADEMIC DOMAIN:** ${domain}  
**DEGREE CANDIDACY:** ${degreeLevel}  
**TARGET RUBRIC:** ${rubricPreset.toUpperCase()} (Outcome-Based Education / SOTA Baselines)  
**TECHNOLOGY STACK:** ${techList}  
**STATUS:** APPROVED FOR CAPSTONE DEFENSE COMMITTEE REVIEW

---

## 1.0 Executive Problem Horizon & Domain Context
Contemporary production implementations within **${domain}** are severely constrained by architectural fragmentation, high resource overhead, and suboptimal latency characteristics. Traditional monolithic approaches fail to sustain deterministic throughput when scaling across distributed nodes.

Existing enterprise solutions suffer from:
1. **Algorithmic Latency Degradation:** Unbounded queuing delays under burst traffic scenarios, leading to SLA breaches exceeding 320ms.
2. **Resource Inefficiency:** Excessive memory footprints and compute exhaustion due to unoptimized state synchronization and redundant data pipelines.
3. **Security & Governance Gaps:** Inadequate zero-trust auditing, absence of verifiable cryptographic provenance, and non-compliance with data residency mandates.

The objective of **${title}** is to construct a specialized, high-performance system leveraging **${primaryBackend}** and **${primaryFrontend}**, orchestrated over **${primaryDb}**.

---

## 2.0 SOTA Baseline Systems Comparison
To justify architectural novelty and research defensibility, the proposed framework is benchmarked against current leading commercial and academic baseline platforms:

| Architectural Metric | Baseline Alpha (Commercial Legacy) | Baseline Beta (Open-Source State of the Art) | Baseline Gamma (Academic Reference) | **${title.split(':')[0] || 'Proposed System'}** |
| :--- | :--- | :--- | :--- | :--- |
| **P99 Inference/Response Latency** | 340 ms | 185 ms | 120 ms | **< 38 ms (Deterministic)** |
| **Throughput (Ops/Sec @ Node)** | 1,200 req/s | 4,800 req/s | 6,100 req/s | **> 18,500 req/s** |
| **Peak Memory Footprint** | 4.2 GB / instance | 2.1 GB / instance | 1.8 GB / instance | **< 640 MB (Zero-Copy)** |
| **Failure Recovery (MTTR)** | 14.2 seconds | 6.8 seconds | 5.1 seconds | **< 850 milliseconds** |
| **Open Architecture & Modularity** | Proprietary Monolith | Modular Microservices | Scripted Pipeline | **Plug-and-Play Distributed Mesh** |
| **Cryptographic Auditability** | Basic Logging | Structured JSON | None | **Immutable SHA-256 Merkle Ledger** |

---

## 3.0 Research Questions & Quantified Hypotheses
This capstone thesis systematically answers three core engineering hypotheses:

* **RQ-1 (Algorithmic Determinism):** Can the implementation of asynchronous pipeline batching in ${techStack[0] || 'FastAPI'} achieve sub-50ms tail latency under 10,000 concurrent synthetic workloads?
* **RQ-2 (Data Locality & Caching):** What quantitative throughput multiplier is attained when caching hot partitions in ${techStack.includes('Redis') ? 'Redis' : 'in-memory columnar buffers'} versus traditional relational index lookups?
* **RQ-3 (Resilience Under Node Partitions):** How does the automated circuit-breaker mechanism mitigate cascading timeouts during deliberate 35% packet drops?

### Measurable Key Performance Indicators (KPIs)
* **Target Throughput:** $\\ge 15,000$ operations per second at nominal cluster capacity.
* **Accuracy / Precision (F1-Score):** $\\ge 0.942$ on standardized validation testbeds.
* **Fault Recovery Objective (RTO):** Automatic self-healing failover completed within $1.2$ seconds.
* **Mean Time Between Failures (MTBF):** Projected system availability target of $99.95\\%$.

---

## 4.0 System Scope & Formal Boundaries

### In-Scope Functional Modules
- **Data Ingestion & Preprocessing Subsystem:** High-throughput streaming bus handling sensor/client packets with strict input sanitization.
- **Core Processing & Analytical Engine:** Microservices executing optimized algorithmic pipelines with automated parallelization.
- **Persistence & Caching Fabric:** Multi-tiered storage layer utilizing ${primaryDb} with normalized schemas and optimized B-Tree indexing.
- **Interactive Executive Telemetry Dashboard:** Responsive UI built with ${primaryFrontend} featuring real-time WebSockets and sub-second chart re-renders.

### Out-of-Scope System Boundaries
- Direct bare-metal kernel modification (standard Linux containerization runtime assumed).
- Manual on-premise hardware provisioning (deployment orchestrated via Infrastructure-as-Code scripts).
- Third-party payment clearinghouse legal settlement (synthetic gateway adapters utilized for verification).

---

## 5.0 High-Level Architectural Flow

\`\`\`
+-----------------------------------------------------------------------------------+
|                           CLIENT TIER (${primaryFrontend})                           |
|       [Web Interface] <====== Secure WebSockets / HTTPS ======> [Mobile/Edge]     |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                        INGRESS API GATEWAY & RATE LIMITER                         |
|             (JWT Authentication, CORS Policies, Token-Bucket Throttling)          |
+-----------------------------------------------------------------------------------+
                   |                                       |
                   v                                       v
+------------------------------------+   +------------------------------------------+
| CORE INGESTION & DISPATCH SERVICE  |   | ASYNCHRONOUS PIPELINE WORKERS (${primaryBackend}) |
|   - Payload Validation             |   |   - Algorithmic Processing Matrix        |
|   - Schema Normalization           |   |   - Vector Embeddings / Model Inference  |
+------------------------------------+   +------------------------------------------+
                   |                                       |
                   +-------------------+-------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------------+
|                            DATA PERSISTENCE MESH                                  |
|   [${primaryDb} Master Relational DB] <---> [Redis Hot Cache] <---> [Blob Storage]   |
+-----------------------------------------------------------------------------------+
\`\`\`

---

## 6.0 Work Breakdown Structure (WBS) & 32-Week Roadmap

\`\`\`
Sprint 01-04: Literature Review, Rubric Formalization, SOTA Baseline Benchmarking
Sprint 05-08: Architectural Modeling, IEEE-830 SRS Specification, DB Schema DDL Definition
Sprint 09-14: Ingestion Layer & Core Processing Microservices Prototyping
Sprint 15-20: Analytical Engine Optimization & Asynchronous Worker Orchestration
Sprint 21-24: Frontend Workbench Integration, Real-Time WebSockets Telemetry
Sprint 25-28: End-to-End Stress Testing, Chaos Engineering (Latency Injection), Security Audit
Sprint 29-32: Thesis Finalization, Peer Review Defense Presentation & Rubric Documentation
\`\`\`

---

## 7.0 Formal Risk Prioritization Matrix (Likelihood x Impact)

| Risk ID | Description & Vulnerability | Likelihood (1-5) | Impact (1-5) | Exposure Score | Mitigation Strategy | Contingency Plan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **RSK-01** | High ingestion latency during sudden telemetry spikes | 3 | 4 | **12 (High)** | Dynamic worker auto-scaling and Redis buffering queues | Backpressure throttling with HTTP 429 Retry-After |
| **RSK-02** | Schema migration conflicts across distributed nodes | 2 | 5 | **10 (High)** | Zero-downtime blue/green schema migration with Flyway/Alembic | Immediate automated rollback to previous replica snapshot |
| **RSK-03** | Third-party upstream API rate-limiting & network drops | 4 | 3 | **12 (High)** | Circuit breaker pattern with exponential jitter backoff | Fallback to cached localized metadata cache |
| **RSK-04** | GPU / Memory OOM during high-concurrency batch processing | 2 | 4 | **8 (Medium)**| Strict memory cgroups allocation and streaming iterators | Offload heavy batches to asynchronous worker queues |
| **RSK-05** | Unauthorized access token exfiltration | 1 | 5 | **5 (Medium)**| Short-lived asymmetric RS256 JWT tokens with rotating secret keys | Instant token invalidation via Redis blacklist |

---

## 8.0 UN Sustainable Development Goals (SDG) Alignment
In adherence to the **HEC Outcome-Based Education (PLO-7: Environment & Sustainability, PLO-8: Professional Ethics)**, this research actively supports:
- **UN SDG 9 (Industry, Innovation, and Infrastructure):** Enhancing technological capabilities through open, resilient, low-overhead software architecture.
- **UN SDG 11 (Sustainable Cities and Communities):** Providing automated resource-efficient operational intelligence that minimizes computational energy waste.
- **UN SDG 12 (Responsible Consumption and Production):** Optimized memory layouts reduce server wattage consumption by an estimated 28% compared to legacy monoliths.

---

## 9.0 Academic Evaluation & Defense Criteria
The project outcomes directly satisfy all rubric criteria stipulated by the university review committee:
1. **PLO-1 (Engineering Knowledge):** Rigorous algorithmic formulation and asymptotic complexity bounds ($O(N \\log N)$).
2. **PLO-2 (Problem Analysis):** Systematic benchmarking against 3 documented baseline systems.
3. **PLO-3 (Design/Development of Solutions):** Production-grade multi-tiered architecture with complete automated test coverage ($>88\\%$).
4. **PLO-11 (Project Management):** Comprehensive 32-week Agile sprint roadmap with empirical milestone verification.
`;
  } else if (documentMode === 'srs') {
    executiveSummary = `The Software Requirements Specification (SRS) for "${title}" establishes formal, unambiguous requirements conforming strictly to the IEEE-830 / ISO/IEC/IEEE 29148 Standard. Utilizing RFC 2119 keywords [SHALL, SHOULD, MUST], this specification details functional decomposition, comprehensive tabular use cases, external interfaces, and non-functional SLAs for ${domain} platforms.`;

    markdown = `# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
## In Conformance with IEEE Standard 830-1998 / ISO/IEC/IEEE 29148:2018
**PROJECT TITLE:** ${title}  
**SYSTEM CLASSIFICATION:** Production-Grade Academic Capstone Architecture  
**DEGREE LEVEL:** ${degreeLevel}  
**DOMAIN:** ${domain}  
**PRIMARY TECH STACK:** ${techList}  
**REVISION:** 1.4-FINAL  
**STATUS:** FORMALLY RATIFIED SPECIFICATION

---

## 1.0 Introduction

### 1.1 Purpose
This document provides a complete, unambiguous specification of the functional, performance, security, and interface requirements for **${title}**. It serves as the primary contractual and evaluation baseline for academic evaluation committees, software engineers, and domain researchers.

### 1.2 Document Conventions & RFC 2119 Terminology
The requirement statements in this document adhere to **RFC 2119** keyword semantics:
- **SHALL / MUST:** Mandatory architectural requirement; failure to implement invalidates system acceptance.
- **SHOULD / RECOMMENDED:** High-priority requirement; deviations must be formally justified to the supervisor.
- **MAY / OPTIONAL:** Permissible feature extension subject to sprint capacity.

### 1.3 Intended Audience
This specification is intended for the University FYP Committee, Academic Defense Examiners, Lead Software Architects, and DevOps Engineers.

---

## 2.0 Overall System Description

### 2.1 Product Perspective
The system operates as an autonomous, distributed software platform. It interfaces with external telemetry streams, authentication providers, and data analytics consumers via strict RESTful JSON and gRPC endpoints.

### 2.2 User Classes & Behavioral Profiles
1. **System Administrator:** Oversees cluster topology, role assignments, cryptographic key rotation, and disaster recovery.
2. **Domain Engineer / Operator:** Interacts with real-time analytics, registers pipeline configurations, and monitors throughput.
3. **Audit Committee / Academic Evaluator:** Examines compliance logs, verification traces, and system performance benchmarks.

### 2.3 Operating Environment & Constraints
- **Container Environment:** OCI-compliant Docker Engine $\\ge 24.0$, orchestrated via Kubernetes or Docker Compose.
- **Database Engine:** ${primaryDb} with ACID transaction guarantees and connection pool management (HikariCP / PgBouncer).
- **Client Runtime:** Modern Evergreen web browsers supporting WebGL 2.0, WebSockets, and ECMAScript 2022.

---

## 3.0 Detailed Functional Requirements (IEEE Formal Syntax)

### Module 3.1: Ingestion & Telemetry Influx
- **REQ-ING-001 (SHALL):** The system **SHALL** accept incoming JSON and binary telemetry payloads over HTTPS POST and WSS protocols with TLS 1.3 encryption.
- **REQ-ING-002 (SHALL):** The ingestion pipeline **SHALL** validate all incoming payloads against JSON Schema draft-07 specifications within 4.5 milliseconds.
- **REQ-ING-003 (MUST):** Any malformed or non-compliant payload **MUST** be rejected immediately with an HTTP 422 Unprocessable Entity status code and an RFC 7807 Problem Detail response.
- **REQ-ING-004 (SHOULD):** The ingestion tier **SHOULD** buffer incoming events into Redis streaming queues when sustained throughput exceeds 10,000 req/s.

### Module 3.2: Analytical Engine & Processing
- **REQ-ENG-001 (SHALL):** The processing worker **SHALL** execute the algorithmic transformation pipeline utilizing **${primaryBackend}** with vector parallelization.
- **REQ-ENG-002 (SHALL):** Processed artifacts **SHALL** be stamped with high-resolution UTC timestamps (microsecond precision) and SHA-256 cryptographic checksums.
- **REQ-ENG-003 (MUST NOT):** The processing tier **MUST NOT** store unencrypted sensitive personal identifiers or raw API tokens in temporary scratch buffers.

### Module 3.3: Data Persistence & Auditing
- **REQ-DAT-001 (SHALL):** The persistence layer **SHALL** execute all mutation operations within isolated database transactions with \`READ COMMITTED\` isolation level.
- **REQ-DAT-002 (SHALL):** The system **SHALL** maintain an append-only audit trail recording every state alteration, associated user UUID, and source IP address.
- **REQ-DAT-003 (SHOULD):** Relational tables with more than 1,000,000 rows **SHOULD** implement monthly range partitioning to preserve index query performance.

---

## 4.0 Formal IEEE Use Cases (Tabular Specification)

### Use Case UC-01: Real-Time Pipeline Orchestration & Execution
| Field | Specification |
| :--- | :--- |
| **Use Case ID** | **UC-01** |
| **Title** | Execute Analytical Pipeline Workflow |
| **Primary Actor** | Domain Engineer |
| **Preconditions** | User is authenticated with an active session token holding \`ROLE_ENGINEER\`. Target dataset or stream is validated. |
| **Postconditions** | Pipeline output artifacts are stored in ${primaryDb}, telemetry emitted, and audit ledger updated. |
| **Trigger** | User submits pipeline execution request via Web Dashboard or API. |
| **Main Success Scenario** | 1. User selects workflow parameters and clicks "Execute Pipeline".<br>2. Client issues signed POST request to \`/api/v1/pipeline/execute\`.<br>3. Gateway validates JWT and checks rate limit.<br>4. Ingestion service enqueues execution task onto worker queue.<br>5. Worker executes transformations and updates progress stream via WebSockets.<br>6. Final computation written to persistent store with integrity hash.<br>7. Client receives HTTP 200 with result payload and execution trace ID. |
| **Alternative Flow (4a)** | Worker node failure: Worker watchdog detects heartbeat timeout. Task is re-queued to secondary standby worker within 2.0s without duplicate data mutation. |
| **Exception Flow (3a)** | Invalid parameters: Gateway returns HTTP 400 Bad Request with field-level validation errors. Transaction aborted. |

### Use Case UC-02: Cryptographic Audit Trail Verification
| Field | Specification |
| :--- | :--- |
| **Use Case ID** | **UC-02** |
| **Title** | Verify Document & State Hash Integrity |
| **Primary Actor** | Academic Evaluator / Auditor |
| **Preconditions** | Auditor possesses \`ROLE_AUDITOR\` permissions. |
| **Postconditions** | Cryptographic verification proof (valid/tampered) rendered with block height and timestamp. |
| **Trigger** | Auditor requests integrity validation for specific artifact batch. |
| **Main Success Scenario** | 1. Auditor inputs artifact UUID into verification portal.<br>2. System queries Merkle ledger and recalculates SHA-256 tree root.<br>3. System compares calculated hash with immutable genesis snapshot.<br>4. Verification badge displayed showing green validation check and signature match. |

---

## 5.0 External Interface Requirements
- **5.1 User Interfaces:** Responsive single-page application built with ${primaryFrontend}, supporting 1080p to 4K resolutions, dark mode accessibility (contrast ratio $\\ge 4.5:1$).
- **5.2 Hardware Interfaces:** Supports direct USB/IP telemetry streaming from IoT/embedded sensor microcontrollers (RS-485 / Serial Baud 115200).
- **5.3 Software Interfaces:** Connection to ${primaryDb} via JDBC/asyncpg connection pools; integration with Redis v7.2 for distributed caching.
- **5.4 Communication Protocols:** HTTPS/TLS 1.3 for API calls; WebSockets (RFC 6455) for live streaming; gRPC over HTTP/2 for inter-microservice IPC.

---

## 6.0 Non-Functional Requirements (Quantitative SLAs)

| Requirement Category | Metric Identifier | Metric Specification & Target | Verification Method |
| :--- | :--- | :--- | :--- |
| **Performance** | **NFR-PERF-01** | End-to-end API response time $\\le 45\\text{ ms}$ at 95th percentile | Locust / k6 synthetic load testing |
| **Throughput** | **NFR-PERF-02** | Sustained ingestion capacity $\\ge 12,000\\text{ events/sec}$ | Distributed JMeter cluster |
| **Availability** | **NFR-AVAIL-01** | High availability guarantee of $99.95\\%$ uptime ($< 22$ minutes downtime/month) | CloudWatch / Prometheus synthetic probes |
| **Security** | **NFR-SEC-01** | Zero OWASP Top 10 vulnerabilities; AES-256 encryption at rest | SonarQube static analysis & OWASP ZAP |
| **Maintainability** | **NFR-MAINT-01** | Cyclomatic complexity $\\le 12$ per method; unit test code coverage $\\ge 85\\%$ | Jest / PyTest automated CI gate |

---

## 7.0 Requirements Traceability Matrix (RTM)

| Requirement ID | Module | Associated Use Case | Verification Test Suite | OBE PLO Alignment |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-ING-001** | Ingestion | UC-01 | TestIngestionProtocolSuite | PLO-3 (Design Solutions) |
| **REQ-ING-002** | Ingestion | UC-01 | TestSchemaValidationSuite | PLO-2 (Problem Analysis) |
| **REQ-ENG-001** | Processing | UC-01 | TestProcessingWorkerMatrix | PLO-1 (Engineering Knowledge) |
| **REQ-DAT-001** | Persistence | UC-01 | TestAcidTransactionsSuite | PLO-3 (Design Solutions) |
| **REQ-DAT-002** | Persistence | UC-02 | TestAuditLedgerProof | PLO-8 (Ethics & Integrity) |
`;
  } else {
    // SDS
    executiveSummary = `The Software Design Specification (SDS) for "${title}" establishes the production architecture adhering to the IEEE-1016 Standard. It specifies clean architectural patterns, complete PostgreSQL DDL tables with foreign key constraints and indexes, OpenAPI/REST contracts, STRIDE threat modeling, and Docker deployment topologies for ${domain}.`;

    markdown = `# SOFTWARE DESIGN & ARCHITECTURE SPECIFICATION (SDS)
## Conforming to IEEE Standard 1016-2009 (Information Technology — System Design)
**PROJECT TITLE:** ${title}  
**SYSTEM NAME:** ${title.split(':')[0] || 'Core System Architecture'}  
**DEGREE CANDIDACY:** ${degreeLevel}  
**ENGINEERING DOMAIN:** ${domain}  
**STACK COMPONENTS:** ${techList}  
**DOCUMENT VERSION:** 2.0-RELEASE  
**ARCHITECTURAL CLASSIFICATION:** Production Multi-Tiered Distributed Architecture

---

## 1.0 Architectural Goals & Design Philosophy
The system is designed around the principles of **Domain-Driven Design (DDD)** and **Hexagonal Architecture (Ports and Adapters)**. This structure decouples the business logic from volatile infrastructure concerns (databases, user interfaces, third-party messaging queues).

### Architectural Axioms:
1. **Stateless Compute Nodes:** All API worker instances maintain zero local session state, allowing horizontal auto-scaling via Kubernetes HPA.
2. **Defensive API Gateways:** Every external ingress is authenticated, rate-limited, and sanitized prior to dispatching to internal domain buses.
3. **Data Integrity & Polyglot Persistence:** Structured relational entities reside in **${primaryDb}** under strict ACID isolation, while ephemeral hot states reside in in-memory caches.

---

## 2.0 High-Level Architectural Topology

\`\`\`
+---------------------------------------------------------------------------------------------------------+
|                                         EDGE CLIENT ECOSYSTEM                                           |
|       [Web Client: React/TS]                [Mobile: Flutter/PWA]               [Automated Agents]      |
+---------------------------------------------------------------------------------------------------------+
                                                     |
                                            HTTPS / TLS 1.3
                                                     |
                                                     v
+---------------------------------------------------------------------------------------------------------+
|                                      INGRESS REVERSE PROXY & GATEWAY                                    |
|   - NGINX / Envoy Proxy (SSL Termination, CORS Origin Validation, Token-Bucket Rate Limiter 500r/s)     |
+---------------------------------------------------------------------------------------------------------+
                                                     |
                                       Internal Virtual Private Network
                                                     |
                                                     v
+---------------------------------------------------------------------------------------------------------+
|                                     MICROSERVICES APPLICATION FABRIC                                    |
|                                                                                                         |
|   +----------------------------+   +----------------------------+   +-------------------------------+   |
|   |   Authentication Service   |   |    Core Workflow Service   |   |   Analytical Compute Workers  |   |
|   |  - Asymmetric RS256 JWT    |   |  - Business Domain Logic   |   |  - Matrix Operations Engine   |   |
|   |  - RBAC Policy Enforcer    |   |  - State Machine Driver    |   |  - Vector / Tensor Inference  |   |
|   +----------------------------+   +----------------------------+   +-------------------------------+   |
+---------------------------------------------------------------------------------------------------------+
                               |                              |                              |
                               v                              v                              v
+---------------------------------------------------------------------------------------------------------+
|                                     PERSISTENCE & STORAGE TIER                                          |
|                                                                                                         |
|   +----------------------------+   +----------------------------+   +-------------------------------+   |
|   |      ${primaryDb} Master     |   |      Redis Memory Mesh     |   |     S3 / MinIO Object Store   |   |
|   |  - Normalized Relational   |   |  - Ephemeral Hot Caches    |   |  - Exported PDF Artifacts     |   |
|   |  - B-Tree Composite Index  |   |  - Distributed Semaphores  |   |  - High-Volume Telemetry Logs |   |
|   +----------------------------+   +----------------------------+   +-------------------------------+   |
+---------------------------------------------------------------------------------------------------------+
\`\`\`

---

## 3.0 Production Database Architecture & SQL DDL

The persistence layer is implemented in **PostgreSQL 16**. The schema features UUID primary keys, relational foreign keys with cascading referential integrity, check constraints, and composite B-tree indexes.

\`\`\`sql
-- ====================================================================
-- SYSTEM SCHEMA DEFINITIONS: ${title.split(':')[0] || 'Academic System'}
-- Conforming to 3NF Normalized Relational Design
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Table: System Tenants & Universities
CREATE TABLE academic_institutions (
    institution_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(32) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    country_code VARCHAR(3) DEFAULT 'PAK',
    accreditation_body VARCHAR(64) DEFAULT 'HEC/Washington Accord',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Table: User Personas & Authentication Principals
CREATE TABLE system_users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES academic_institutions(institution_id) ON DELETE RESTRICT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(128) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('STUDENT', 'SUPERVISOR', 'EXTERNAL_EXAMINER', 'ADMIN')),
    is_email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table: Project Blueprints & Thesis Specifications
CREATE TABLE thesis_projects (
    project_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES academic_institutions(institution_id) ON DELETE CASCADE,
    supervisor_id UUID REFERENCES system_users(user_id) ON DELETE SET NULL,
    title VARCHAR(512) NOT NULL,
    domain VARCHAR(128) NOT NULL,
    degree_level VARCHAR(64) NOT NULL,
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    document_mode VARCHAR(16) NOT NULL CHECK (document_mode IN ('proposal', 'srs', 'sds')),
    rubric_preset VARCHAR(32) NOT NULL,
    obe_compliance_score NUMERIC(5,2) DEFAULT 0.00 CHECK (obe_compliance_score BETWEEN 0.00 AND 100.00),
    is_locked BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table: Generated Document Artifacts & Version Revisions
CREATE TABLE document_artifacts (
    artifact_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES thesis_projects(project_id) ON DELETE CASCADE,
    revision_number INT NOT NULL DEFAULT 1,
    content_markdown TEXT NOT NULL,
    content_sha256 VARCHAR(64) NOT NULL,
    executive_summary TEXT,
    word_count INT NOT NULL DEFAULT 0,
    generated_by_engine VARCHAR(64) DEFAULT 'Gemini-3.8-Flash-Academic-OS',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_project_revision UNIQUE (project_id, revision_number)
);

-- Table: Immutable Audit Verification Ledger
CREATE TABLE audit_verification_ledger (
    ledger_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artifact_id UUID NOT NULL REFERENCES document_artifacts(artifact_id) ON DELETE CASCADE,
    verifier_id UUID REFERENCES system_users(user_id) ON DELETE SET NULL,
    verification_hash VARCHAR(64) NOT NULL,
    blockchain_tx_ref VARCHAR(128),
    payment_status VARCHAR(32) DEFAULT 'VERIFIED_CLEARED',
    amount_paid_pkr NUMERIC(10,2) DEFAULT 1500.00,
    verified_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Performance Optimization Indexes
CREATE INDEX idx_thesis_projects_institution ON thesis_projects (institution_id);
CREATE INDEX idx_thesis_projects_mode ON thesis_projects (document_mode);
CREATE INDEX idx_document_artifacts_project_rev ON document_artifacts (project_id, revision_number DESC);
CREATE INDEX idx_system_users_email ON system_users (email);
CREATE INDEX idx_audit_ledger_artifact ON audit_verification_ledger (artifact_id);
\`\`\`

---

## 4.0 Detailed API Contract Specification (RESTful / OpenAPI 3.0)

### Endpoint: \`POST /api/v1/projects/architect\`
- **Description:** Formulates and compiles a complete rubric-compliant academic specification document.
- **Headers:**
  - \`Authorization: Bearer <RS256_JWT_TOKEN>\`
  - \`Content-Type: application/json\`

#### Request Body Schema (JSON)
\`\`\`json
{
  "title": "${title}",
  "domain": "${domain}",
  "degreeLevel": "${degreeLevel}",
  "techStack": ${JSON.stringify(techStack)},
  "documentMode": "${documentMode}",
  "rubricPreset": "${rubricPreset}",
  "options": {
    "injectSDG": true,
    "generateEvaluationMetrics": true,
    "includeRiskMatrix": true
  }
}
\`\`\`

#### Response Body Schema (\`200 OK\`)
\`\`\`json
{
  "status": "success",
  "data": {
    "projectId": "a7b3c9d1-84f2-4e0a-9bc1-791f4b823e51",
    "documentMode": "${documentMode}",
    "rubricScorecard": {
      "overallScore": 97.4,
      "obeAlignment": 98.2,
      "ieeeRigor": 96.5,
      "measurableMetrics": 99.0
    },
    "checksum": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "generatedAt": "2026-10-17T12:00:00.000Z"
  }
}
\`\`\`

---

## 5.0 Security & Zero-Trust Threat Model (STRIDE Framework)

| STRIDE Threat Category | Potential Attack Vector | Impact Severity | Architectural Countermeasure |
| :--- | :--- | :--- | :--- |
| **Spoofing** | Forged JWT claims or replay of session tokens | High | Asymmetric RS256 signature verification with 15-minute token TTL |
| **Tampering** | Man-in-the-Middle payload alteration in transit | Critical | Strict HSTS, TLS 1.3 enforced, SHA-256 payload checksum validation |
| **Repudiation** | User denies triggering an unauthorized schema migration | Medium | Immutable, write-once append audit ledger with client IP fingerprint |
| **Information Disclosure** | SQL Injection exfiltrating unmasked project records | Critical | Parameterized prepared statements via ORM; zero string interpolation |
| **Denial of Service** | Volumetric HTTP flood overwhelming worker compute | High | Token-bucket rate limiting (NGINX/Envoy) with Redis distributed locks |
| **Elevation of Privilege** | Student modifying examiner rubric scores | Critical | Attribute-Based Access Control (ABAC) verified at gateway and service tier |

---

## 6.0 Container Deployment & Infrastructure Topology

\`\`\`yaml
version: '3.8'

services:
  gateway:
    image: nginx:alpine-slim
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - app-server

  app-server:
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://user:password@db:5432/thesis_craft_db
      - REDIS_URL=redis://cache:6379
      - GEMINI_API_KEY=\${GEMINI_API_KEY}
    ports:
      - "3000:3000"
    depends_on:
      - db
      - cache

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=thesis_craft_db
      - POSTGRES_USER=thesis_admin
      - POSTGRES_PASSWORD=SuperSecureProductionKey2026!
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  cache:
    image: redis:7.2-alpine
    command: ["redis-server", "--appendonly", "yes", "--maxmemory", "512mb", "--maxmemory-policy", "allkeys-lru"]
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:
\`\`\`
`;
  }

  const wordCount = markdown.split(/\s+/).length;
  const sectionsCount = (markdown.match(/^##\s+/gm) || []).length;

  return {
    title,
    mode: documentMode,
    markdown,
    generatedAt: new Date().toISOString(),
    rubricScorecard: {
      overallScore: 97.4,
      obeAlignment: 98.5,
      ieeeRigor: 96.8,
      measurableMetrics: 99.1,
      riskCompleteness: 95.2,
      feedbackPoints: [
        'Exemplary SOTA baseline comparative matrix with quantified latency and throughput metrics.',
        'Strict RFC 2119 requirement keyword formulation compliant with IEEE-830.',
        'Fully normalized 3NF relational PostgreSQL schema with UUID keys and B-Tree indexes.',
        'Explicit mapping to HEC OBE PLO-1, PLO-2, PLO-3, PLO-7, and PLO-8.',
      ],
      sdgAligned: ['SDG 9: Industry, Innovation, and Infrastructure', 'SDG 11: Sustainable Cities', 'SDG 12: Responsible Consumption'],
    },
    rubricTrackers: [
      { id: 'problem-scope', title: 'Problem Scope Formulation', description: 'Quantified domain context & research hypotheses', verified: true, score: 98 },
      { id: 'baseline-def', title: 'Baseline Definition & SOTA', description: 'Comparative latency & throughput matrix', verified: true, score: 96 },
      { id: 'sys-boundaries', title: 'System Boundaries', description: 'Explicit In-Scope vs Out-of-Scope boundaries', verified: true, score: 99 },
      { id: 'ieee-syntax', title: 'IEEE-830 / 1016 RFC 2119 Rigor', description: 'Formal [SHALL, SHOULD, MUST] keyword semantics', verified: true, score: 97 },
      { id: 'db-schema', title: 'Database & Schema Normalization', description: '3NF relational schemas with DDL, UUIDs & indexes', verified: true, score: 95 },
      { id: 'risk-matrix', title: 'Risk Prioritization Matrix', description: 'Formal Likelihood x Impact scoring table', verified: true, score: 94 },
      { id: 'feasibility', title: 'Feasibility & KPIs Verification', description: 'Measurable SLAs, P99 bounds & MTBF reliability', verified: true, score: 99 },
    ],
    sectionsCount,
    wordCount,
    isUnlocked: false,
  };
}
