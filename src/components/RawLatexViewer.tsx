import React, { useState, useMemo } from 'react';
import { 
  Copy, Check, Download, FileCode, Terminal, 
  ExternalLink, Sparkles, CheckCircle2, ShieldCheck, FileText 
} from 'lucide-react';
import { IEEEDocumentObject } from '../types';
import { convertIEEEDocumentToLaTeX, downloadLatexDocument } from '../utils/latexGenerator';

interface RawLatexViewerProps {
  document: IEEEDocumentObject;
  onOpenPaymentModal?: () => void;
}

export const RawLatexViewer: React.FC<RawLatexViewerProps> = ({
  document,
  onOpenPaymentModal,
}) => {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const latexCode = useMemo(() => {
    return convertIEEEDocumentToLaTeX(document);
  }, [document]);

  const lines = useMemo(() => {
    return latexCode.split('\n');
  }, [latexCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(latexCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownload = () => {
    downloadLatexDocument(document);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#0E0E0E] text-slate-200">
      
      {/* Top Banner & Control Bar */}
      <div className="border-b border-[#2D2D2D] bg-[#141414] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-[#333333] bg-[#1E1E1E] flex items-center justify-center text-white">
            <FileCode className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono font-bold text-white tracking-tight">
                Raw LaTeX (.tex) Source
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 font-semibold">
                \documentclass&#123;article&#125;
              </span>
              <span className="hidden sm:inline text-[10px] font-mono px-2 py-0.5 rounded border border-[#333333] bg-[#1C1C1C] text-[#999999]">
                IEEE Compliant
              </span>
            </div>
            <p className="text-[11px] text-[#8C8C8C] font-mono mt-0.5">
              Production markup ready for Overleaf, TeX Live, or MiKTeX compilation
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Quick Copy */}
          <button
            type="button"
            onClick={handleCopy}
            className="h-8 px-3 rounded border border-[#333333] bg-[#1E1E1E] hover:bg-[#282828] text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            title="Copy entire LaTeX markup to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied .tex!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#B3B3B3]" />
                <span>Copy .tex</span>
              </>
            )}
          </button>

          {/* Download .tex */}
          <button
            type="button"
            onClick={handleDownload}
            className="h-8 px-3.5 rounded bg-white text-black hover:bg-[#E5E5E5] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            title="Download .tex source file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .tex</span>
          </button>
        </div>
      </div>

      {/* Compiler Specs & Quick Guide Sub-header */}
      <div className="bg-[#111111] border-b border-[#222222] px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3 text-[11px] text-[#8C8C8C]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Lines: <strong className="text-white">{lines.length}</strong>
          </span>
          <span className="text-[#333333]">•</span>
          <span>
            Chars: <strong className="text-white">{latexCode.length.toLocaleString()}</strong>
          </span>
          <span className="text-[#333333] hidden sm:inline">•</span>
          <span className="hidden sm:inline">
            Class: <code className="text-amber-300">article (twocolumn, a4paper)</code>
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#8C8C8C]">
          <span className="text-[#777777] hidden md:inline">Compile command:</span>
          <code className="px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2D2D2D] text-emerald-400 text-[10px]">
            pdflatex {document.documentTitle.slice(0, 15).replace(/[^a-zA-Z0-9]/g, '_')}_IEEE.tex
          </code>
        </div>
      </div>

      {/* Code Editor / Viewer Viewport */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] overflow-hidden shadow-2xl">
          
          {/* Editor Header Bar */}
          <div className="h-9 bg-[#161616] border-b border-[#262626] px-4 flex items-center justify-between text-xs font-mono text-[#8C8C8C]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              <span className="ml-2 text-white font-medium">
                {document.documentTitle.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}_IEEE.tex
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[#666666] hidden sm:inline">UTF-8 • LaTeX 2e</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] text-white hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Code Body with Line Numbers */}
          <div className="overflow-x-auto p-4 font-mono text-[11.5px] leading-relaxed selection:bg-emerald-900 selection:text-white">
            <pre className="text-slate-300">
              {lines.map((line, idx) => {
                const lineNum = idx + 1;
                const isComment = line.trim().startsWith('%');
                const isCommand = line.trim().startsWith('\\');
                const isSection = line.includes('\\section') || line.includes('\\subsection') || line.includes('\\paragraph');
                const isEnv = line.includes('\\begin{') || line.includes('\\end{');

                let lineClass = 'text-slate-300';
                if (isComment) lineClass = 'text-slate-500 italic';
                else if (isSection) lineClass = 'text-amber-300 font-bold';
                else if (isEnv) lineClass = 'text-cyan-400 font-semibold';
                else if (isCommand) lineClass = 'text-blue-300';

                return (
                  <div key={lineNum} className="flex hover:bg-[#141414] py-0.5 rounded px-1 transition-colors">
                    <span className="w-12 shrink-0 select-none text-right pr-4 text-[#444444] font-mono text-[10px] select-none">
                      {lineNum}
                    </span>
                    <span className={`flex-1 whitespace-pre-wrap break-all ${lineClass}`}>
                      {line}
                    </span>
                  </div>
                );
              })}
            </pre>
          </div>
        </div>

        {/* Feature Highlights & Overleaf Instructions */}
        <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded border border-[#222222] bg-[#121212] space-y-1.5">
            <div className="flex items-center gap-2 text-white font-mono text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Two-Column IEEE Article</span>
            </div>
            <p className="text-[11px] text-[#8C8C8C] leading-normal font-sans">
              Formally structured with <code className="text-white">\documentclass[10pt,twocolumn,a4paper]&#123;article&#125;</code>, tabularx environments, and IEEE headings.
            </p>
          </div>

          <div className="p-4 rounded border border-[#222222] bg-[#121212] space-y-1.5">
            <div className="flex items-center gap-2 text-white font-mono text-xs font-bold">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>Full Listings & DDL</span>
            </div>
            <p className="text-[11px] text-[#8C8C8C] leading-normal font-sans">
              Includes pre-configured <code className="text-white">\begin&#123;lstlisting&#125;</code> blocks containing production PostgreSQL 16 schema definitions and DDL triggers.
            </p>
          </div>

          <div className="p-4 rounded border border-[#222222] bg-[#121212] space-y-1.5">
            <div className="flex items-center gap-2 text-white font-mono text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Viva Interrogation Embedded</span>
            </div>
            <p className="text-[11px] text-[#8C8C8C] leading-normal font-sans">
              Contains all 5 supervisor trap scenarios, tech stack justifications, and defense models ready for academic viva defense.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
