import React from 'react';
import { ProjectInputs, DocumentMode, CandidacyDepartment } from '../types';

interface SidebarProps {
  inputs: ProjectInputs;
  onChange: (updated: Partial<ProjectInputs>) => void;
  onSubmit: () => void;
  isGenerating: boolean;
  onLoadPreset: (presetId: string) => void;
}

const DEPARTMENTS: CandidacyDepartment[] = [
  'BS Computer Science',
  'BS Software Engineering',
  'BS Data Science & Artificial Intelligence',
  'MS Computer Science (Thesis Track)',
];

const PRESETS = [
  {
    id: 'edge-uav',
    label: 'Autonomous Edge UAV Anomaly Vision',
    title: 'EdgeVision: Real-Time Anomaly Detection on UAV Edge Hardware for High-Voltage Transmission Lines',
    tech: 'Python, PyTorch, TensorRT, FastAPI, PostgreSQL, Docker',
    dept: 'BS Computer Science' as CandidacyDepartment,
  },
  {
    id: 'health-ehr',
    label: 'Privacy-Preserving EHR Mesh',
    title: 'MedFederate: Privacy-Preserving Electronic Health Record Analytics using Differential Privacy',
    tech: 'Go, Hyperledger Fabric, Python, React, PostgreSQL',
    dept: 'BS Software Engineering' as CandidacyDepartment,
  },
  {
    id: 'llm-scheduler',
    label: 'Distributed KV-Cache GPU Scheduler',
    title: 'KubeLLM: Dynamic Token Slicing and KV-Cache Memory Scheduler for Heterogeneous Clusters',
    tech: 'Rust, Kubernetes, vLLM, Redis, gRPC, Prometheus',
    dept: 'MS Computer Science (Thesis Track)' as CandidacyDepartment,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  inputs,
  onChange,
  onSubmit,
  isGenerating,
  onLoadPreset,
}) => {
  return (
    <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-[#2D2D2D] bg-[#121212] p-5 space-y-6 shrink-0 flex flex-col justify-between">
      <div className="space-y-5">
        
        {/* Section Title */}
        <div className="flex items-center justify-between pb-3 border-b border-[#2D2D2D]">
          <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
            Specification Inputs
          </span>
          <span className="text-[10px] font-mono text-[#707070]">ACADEMIC MATRIX</span>
        </div>

        {/* 1. Project Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-white block">
            Project Title
          </label>
          <textarea
            rows={3}
            value={inputs.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. EdgeVision: Real-Time Anomaly Detection for Power Transmission Lines"
            className="w-full px-3 py-2 text-xs rounded bg-[#1E1E1E] border border-[#2D2D2D] text-white placeholder-[#5A5A5A] focus:outline-none focus:border-white transition-colors resize-none leading-relaxed font-sans"
          />
        </div>

        {/* 2. Technology Stack (comma separated) */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-white block">
            Technology Stack (comma separated)
          </label>
          <input
            type="text"
            value={inputs.techStack}
            onChange={(e) => onChange({ techStack: e.target.value })}
            placeholder="Python, PyTorch, FastAPI, PostgreSQL, Docker"
            className="w-full px-3 py-2 text-xs rounded bg-[#1E1E1E] border border-[#2D2D2D] text-white placeholder-[#5A5A5A] focus:outline-none focus:border-white transition-colors font-mono"
          />
        </div>

        {/* 3. Candidacy Level / Department Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-white block">
            Candidacy Level / Department
          </label>
          <div className="relative">
            <select
              value={inputs.department}
              onChange={(e) => onChange({ department: e.target.value as CandidacyDepartment })}
              className="w-full px-3 py-2 text-xs rounded bg-[#1E1E1E] border border-[#2D2D2D] text-white focus:outline-none focus:border-white appearance-none cursor-pointer pr-8 font-sans"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept} className="bg-[#1E1E1E] text-white">
                  {dept}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#707070] text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* 4. Document Configuration (Borders-Only Button Group) */}
        <div className="space-y-2 pt-2 border-t border-[#2D2D2D]">
          <label className="text-xs font-mono uppercase tracking-wider text-[#8C8C8C] block">
            Document Configuration
          </label>
          <div className="grid grid-cols-1 gap-1.5">
            {[
              { id: 'proposal', label: 'Proposal Structure', sub: 'Problem Scope & Baseline' },
              { id: 'srs', label: 'SRS Blueprint', sub: 'IEEE-830 Requirements' },
              { id: 'sds', label: 'Database/SDS Design', sub: 'IEEE-1016 & SQL DDL' },
            ].map((btn) => {
              const active = inputs.documentMode === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => onChange({ documentMode: btn.id as DocumentMode })}
                  className={`text-left px-3 py-2 rounded text-xs transition-colors border ${
                    active
                      ? 'border-white bg-[#262626] text-white font-medium'
                      : 'border-[#2D2D2D] bg-[#1E1E1E] text-[#8C8C8C] hover:text-white hover:border-[#444444]'
                  }`}
                >
                  <div className="font-semibold">{btn.label}</div>
                  <div className="text-[10px] text-[#707070] font-mono mt-0.5">{btn.sub}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Academic Presets */}
        <div className="space-y-1.5 pt-2 border-t border-[#2D2D2D]">
          <span className="text-[10px] font-mono text-[#707070] uppercase tracking-wider block">
            Load Template Presets:
          </span>
          <div className="space-y-1">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  onChange({
                    title: p.title,
                    techStack: p.tech,
                    department: p.dept,
                  });
                }}
                className="w-full text-left px-2 py-1.5 rounded text-[11px] text-[#8C8C8C] hover:text-white hover:bg-[#1E1E1E] border border-transparent hover:border-[#2D2D2D] transition-colors truncate"
              >
                • {p.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Core Trigger Button */}
      <div className="pt-4 border-t border-[#2D2D2D]">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isGenerating || !inputs.title.trim()}
          className={`w-full py-2.5 px-4 rounded text-xs font-semibold tracking-wide transition-colors ${
            isGenerating || !inputs.title.trim()
              ? 'bg-[#2D2D2D] text-[#707070] cursor-not-allowed'
              : 'bg-white text-black hover:bg-[#E5E5E5] active:bg-[#CCCCCC] cursor-pointer'
          }`}
        >
          {isGenerating ? 'Building Blueprint...' : 'Build Document Blueprint'}
        </button>
        <span className="text-[10px] font-mono text-[#707070] block text-center mt-2">
          Format: IEEE-830 / ISO-29148 Standard
        </span>
      </div>

    </aside>
  );
};
