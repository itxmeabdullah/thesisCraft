import React, { useState } from 'react';
import { 
  HelpCircle, ChevronDown, ChevronUp, Copy, Check, 
  ShieldAlert, Sparkles, BookOpen, Eye, EyeOff, Award 
} from 'lucide-react';
import { DefenseQuestion } from '../types';

interface DefensePrepCardProps {
  questions?: DefenseQuestion[];
}

export const DefensePrepCard: React.FC<DefensePrepCardProps> = ({ questions }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hideAnswers, setHideAnswers] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  if (!questions || questions.length === 0) return null;

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleCopyAll = () => {
    const text = questions
      .map(
        (q, i) =>
          `Q${i + 1} [${q.focusArea} - ${q.difficulty}]:\nQuestion: ${q.question}\nExaminer Focus: ${q.defenseStrategy}\nModel Answer: ${q.modelAnswerGuideline}\n`
      )
      .join('\n---\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-[780px] rounded border border-[#333333] bg-[#161616] shadow-xl p-5 sm:p-6 text-left my-6 space-y-4 select-text">
      
      {/* Sub-card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#2D2D2D] gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-white bg-white text-black flex items-center justify-center font-bold shrink-0">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-tight">
                Defense Prep / Viva Simulator
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#444444] bg-[#222222] text-[#B3B3B3]">
                5 VIVA TRAPS
              </span>
            </div>
            <p className="text-[11px] text-[#707070] font-mono">
              Supervisor interrogation questions derived from your tech stack & SOTA baselines
            </p>
          </div>
        </div>

        {/* Header Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setHideAnswers(!hideAnswers)}
            className="px-2.5 py-1 rounded border border-[#333333] bg-[#1E1E1E] hover:bg-[#262626] text-white text-[11px] font-mono flex items-center gap-1.5 transition-colors"
            title="Toggle Practice Mode to test your own answers first"
          >
            {hideAnswers ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-[#B3B3B3]" />}
            <span>{hideAnswers ? 'Reveal Answers' : 'Practice Mode'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyAll}
            className="px-2.5 py-1 rounded border border-[#333333] bg-[#1E1E1E] hover:bg-[#262626] text-white text-[11px] font-mono flex items-center gap-1.5 transition-colors"
            title="Copy Viva Questions to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-[#B3B3B3]" />}
            <span>{copied ? 'Copied' : 'Copy All'}</span>
          </button>
        </div>
      </div>

      {/* Questions Accordion / List */}
      <div className="space-y-3">
        {questions.map((q, idx) => {
          const isExpanded = expandedId === q.id || !expandedId; // open first by default or expanded
          const diffBadge = 
            q.difficulty === 'Critical' ? 'border-white text-white bg-[#262626]' :
            q.difficulty === 'Tough' ? 'border-[#555555] text-[#D4D4D4] bg-[#1C1C1C]' :
            'border-[#3A3A3A] text-[#8C8C8C] bg-[#181818]';

          return (
            <div 
              key={q.id || idx}
              className="rounded border border-[#2D2D2D] bg-[#1A1A1A] p-3.5 transition-colors hover:border-[#404040]"
            >
              {/* Question Bar */}
              <div 
                className="flex items-start justify-between gap-3 cursor-pointer select-none"
                onClick={() => toggleExpand(q.id)}
              >
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded border border-[#3A3A3A] bg-[#121212] text-white shrink-0 mt-0.5">
                    Q{idx + 1}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-mono text-[#8C8C8C] uppercase tracking-wider">
                        {q.focusArea}
                      </span>
                      <span className="text-[#444444]">•</span>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${diffBadge}`}>
                        {q.difficulty}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white leading-snug">
                      {q.question}
                    </h4>
                  </div>
                </div>

                <button 
                  type="button"
                  className="p-1 rounded text-[#707070] hover:text-white shrink-0"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Revealable Answer Guidelines */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-[#262626] space-y-2.5 text-xs animate-in fade-in duration-150">
                  
                  {/* Examiner Focus Angle */}
                  <div className="p-2.5 rounded bg-[#141414] border border-[#262626]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#A0A0A0] font-bold block mb-1">
                      Examiner Trap & Defense Angle:
                    </span>
                    <p className="text-[11px] text-[#8C8C8C] leading-relaxed">
                      {q.defenseStrategy}
                    </p>
                  </div>

                  {/* Model Answer Guideline */}
                  {!hideAnswers ? (
                    <div className="p-2.5 rounded bg-[#202020] border border-[#333333]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white font-bold block mb-1">
                        Recommended Viva Answer Checklist:
                      </span>
                      <p className="text-[11px] text-[#E0E0E0] leading-relaxed">
                        {q.modelAnswerGuideline}
                      </p>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded border border-dashed border-[#3A3A3A] text-center text-[#707070] text-[11px] font-mono">
                      [Practice Mode Active — Formulate your oral answer before revealing]
                    </div>
                  )}

                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-[#262626] flex items-center justify-between text-[10px] font-mono text-[#707070]">
        <span>Standard: IEEE / HEC Outcome-Based Viva Defense</span>
        <span>Rubric Focus: PLO-1 (Knowledge) & PLO-2 (Analysis)</span>
      </div>

    </div>
  );
};
