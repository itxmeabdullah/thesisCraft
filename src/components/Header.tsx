import React from 'react';
import { 
  Sparkles, Key, CheckCircle, Shield, 
  BookOpen, RotateCcw, Cpu, ChevronDown 
} from 'lucide-react';
import { SAMPLE_PROJECTS } from '../data/sampleProjects';
import { SampleProject } from '../types';

interface HeaderProps {
  onOpenApiKeyModal: () => void;
  onOpenRubricGuide: () => void;
  onLoadSampleProject: (sample: SampleProject) => void;
  onReset: () => void;
  isUnlocked: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenApiKeyModal,
  onOpenRubricGuide,
  onLoadSampleProject,
  onReset,
  isUnlocked,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-800/80 bg-[#0B0F19]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-slate-900 to-violet-600/30 border border-cyan-500/40 neon-glow-cyan">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 opacity-20 blur-sm pointer-events-none" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 font-sans">
                ThesisCraft<span className="text-cyan-400"> OS</span>
              </span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 shadow-sm">
                v2.4-ACADEMIC
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              University Capstone & Thesis Document Architect
            </p>
          </div>
        </div>

        {/* Center / System Telemetry Status Indicator */}
        <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">System: Ready</span>
          </div>

          <span className="w-px h-3.5 bg-slate-800" />

          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span className="text-cyan-300">Gemini 3.8 Flash Engine</span>
          </div>

          {isUnlocked && (
            <>
              <span className="w-px h-3.5 bg-slate-800" />
              <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 font-mono">
                <CheckCircle className="w-3 h-3" />
                <span>Export Unlocked</span>
              </div>
            </>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Preset Selector Dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-all font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Load Sample</span>
              <ChevronDown className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-transform group-hover:rotate-180" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-72 rounded-xl glass-panel bg-[#0F172A]/95 border border-slate-700/60 p-2 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1.5 border-b border-slate-800">
                Preset Academic Blueprints
              </div>
              <div className="mt-1 space-y-1">
                {SAMPLE_PROJECTS.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => onLoadSampleProject(sample)}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800/80 transition-colors flex flex-col group/item"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200 group-hover/item:text-cyan-300">
                        {sample.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                        {sample.badge}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {sample.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Rubric Guide */}
          <button
            type="button"
            onClick={onOpenRubricGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-all"
            title="View HEC/IEEE Rubric Guidelines"
          >
            <BookOpen className="w-3.5 h-3.5 text-violet-400" />
            <span className="hidden lg:inline">Rubrics</span>
          </button>

          {/* Connect API Key / Engine Status */}
          <button
            type="button"
            onClick={onOpenApiKeyModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-950/60 to-violet-950/40 hover:from-cyan-900/60 hover:to-violet-900/50 border border-cyan-500/30 text-xs text-cyan-300 transition-all"
          >
            <Key className="w-3.5 h-3.5 text-cyan-400" />
            <span>Connect API Key</span>
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={onReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            title="Reset Workspace"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
