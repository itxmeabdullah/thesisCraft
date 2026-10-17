import React, { useState } from 'react';
import { 
  FileText, Copy, Check, Download, Printer, Lock, 
  Sparkles, Layers, ShieldCheck, Database, Award, 
  Terminal, Eye, ArrowRight, ExternalLink, RefreshCw, 
  CheckCircle2, Compass, AlertCircle, Share2
} from 'lucide-react';
import { GeneratedDocument, ProjectMetadata, SampleProject } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';
import { ComplianceScorecard } from './ComplianceScorecard';
import { SAMPLE_PROJECTS } from '../data/sampleProjects';

interface WorkbenchProps {
  document: GeneratedDocument | null;
  metadata: ProjectMetadata;
  isGenerating: boolean;
  generationStep: number;
  generationProgress: number;
  onGenerate: () => void;
  onOpenPaywall: () => void;
  onLoadSample: (sample: SampleProject) => void;
  onUnlockSuccess: () => void;
}

type WorkbenchTab = 'rendered' | 'raw_markdown' | 'scorecard' | 'sql_ddl';

const GENERATION_STEPS = [
  'Deconstructing Domain Problem Horizon & Literature Baselines...',
  'Benchmarking SOTA Systems Against Quantitative SLA Targets...',
  'Synthesizing IEEE-830 Requirements & Tabular Use Cases...',
  'Compiling 3NF Relational Schemas, Indexes & API Contracts...',
  'Auditing Deliverables Against HEC OBE Rubric & SDGs...',
];

