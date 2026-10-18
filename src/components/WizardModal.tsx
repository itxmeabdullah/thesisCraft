import React, { useState } from 'react';
import { 
  X, ArrowRight, ArrowLeft, Sparkles, Check, 
  Layers, Code2, BookOpen, User, ShieldCheck, 
  HelpCircle, RefreshCw 
} from 'lucide-react';
import { WizardFormData } from '../types';

interface WizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: WizardFormData) => void;
  isGenerating: boolean;
}

const DOMAINS = [
  'Artificial Intelligence & Machine Learning',
  'Cloud & Distributed Systems',
  'Cybersecurity & Cryptography',
  'IoT & Embedded Edge Computing',
  'Healthcare & Biomedical Informatics',
  'Full-Stack Web & Enterprise SaaS',
  'Data Science & Predictive Analytics'
];

const PRESETS = [
  {
    title: 'EdgeVision-UAV: Autonomous Thermal & Visual Defect Detection for High-Voltage Transmission Grids',
    problem: 'Insulator degradation and flashovers cause unpredicted grid blackouts; manual inspections are slow, hazardous, and lack automated microsecond telemetry.',
    domain: 'Artificial Intelligence & Machine Learning',
    tech: 'Python, PyTorch, TensorRT, FastAPI, React, Docker',
    db: 'PostgreSQL 16 & TimescaleDB',
    deploy: 'NVIDIA Jetson Orin Edge + Docker',
    mode: 'SRS' as const,
    standard: 'HEC National Standard (OBE / Washington Accord)',
    degree: 'BS Computer Science',
    authors: 'M. Abdullah, S. Ahmed',
    supervisor: 'Dr. Tariq Mahmood (Associate Professor)'
  },
  {
    title: 'MedChain-Federated: Privacy-Preserving EHR Analytics via Consortium Blockchain & Differential Privacy',
    problem: 'Inter-hospital clinical collaboration is paralyzed by HIPAA/GDPR data privacy constraints and centralized single-point-of-failure vulnerabilities.',
    domain: 'Healthcare & Biomedical Informatics',
    tech: 'Go, Hyperledger Fabric, Python, FastAPI, React',
    db: 'PostgreSQL & CouchDB Ledger',
    deploy: 'Kubernetes Multi-Cluster',
    mode: 'SDS' as const,
    standard: 'IEEE Strict Industry Standard (RFC 2119)',
    degree: 'BS Software Engineering',
    authors: 'H. Raza, F. Khan',
    supervisor: 'Dr. A. Qureshi (Professor)'
  }
];

