import React, { useState } from 'react';
import { 
  Sliders, Layers, FileText, CheckSquare, X, Plus, 
  Sparkles, ShieldAlert, Globe, Compass, BookOpen, 
  Zap, Code2, Cpu
} from 'lucide-react';
import { 
  ProjectMetadata, DocumentMode, AcademicDomain, 
  RubricPreset, DegreeLevel 
} from '../types';
import { POPULAR_TECH_TAGS } from '../data/sampleProjects';

interface ConfigurationMatrixProps {
  metadata: ProjectMetadata;
  onChange: (updated: Partial<ProjectMetadata>) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const DOMAINS: AcademicDomain[] = [
  'Artificial Intelligence & Machine Learning',
  'Cloud & Distributed Systems',
  'Cybersecurity & Cryptography',
  'Internet of Things & Embedded Edge',
  'Healthcare & Biomedical Informatics',
  'Full-Stack Web & Enterprise SaaS',
  'Mobile & Ubiquitous Computing',
];

const DEGREES: DegreeLevel[] = [
  'BS Computer Science (Final Year Project)',
  'BS Software Engineering (Capstone Project)',
  'BS Data Science / AI (Capstone)',
  'MS Computer Science / Thesis',
];

const RUBRICS: { id: RubricPreset; label: string; desc: string }[] = [
  {
    id: 'hec-obe',
    label: 'HEC / National Standard (Outcome-Based Education)',
    desc: 'Mapped to Washington Accord PLO-1 through PLO-12 with ethical & sustainability benchmarks.',
  },
  {
    id: 'novelty-research',
    label: 'Advanced / Novelty Focused (SOTA Baselines)',
    desc: 'Focuses on empirical gaps against IEEE/ACM publications, hypothesis testing, and algorithmic novelty.',
  },
  {
    id: 'ieee-strict',
    label: 'IEEE 830 / IEEE 1016 Strict Industry Standard',
    desc: 'Rigorous requirement traceability with formal RFC 2119 keywords (SHALL, MUST, SHOULD).',
  },
  {
    id: 'custom-rubric',
    label: 'Customizable Academic Capstone Framework',
    desc: 'Balanced engineering rubric covering design, deployment architecture, and risk analysis.',
  },
];

export const ConfigurationMatrix: React.FC<ConfigurationMatrixProps> = ({
  metadata,
  onChange,
  onGenerate,
  isGenerating,
}) => {
  const [customTag, setCustomTag] = useState('');

  const handleAddTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !metadata.techStack.includes(trimmed)) {
      onChange({ techStack: [...metadata.techStack, trimmed] });
      setCustomTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange({ techStack: metadata.techStack.filter((t) => t !== tagToRemove) });
  };

