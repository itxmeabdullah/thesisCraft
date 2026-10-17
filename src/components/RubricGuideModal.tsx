import React from 'react';
import { BookOpen, X, CheckCircle2, Shield, Layers, Award } from 'lucide-react';

interface RubricGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RubricGuideModal: React.FC<RubricGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl rounded-2xl glass-panel border border-violet-500/40 p-6 sm:p-8 shadow-2xl bg-[#0E1526]/95 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-violet-950/60 border border-violet-800/40 text-violet-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Academic Rubric Standards & OBE Matrix</h3>
              <p className="text-xs text-slate-400 font-mono">HEC / Washington Accord / IEEE-830 / IEEE-1016</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-6 space-y-6 text-xs text-slate-300">
          {/* Section 1: HEC OBE / Washington Accord PLOs */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-cyan-300">
              <Award className="w-4 h-4" />
              <span>Outcome-Based Education (OBE) Program Learning Outcomes</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <span className="font-bold text-white block">PLO-1: Engineering Knowledge</span>
                <span className="text-[11px] text-slate-400">Application of mathematics, computing theory, and software fundamentals to complex software engineering problems.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <span className="font-bold text-white block">PLO-2: Problem Analysis</span>
                <span className="text-[11px] text-slate-400">Identification and formal formulation of computational challenges through grounded literature review and SOTA baseline comparisons.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <span className="font-bold text-white block">PLO-3: Design / Development of Solutions</span>
                <span className="text-[11px] text-slate-400">Design of robust system architectures, databases, and algorithms meeting safety, societal, and environmental requirements.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <span className="font-bold text-white block">PLO-7 & PLO-8: Environment & Ethics</span>
                <span className="text-[11px] text-slate-400">Understanding environmental sustainability (UN SDGs) and commitment to professional engineering ethics (ACM/IEEE).</span>
              </div>
            </div>
          </div>

          {/* Section 2: IEEE-830 RFC 2119 Language Rules */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-violet-300">
              <Shield className="w-4 h-4" />
              <span>IEEE-830 Requirement Semantics (RFC 2119 Standard)</span>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono font-bold shrink-0">SHALL / MUST</span>
                <span>An absolute requirement of the specification. The system cannot be accepted by the defense committee if this is omitted.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 font-mono font-bold shrink-0">SHOULD</span>
                <span>High-priority valid reasons may exist in particular circumstances to ignore a particular item, but full implications must be weighed.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 font-mono font-bold shrink-0">MAY / OPTIONAL</span>
                <span>Truly optional enhancements that may be incorporated during iterative development without altering fundamental system goals.</span>
              </div>
            </div>
          </div>

          {/* Section 3: IEEE-1016 Architectural Topologies */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-teal-300">
              <Layers className="w-4 h-4" />
              <span>IEEE-1016 SDS Architectural Viewpoints</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Every Software Design Specification generated by ThesisCraft OS enforces the 4+1 Architectural View Model: Logical View (DDD entities & ports), Process View (asynchronous workers & concurrency), Development View (package dependencies & schemas), and Physical View (Docker containerization & network topologies).
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-violet-500 hover:bg-violet-400 text-white text-xs font-bold transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