export const Workbench: React.FC<WorkbenchProps> = ({
  document,
  metadata,
  isGenerating,
  generationStep,
  generationProgress,
  onGenerate,
  onOpenPaywall,
  onLoadSample,
  onUnlockSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<WorkbenchTab>('rendered');
  const [copied, setCopied] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleCopyMarkdown = () => {
    if (!document) return;
    if (!document.isUnlocked) {
      onOpenPaywall();
      return;
    }
    navigator.clipboard.writeText(document.markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    if (!document) return;
    if (!document.isUnlocked) {
      onOpenPaywall();
      return;
    }
    const blob = new Blob([document.markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${metadata.title.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}_${document.mode.toUpperCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showNotice('Markdown document downloaded successfully.');
  };

  const handleDownloadLatex = () => {
    if (!document) return;
    if (!document.isUnlocked) {
      onOpenPaywall();
      return;
    }
    // Generate LaTeX template wrapper
    const latexContent = `% =========================================================
% ThesisCraft OS — Generated Academic Thesis Specification
% Conforming to IEEE/ACM Format & HEC OBE Guidelines
% =========================================================
\\documentclass[12pt,a4paper]{report}
\\usepackage{geometry}
\\usepackage{amsmath,amssymb}
\\usepackage{graphicx}
\\usepackage{hyperref}
\\usepackage{listings}
\\usepackage{booktabs}
\\usepackage{xcolor}

\\geometry{margin=1in}
\\title{${document.title}}
\\author{Candidate: Capstone Engineering Cohort}
\\date{\\today}

\\begin{document}
\\maketitle
\\tableofcontents
\\newpage

\\chapter{${document.mode.toUpperCase()} Specification}
\\begin{abstract}
${document.executiveSummary}
\\end{abstract}

% Full generated markdown content converted to LaTeX
\\section{Specification Document}
\\begin{verbatim}
${document.markdown}
\\end{verbatim}

\\end{document}
`;

    const blob = new Blob([latexContent], { type: 'application/x-tex;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${metadata.title.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}_Thesis.tex`;
    a.click();
    URL.revokeObjectURL(url);
    showNotice('LaTeX (.tex) thesis source downloaded.');
  };

  const handlePrint = () => {
    if (!document) return;
    if (!document.isUnlocked) {
      onOpenPaywall();
      return;
    }
    window.print();
  };

  const showNotice = (msg: string) => {
    setExportNotice(msg);
    setTimeout(() => setExportNotice(null), 3000);
  };

  // Extract SQL from markdown if available
  const extractSql = (md: string) => {
    const sqlMatch = md.match(/```sql([\s\S]*?)```/);
    return sqlMatch ? sqlMatch[1].trim() : '-- No SQL block detected in current mode';
  };

  return (
    <main className="flex-1 flex flex-col min-w-0 bg-[#0B0F19] overflow-y-auto">
      
      {/* Export Notification Toast */}
      {exportNotice && (
        <div className="fixed top-20 right-8 z-50 px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/60 shadow-xl text-xs text-cyan-300 flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* GENERATING PROGRESS TELEMETRY OVERLAY */}
      {isGenerating && (
        <div className="m-6 p-6 rounded-2xl glass-panel-glow bg-[#0E1526]/90 border border-cyan-500/50 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-700/50 text-cyan-400">
                <RefreshCw className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  TELEMETRY ENGINE RUNNING
                </span>
                <h3 className="text-sm font-bold text-white">
                  Architecting Academic Specification
                </h3>
              </div>
            </div>
            <span className="text-xl font-extrabold font-mono text-cyan-300">
              {Math.round(generationProgress)}%
            </span>
          </div>

          {/* Animated Glowing Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-500 transition-all duration-300 shadow-md shadow-cyan-400/50"
              style={{ width: `${generationProgress}%` }}
            />
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
            <span className="flex items-center gap-2 text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              {GENERATION_STEPS[generationStep] || 'Compiling Final Output Payload...'}
            </span>
            <span className="text-slate-500">
              STAGE {generationStep + 1} OF 5
            </span>
          </div>
        </div>
      )}

      {/* WORKBENCH CONTENT */}
      {!document && !isGenerating && (
        /* WELCOME / EMPTY STATE */
        <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-10 my-auto">
          {/* Hero Banner */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-950/80 to-violet-950/60 border border-cyan-800/50 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>IEEE-830 / IEEE-1016 / HEC-OBE Compliant Academic Engine</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Flawless Academic Theses & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400">
                Engineering Blueprints in Seconds
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed">
              Designed specifically for Computer Science, Software Engineering, and Data Science university students. Architect comprehensive Proposals, IEEE-830 SRS specifications, and IEEE-1016 SDS architectures ready for evaluation committee defense.
            </p>

            {/* Quick Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onGenerate}
                disabled={!metadata.title.trim()}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400 hover:from-cyan-300 hover:to-violet-300 transition-all shadow-xl shadow-cyan-500/25 hover:scale-[1.02] cursor-pointer"
              >
                <span>Architect Document Structure</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 Core Pillars Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Problem Horizon & Baselines',
                desc: 'Explicit SOTA baseline comparisons with quantitative latency, throughput, and memory bounds.',
                icon: Compass,
                color: 'text-cyan-400 border-cyan-500/30',
              },
              {
                title: 'IEEE-830 RFC 2119 Rigor',
                desc: 'Formal functional requirements using [SHALL, SHOULD, MUST] keywords and tabular use cases.',
                icon: FileText,
                color: 'text-violet-400 border-violet-500/30',
              },
              {
                title: 'Database DDL & Schemas',
                desc: '3NF normalized PostgreSQL tables with UUID keys, foreign key constraints, and indexes.',
                icon: Database,
                color: 'text-emerald-400 border-emerald-500/30',
              },
              {
                title: 'HEC OBE Rubric Audit',
                desc: 'Washington Accord PLO mapping (PLO 1, 2, 3, 7, 8) and UN Sustainable Development Goals.',
                icon: Award,
                color: 'text-amber-400 border-amber-500/30',
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl glass-panel bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5 group"
                >
                  <div className={`p-2 rounded-xl bg-slate-950/80 border w-fit ${pillar.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Load Sample Projects One-Click */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Or Test with Real-World Academic Blueprints:
                </h3>
                <p className="text-[11px] text-slate-500">Click any preset to auto-populate metadata and explore</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SAMPLE_PROJECTS.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => onLoadSample(sample)}
                  className="p-4 rounded-xl glass-panel bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {sample.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                      {sample.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {sample.description}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {sample.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400">
                        {tech}
                      </span>
                    ))}
                    {sample.techStack.length > 4 && (
                      <span className="text-[10px] text-slate-500 font-mono px-1">
                        +{sample.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* OUTPUT WORKSPACE WHEN DOCUMENT IS GENERATED */}
      {document && !isGenerating && (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto w-full">
          
          {/* Top Document Action Bar */}
          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {document.mode.toUpperCase()} SPECIFICATION
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {document.wordCount.toLocaleString()} words • {document.sectionsCount} Sections
                </span>
                {document.isUnlocked ? (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    UNLOCKED PRODUCTION LICENSE
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 font-mono">
                    <Lock className="w-3 h-3" />
                    PREVIEW MODE (1,500 PKR)
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {document.title}
              </h2>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-end">
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-all"
                title="Copy markdown content"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadMarkdown}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-all"
                title="Download .md file"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Export .MD</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadLatex}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-all"
                title="Download LaTeX thesis source"
              >
                <Terminal className="w-3.5 h-3.5 text-violet-400" />
                <span className="hidden sm:inline">LaTeX (.tex)</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 transition-all"
                title="Print Document"
              >
                <Printer className="w-4 h-4" />
              </button>

              {!document.isUnlocked && (
                <button
                  type="button"
                  onClick={onOpenPaywall}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 text-xs font-bold hover:from-cyan-300 hover:to-teal-200 shadow-md shadow-cyan-500/25 transition-all"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Unlock Export</span>
                </button>
              )}
            </div>
          </div>

          {/* Workbench Tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-1 sm:gap-2">
              {[
                { id: 'rendered', label: 'Academic Document View', icon: Eye },
                { id: 'raw_markdown', label: 'Raw Markdown Engine', icon: Terminal },
                { id: 'scorecard', label: 'Rubric & OBE Scorecard', icon: Award },
                { id: 'sql_ddl', label: 'PostgreSQL DDL & Schemas', icon: Database },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as WorkbenchTab)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      active
                        ? 'bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] font-mono text-slate-400 hidden lg:block">
              ENGINE: GEMINI-3.8-FLASH • 0.3 TEMP
            </div>
          </div>

          {/* TAB CONTENTS */}
          <div className="relative">
            {activeTab === 'rendered' && (
              <div className="p-6 sm:p-10 rounded-2xl glass-panel bg-[#0B0F19]/95 border border-slate-800 shadow-2xl relative">
                <MarkdownRenderer content={document.markdown} isLocked={!document.isUnlocked} />

                {/* THE MONETIZATION ENGINE (UN-BYPASSABLE FLOATING LOCK OVERLAY) */}
                {!document.isUnlocked && (
                  <div className="absolute inset-x-0 bottom-0 top-[380px] bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/95 to-transparent flex flex-col items-center justify-center p-6 text-center z-20 backdrop-blur-[6px]">
                    <div className="max-w-md p-6 rounded-2xl glass-panel-glow bg-[#0E1526]/95 border border-cyan-500/50 shadow-2xl space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-600/30 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto">
                        <Lock className="w-6 h-6 animate-pulse" />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold">
                          UNRESTRICTED ACADEMIC EXPORT
                        </span>
                        <h3 className="text-lg font-bold text-white">
                          Unlock Production-Grade Academic Export
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Previewing first section. Unlock complete academic markdown, downloadable LaTeX thesis source, full PostgreSQL schemas, and signed defense scorecard.
                        </p>
                      </div>

                      <div className="py-2 px-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Single Blueprint Unlock:</span>
                        <span className="text-cyan-300 font-bold font-mono">1,500 PKR / $5.50 USD</span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
                        <button
                          type="button"
                          onClick={onOpenPaywall}
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>Unlock via EasyPaisa / SadaPay / Card</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onUnlockSuccess();
                          }}
                          className="w-full sm:w-auto py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors whitespace-nowrap"
                          title="Instant bypass for demonstration testing"
                        >
                          Simulate Unlock
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'raw_markdown' && (
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#090D16] shadow-xl">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400">
                  <span>SOURCE: {document.mode.toUpperCase()}_SPECIFICATION.md</span>
                  <button
                    onClick={handleCopyMarkdown}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Full Markdown'}</span>
                  </button>
                </div>
                <div className={`p-4 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto max-h-[700px] overflow-y-auto ${!document.isUnlocked ? 'filter blur-[1.5px] select-none pointer-events-none' : ''}`}>
                  <pre>{document.markdown}</pre>
                </div>
                {!document.isUnlocked && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <button
                      onClick={onOpenPaywall}
                      className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-xl"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Unlock Raw Markdown Source (1,500 PKR)</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'scorecard' && (
              <ComplianceScorecard document={document} onOpenPaywall={onOpenPaywall} />
            )}

            {activeTab === 'sql_ddl' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">PostgreSQL 16 Relational Schema Specification</span>
                    <span className="text-slate-400">3NF Normalized with UUID v4, Foreign Keys & Cascading Integrity</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 font-mono border border-cyan-800">
                    ACID Compliant
                  </span>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#090D16] shadow-xl">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400">
                    <span className="text-cyan-400">schema_ddl.sql</span>
                    <button
                      onClick={() => {
                        if (!document.isUnlocked) {
                          onOpenPaywall();
                          return;
                        }
                        navigator.clipboard.writeText(extractSql(document.markdown));
                        showNotice('SQL DDL copied to clipboard.');
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy SQL</span>
                    </button>
                  </div>
                  <pre className="p-4 font-mono text-xs text-cyan-200/90 overflow-x-auto leading-relaxed max-h-[600px] overflow-y-auto">
                    <code>{extractSql(document.markdown)}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </main>
  );
};