  const handleKeyDownTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag(customTag);
    }
  };

  return (
    <aside className="w-full lg:w-[420px] shrink-0 border-b lg:border-b-0 lg:border-r border-slate-800/80 bg-[#0B0F19]/90 lg:min-h-[calc(100vh-4rem)] p-4 sm:p-6 space-y-6">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950/60 border border-cyan-800/40 text-cyan-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100">
              The Configuration Matrix
            </h2>
            <p className="text-[11px] text-slate-400">Specification Parameters & Rules</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
          NODE-CONF
        </span>
      </div>

      {/* 1. DOCUMENT MODE SELECTOR (Segmented Tabs) */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Document Mode Selector
          </span>
          <span className="text-[10px] text-slate-500 font-mono">1 OF 3</span>
        </label>

        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
          {[
            { id: 'proposal', label: 'Proposal', sub: 'Blueprint', icon: Compass },
            { id: 'srs', label: 'SRS', sub: 'IEEE-830', icon: FileText },
            { id: 'sds', label: 'Architecture', sub: 'SDS / 1016', icon: Cpu },
          ].map((modeItem) => {
            const Icon = modeItem.icon;
            const active = metadata.documentMode === modeItem.id;
            return (
              <button
                key={modeItem.id}
                type="button"
                onClick={() => onChange({ documentMode: modeItem.id as DocumentMode })}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all duration-150 ${
                  active
                    ? 'bg-gradient-to-b from-cyan-950/80 to-slate-900 border border-cyan-500/50 text-cyan-200 shadow-md shadow-cyan-950/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 mb-0.5 ${active ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="text-xs font-semibold leading-tight">{modeItem.label}</span>
                <span className="text-[10px] text-slate-500 font-mono leading-tight">{modeItem.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. PROJECT METADATA */}
      <div className="space-y-4">
        {/* Project Title */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Project Title
            </label>
            <span className="text-[10px] text-slate-500">IEEE / Capstone Format</span>
          </div>
          <textarea
            rows={2}
            value={metadata.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. EdgeVision-Grid: Autonomous Real-Time Thermal & Visual Anomaly Detection for Power Transmission Lines"
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none leading-relaxed"
          />
        </div>

        {/* Primary Academic Domain */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            Primary Domain
          </label>
          <div className="relative">
            <select
              value={metadata.domain}
              onChange={(e) => onChange({ domain: e.target.value as AcademicDomain })}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 appearance-none pr-8 transition-all cursor-pointer"
            >
              {DOMAINS.map((domain) => (
                <option key={domain} value={domain} className="bg-slate-900 text-slate-200">
                  {domain}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
              ▼
            </div>
          </div>
        </div>

        {/* Degree Program */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            Academic Candidacy Level
          </label>
          <div className="relative">
            <select
              value={metadata.degreeLevel}
              onChange={(e) => onChange({ degreeLevel: e.target.value as DegreeLevel })}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 appearance-none pr-8 transition-all cursor-pointer"
            >
              {DEGREES.map((deg) => (
                <option key={deg} value={deg} className="bg-slate-900 text-slate-200">
                  {deg}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
              ▼
            </div>
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              Technology Stack
            </label>
            <span className="text-[10px] text-cyan-400 font-mono">
              {metadata.techStack.length} Selected
            </span>
          </div>

          {/* Active Tags */}
          <div className="flex flex-wrap gap-1.5 min-h-[40px] p-2 rounded-xl bg-slate-950/60 border border-slate-800">
            {metadata.techStack.length === 0 ? (
              <span className="text-xs text-slate-500 italic p-1">No technologies added yet</span>
            ) : (
              metadata.techStack.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800/90 hover:bg-slate-750 text-cyan-300 text-xs font-mono border border-slate-700"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-rose-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))
            )}
          </div>

          {/* Custom tag input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyDown={handleKeyDownTag}
              placeholder="Add tech (e.g. PyTorch, Docker, Kafka) and press Enter..."
              className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="button"
              onClick={() => handleAddTag(customTag)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          {/* Suggested Quick Tags */}
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block">
              Quick Suggestions:
            </span>
            <div className="flex flex-wrap gap-1">
              {POPULAR_TECH_TAGS.slice(0, 8).map((pTag) => {
                const isSelected = metadata.techStack.includes(pTag);
                return (
                  <button
                    key={pTag}
                    type="button"
                    disabled={isSelected}
                    onClick={() => handleAddTag(pTag)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
                      isSelected
                        ? 'opacity-40 cursor-default bg-slate-900 border-slate-800 text-slate-500'
                        : 'bg-slate-900/50 hover:bg-cyan-950/40 border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-800/50'
                    }`}
                  >
                    +{pTag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. TARGET RUBRIC PRESET */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <CheckSquare className="w-3.5 h-3.5 text-violet-400" />
            Target Rubric Preset
          </span>
          <span className="text-[10px] text-violet-400 font-mono">ACADEMIC AUDIT</span>
        </label>

        <div className="space-y-2">
          {RUBRICS.map((rubric) => {
            const isSelected = metadata.rubricPreset === rubric.id;
            return (
              <div
                key={rubric.id}
                onClick={() => onChange({ rubricPreset: rubric.id })}
                className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'border-violet-500/60 bg-violet-950/30 text-slate-100 shadow-sm shadow-violet-900/20'
                    : 'border-slate-800 bg-slate-900/30 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-semibold">
                  <span>{rubric.label}</span>
                  <input
                    type="radio"
                    name="rubric"
                    checked={isSelected}
                    onChange={() => {}}
                    className="accent-violet-500 cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  {rubric.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. ACADEMIC FINE-TUNING TOGGLES */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          Core Engine Constraints
        </label>

        <div className="space-y-2 text-xs">
          {/* SDG Mapping */}
          <label className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900/40 border border-slate-800/80 cursor-pointer hover:bg-slate-900/70 transition-colors">
            <input
              type="checkbox"
              checked={metadata.injectSDG}
              onChange={(e) => onChange({ injectSDG: e.target.checked })}
              className="mt-0.5 accent-cyan-500 rounded cursor-pointer"
            />
            <div className="leading-snug">
              <span className="font-medium text-slate-200 block">Inject UN Sustainable Development Goals (SDG)</span>
              <span className="text-[11px] text-slate-400">Maps technical architecture to SDG 9, 11, and 12 sustainability targets.</span>
            </div>
          </label>

          {/* Quantitative Evaluation Metrics */}
          <label className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900/40 border border-slate-800/80 cursor-pointer hover:bg-slate-900/70 transition-colors">
            <input
              type="checkbox"
              checked={metadata.generateEvaluationMetrics}
              onChange={(e) => onChange({ generateEvaluationMetrics: e.target.checked })}
              className="mt-0.5 accent-cyan-500 rounded cursor-pointer"
            />
            <div className="leading-snug">
              <span className="font-medium text-slate-200 block">Generate Measurable Evaluation Metrics</span>
              <span className="text-[11px] text-slate-400">Explicit benchmarks for P99 latency, F1-scores, throughput, and MTBF.</span>
            </div>
          </label>

          {/* Risk Prioritization Matrix */}
          <label className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900/40 border border-slate-800/80 cursor-pointer hover:bg-slate-900/70 transition-colors">
            <input
              type="checkbox"
              checked={metadata.includeRiskMatrix}
              onChange={(e) => onChange({ includeRiskMatrix: e.target.checked })}
              className="mt-0.5 accent-cyan-500 rounded cursor-pointer"
            />
            <div className="leading-snug">
              <span className="font-medium text-slate-200 block">Formal Risk Prioritization Matrix</span>
              <span className="text-[11px] text-slate-400">Likelihood x Impact scoring table with concrete contingency plans.</span>
            </div>
          </label>
        </div>
      </div>

      {/* 5. GENERATE BUTTON (Wide, high-contrast neon cyan/violet gradient) */}
      <div className="pt-2 sticky bottom-4 z-10">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating || !metadata.title.trim()}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide text-slate-950 transition-all duration-200 flex items-center justify-center gap-2.5 shadow-xl ${
            isGenerating || !metadata.title.trim()
              ? 'opacity-50 cursor-not-allowed bg-slate-700 text-slate-400'
              : 'bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400 hover:from-cyan-300 hover:via-teal-200 hover:to-violet-300 shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-[1.01]'
          }`}
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Architecting Document...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 fill-current" />
              <span>Architect Document Structure</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 px-1 font-mono">
          <span>Shortcuts: ⌘ + Enter</span>
          <span>Engine: Gemini 3.8 Flash</span>
        </div>
      </div>

    </aside>
  );
};