export const WizardModal: React.FC<WizardModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isGenerating,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<WizardFormData>({
    title: 'EdgeVision-UAV: Autonomous Real-Time Anomaly Detection for Power Transmission Lines',
    problemStatement: 'Manual human power-line inspection is slow, hazardous, and suffers from delayed defect localization during high-voltage flashover emergencies.',
    domain: 'Artificial Intelligence & Machine Learning',
    coreLanguagesAndFrameworks: 'Python, PyTorch, TensorRT, FastAPI, React, Docker',
    databaseArchitecture: 'PostgreSQL 16 (Relational) & Redis (Hot Telemetry)',
    targetDeployment: 'Docker Containers on Edge Hardware (NVIDIA Jetson)',
    documentMode: 'SRS',
    universityStandard: 'HEC National Standard (OBE / Washington Accord)',
    degreeProgram: 'BS Computer Science',
    authors: 'Lead Engineering Cohort (M. Abdullah, S. Ahmed)',
    supervisor: 'Dr. Tariq Mahmood (Associate Professor)',
    includeSDG: true,
    includeSOTABaseline: true,
    includeRiskMatrix: true,
    includeSQLSchema: true,
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const loadPreset = (preset: typeof PRESETS[0]) => {
    setFormData(prev => ({
      ...prev,
      title: preset.title,
      problemStatement: preset.problem,
      domain: preset.domain,
      coreLanguagesAndFrameworks: preset.tech,
      databaseArchitecture: preset.db,
      targetDeployment: preset.deploy,
      documentMode: preset.mode,
      universityStandard: preset.standard,
      degreeProgram: preset.degree,
      authors: preset.authors,
      supervisor: preset.supervisor
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl rounded border border-[#333333] bg-[#141414] shadow-2xl p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2D2D2D] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded border border-[#444444] bg-[#222222] text-white">
              STEP {currentStep} OF 5
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              {currentStep === 1 && '1. Project Identity & Problem Horizon'}
              {currentStep === 2 && '2. Technology Stack & Architecture'}
              {currentStep === 3 && '3. Document Mode & Academic Standard'}
              {currentStep === 4 && '4. Degree Track & Authorship'}
              {currentStep === 5 && '5. Verification Checklist & Generation'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-[#707070] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-[#262626] shrink-0">
          <div 
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        {/* Form Body Container */}
        <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto py-5 space-y-5 text-left text-xs">
          
          {/* Quick preset chips on step 1 */}
          {currentStep === 1 && (
            <div className="p-3 rounded border border-[#2D2D2D] bg-[#1A1A1A] space-y-2">
              <span className="text-[10px] font-mono text-[#8C8C8C] uppercase tracking-wider block">
                Quick Template Presets (Click to autofill):
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => loadPreset(p)}
                    className="px-2.5 py-1 rounded border border-[#333333] hover:border-white text-[11px] font-mono text-[#CCCCCC] hover:text-white bg-[#222222] transition-colors"
                  >
                    + {p.title.split(':')[0]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1: PROJECT IDENTITY & PROBLEM */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">
                  Project Title (FYP / Capstone Name)
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. EdgeVision-UAV: Autonomous Defect Detection for High-Voltage Lines"
                  className="w-full px-3 py-2 rounded bg-[#1C1C1C] border border-[#333333] text-white focus:outline-none focus:border-white font-sans text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">
                  Core Problem Statement & Domain Bottlenecks
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.problemStatement}
                  onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                  placeholder="Describe the concrete technical bottleneck your project solves..."
                  className="w-full px-3 py-2 rounded bg-[#1C1C1C] border border-[#333333] text-white focus:outline-none focus:border-white font-sans text-xs resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">
                  Academic / Technical Domain
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DOMAINS.map((dom) => (
                    <button
                      key={dom}
                      type="button"
                      onClick={() => setFormData({ ...formData, domain: dom })}
                      className={`text-left p-2 rounded border text-xs font-mono transition-colors ${
                        formData.domain === dom
                          ? 'border-white bg-[#242424] text-white'
                          : 'border-[#2D2D2D] bg-[#181818] text-[#8C8C8C] hover:text-white'
                      }`}
                    >
                      {dom}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: TECHNOLOGY STACK & ARCHITECTURE */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">
                  Primary Languages, Frameworks & Libraries
                </label>
                <input
                  type="text"
                  required
                  value={formData.coreLanguagesAndFrameworks}
                  onChange={(e) => setFormData({ ...formData, coreLanguagesAndFrameworks: e.target.value })}
                  placeholder="e.g. Python, PyTorch, FastAPI, React, TypeScript, Docker"
                  className="w-full px-3 py-2 rounded bg-[#1C1C1C] border border-[#333333] text-white focus:outline-none focus:border-white font-mono text-xs"
                />
                <span className="text-[10px] text-[#707070] font-mono block">Comma-separated key technologies</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">
                  Database & Persistence Fabric
                </label>
                <input
                  type="text"
                  required
                  value={formData.databaseArchitecture}
                  onChange={(e) => setFormData({ ...formData, databaseArchitecture: e.target.value })}
                  placeholder="e.g. PostgreSQL 16 (Relational ACID), Redis (Cache), TimescaleDB"
                  className="w-full px-3 py-2 rounded bg-[#1C1C1C] border border-[#333333] text-white focus:outline-none focus:border-white font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">
                  Target Deployment Environment
                </label>
                <input
                  type="text"
                  required
                  value={formData.targetDeployment}
                  onChange={(e) => setFormData({ ...formData, targetDeployment: e.target.value })}
                  placeholder="e.g. Docker Containers on Edge Hardware (NVIDIA Jetson) / AWS EKS"
                  className="w-full px-3 py-2 rounded bg-[#1C1C1C] border border-[#333333] text-white focus:outline-none focus:border-white font-mono text-xs"
                />
              </div>
            </div>
          )}

          {/* STEP 3: DOCUMENT MODE & UNIVERSITY STANDARD */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white block">
                  Target Document Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'SRS', label: 'IEEE-830 SRS', sub: 'Requirements Specification' },
                    { id: 'SDS', label: 'IEEE-1016 SDS', sub: 'System Architecture & DDL' },
                    { id: 'PROPOSAL', label: 'Proposal Blueprint', sub: 'Problem Scope & Timeline' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, documentMode: mode.id as any })}
                      className={`p-3 rounded border text-left transition-colors ${
                        formData.documentMode === mode.id
                          ? 'border-white bg-[#242424] text-white'
                          : 'border-[#2D2D2D] bg-[#181818] text-[#8C8C8C] hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-xs">{mode.label}</div>
                      <div className="text-[10px] font-mono text-[#707070] mt-0.5">{mode.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-white block">
                  University Accreditation Standard & Rubric
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'HEC National Standard (OBE / Washington Accord)', desc: 'Outcome-Based Education with PLO-1 to PLO-8 mapping and ethics verification.' },
                    { id: 'IEEE Formal Strict Industry Standard (RFC 2119)', desc: 'Strict syntactic compliance with RFC 2119 keywords [SHALL, SHOULD, MUST].' },
                    { id: 'Advanced SOTA Research & Novelty Benchmarking', desc: 'Focus on literature gaps against top IEEE/ACM publications with quantified metrics.' },
                  ].map((std) => (
                    <div
                      key={std.id}
                      onClick={() => setFormData({ ...formData, universityStandard: std.id })}
                      className={`p-3 rounded border cursor-pointer transition-colors ${
                        formData.universityStandard === std.id
                          ? 'border-white bg-[#242424] text-white'
                          : 'border-[#2D2D2D] bg-[#181818] text-[#8C8C8C] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span>{std.id}</span>
                        <input
                          type="radio"
                          checked={formData.universityStandard === std.id}
                          onChange={() => {}}
                          className="accent-white"
                        />
                      </div>
                      <p className="text-[11px] text-[#707070] mt-1">{std.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: COHORT & SUPERVISOR */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">
                  Degree Program / Department
                </label>
                <select
                  value={formData.degreeProgram}
                  onChange={(e) => setFormData({ ...formData, degreeProgram: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#1C1C1C] border border-[#333333] text-white focus:outline-none focus:border-white font-sans text-xs"
                >
                  <option value="BS Computer Science">BS Computer Science</option>
                  <option value="BS Software Engineering">BS Software Engineering</option>
                  <option value="BS Data Science & Artificial Intelligence">BS Data Science & Artificial Intelligence</option>
                  <option value="MS Computer Science (Thesis Track)">MS Computer Science (Thesis Track)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">
                  Student / Author Names (Comma separated)
                </label>
                <input
                  type="text"
                  required
                  value={formData.authors}
                  onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                  placeholder="e.g. M. Abdullah, S. Ahmed"
                  className="w-full px-3 py-2 rounded bg-[#1C1C1C] border border-[#333333] text-white focus:outline-none focus:border-white font-sans text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">
                  Lead Supervisor & Committee Representative
                </label>
                <input
                  type="text"
                  required
                  value={formData.supervisor}
                  onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                  placeholder="e.g. Dr. Tariq Mahmood (Associate Professor)"
                  className="w-full px-3 py-2 rounded bg-[#1C1C1C] border border-[#333333] text-white focus:outline-none focus:border-white font-sans text-xs"
                />
              </div>
            </div>
          )}

          {/* STEP 5: VERIFICATION CHECKLIST & GENERATION */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="p-3.5 rounded border border-[#2D2D2D] bg-[#181818] space-y-2">
                <span className="text-xs font-bold text-white block">
                  Summary Review Before IEEE Generation
                </span>
                <div className="text-[11px] font-mono text-[#8C8C8C] space-y-1">
                  <div><strong className="text-white">Title:</strong> {formData.title}</div>
                  <div><strong className="text-white">Mode:</strong> {formData.documentMode} Specification</div>
                  <div><strong className="text-white">Standard:</strong> {formData.universityStandard}</div>
                  <div><strong className="text-white">Stack:</strong> {formData.coreLanguagesAndFrameworks}</div>
                  <div><strong className="text-white">Degree:</strong> {formData.degreeProgram}</div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-white block">
                  Enforce Required IEEE / OBE Modules:
                </label>
                <div className="space-y-1.5">
                  {[
                    { key: 'includeSOTABaseline', label: 'Quantified SOTA Baseline Comparison Table (Latency, Throughput, Memory)' },
                    { key: 'includeSQLSchema', label: 'Normalized 3NF PostgreSQL DDL & Foreign Key Constraints' },
                    { key: 'includeRiskMatrix', label: 'Formal Risk Prioritization Matrix (Likelihood x Impact)' },
                    { key: 'includeSDG', label: 'UN Sustainable Development Goals (SDG 9, 11, 12) & Ethics' },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-2.5 p-2 rounded border border-[#2D2D2D] bg-[#161616] cursor-pointer hover:bg-[#1E1E1E]">
                      <input
                        type="checkbox"
                        checked={(formData as any)[item.key]}
                        onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                        className="accent-white"
                      />
                      <span className="text-xs text-[#CCCCCC]">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

        </form>

        {/* Modal Footer Controls */}
        <div className="pt-4 border-t border-[#2D2D2D] flex items-center justify-between shrink-0">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isGenerating}
              className="px-4 py-2 rounded border border-[#333333] bg-[#1E1E1E] text-white hover:bg-[#282828] text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded text-xs text-[#707070] hover:text-white transition-colors"
            >
              Cancel
            </button>
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2 rounded bg-white text-black font-semibold text-xs hover:bg-[#E5E5E5] transition-colors flex items-center gap-1.5"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFormSubmit}
              disabled={isGenerating}
              className="px-6 py-2.5 rounded bg-white text-black font-bold text-xs hover:bg-[#E5E5E5] transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating IEEE JSON...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate IEEE Specification Object</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
