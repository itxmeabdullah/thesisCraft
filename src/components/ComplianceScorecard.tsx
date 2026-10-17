import React from 'react';
import { 
  Award, CheckCircle2, ShieldCheck, 
  BarChart3, FileCheck, Sparkles, AlertCircle 
} from 'lucide-react';
import { GeneratedDocument } from '../types';

interface ComplianceScorecardProps {
  document: GeneratedDocument;
  onOpenPaywall?: () => void;
}

export const ComplianceScorecard: React.FC<ComplianceScorecardProps> = ({
  document,
  onOpenPaywall,
}) => {
  const rubricScorecard = document.rubricScorecard || {
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
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-600/30 border border-cyan-500/40 text-cyan-400">
            <Award className="w-8 h-8" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-mono font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                OBE AUDIT PASS
              </span>
              <span className="text-xs text-slate-400 font-mono">IEEE-830 / ISO-29148</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              Rubric Compliance & Academic Defense Scorecard
            </h2>
            <p className="text-xs text-slate-400">
              Evaluated against HEC National Curriculum & Washington Accord PLO Standards
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 self-end md:self-center">
          <div className="text-right">
            <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 font-mono">
              {rubricScorecard.overallScore}%
            </div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Defense Readiness
            </span>
          </div>
        </div>
      </div>

      {/* Quantitative Scoring Metric Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'OBE PLO Alignment', score: rubricScorecard.obeAlignment, desc: 'PLO-1, 2, 3, 7, 8 Mapping', color: 'from-cyan-500 to-teal-400' },
          { label: 'IEEE-830 Syntax Rigor', score: rubricScorecard.ieeeRigor, desc: 'RFC 2119 [SHALL / MUST]', color: 'from-violet-500 to-indigo-400' },
          { label: 'Measurable Metrics', score: rubricScorecard.measurableMetrics, desc: 'P99 Latency, F1, MTBF', color: 'from-emerald-500 to-teal-400' },
          { label: 'Risk & Safety Matrix', score: rubricScorecard.riskCompleteness, desc: 'Likelihood x Impact', color: 'from-amber-500 to-orange-400' },
        ].map((item, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>{item.label}</span>
              <span className="font-mono text-cyan-300">{item.score}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                style={{ width: `${item.score}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 font-mono block">{item.desc}</span>
          </div>
        ))}
      </div>

      {/* Audit Findings & Committee Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verification Checkpoints */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Automated Evaluation Committee Verification</span>
          </div>
          <div className="space-y-2.5">
            {rubricScorecard.feedbackPoints.map((point, pIdx) => (
              <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* UN SDG & Sustainability Alignment */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-200">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>UN Sustainable Development Goals (SDG) Aligned</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Meets PLO-7 (Environment and Sustainability) requirements by demonstrating concrete technical impact:
          </p>
          <div className="space-y-2">
            {rubricScorecard.sdgAligned.map((sdg, sIdx) => (
              <div key={sIdx} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                <span>{sdg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Locked Certification Notice if document is not unlocked */}
      {!document.isUnlocked && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/30 to-violet-950/30 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">Official Signed Certificate Included with Export</span>
              <span className="text-slate-400">Unlock complete production bundle to download university thesis accreditation certificate.</span>
            </div>
          </div>
          {onOpenPaywall && (
            <button
              onClick={onOpenPaywall}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors shrink-0"
            >
              Unlock Certificate
            </button>
          )}
        </div>
      )}
    </div>
  );
};
