import React, { useState } from 'react';
import { Copy, Check, Download, FileText, Code2, Lock, Terminal } from 'lucide-react';
import { GeneratedDocument } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';
import { MinimalistPaywall } from './MinimalistPaywall';

interface DocumentEnginePanelProps {
  document: GeneratedDocument | null;
  isGenerating: boolean;
  onVerifyPaywall: () => void;
}

export const DocumentEnginePanel: React.FC<DocumentEnginePanelProps> = ({
  document,
  isGenerating,
  onVerifyPaywall,
}) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'formatted' | 'raw'>('formatted');
  const [showPaywallModal, setShowPaywallModal] = useState(false);

  const handleCopy = () => {
    if (!document) return;
    if (!document.isUnlocked) {
      setShowPaywallModal(true);
      return;
    }
    navigator.clipboard.writeText(document.markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!document) return;
    if (!document.isUnlocked) {
      setShowPaywallModal(true);
      return;
    }
    const blob = new Blob([document.markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${document.title.slice(0, 25).replace(/[^a-zA-Z0-9]/g, '_')}_${document.mode.toUpperCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#121212] overflow-y-auto">
      
      {/* Top Bar for Right Panel */}
      <div className="h-12 border-b border-[#2D2D2D] bg-[#141414] px-5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
            Live Content Engine
          </span>
          {document && (
            <span className="text-[10px] font-mono text-[#707070] border border-[#2D2D2D] px-2 py-0.5 rounded">
              {document.wordCount} words • {document.sectionsCount} sections
            </span>
          )}
        </div>

        {/* View Switches & Action Buttons */}
        {document && (
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-[#2D2D2D] rounded p-0.5 bg-[#1A1A1A]">
              <button
                type="button"
                onClick={() => setViewMode('formatted')}
                className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
                  viewMode === 'formatted'
                    ? 'bg-white text-black font-semibold'
                    : 'text-[#8C8C8C] hover:text-white'
                }`}
              >
                Formatted
              </button>
              <button
                type="button"
                onClick={() => setViewMode('raw')}
                className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
                  viewMode === 'raw'
                    ? 'bg-white text-black font-semibold'
                    : 'text-[#8C8C8C] hover:text-white'
                }`}
              >
                Raw Markdown
              </button>
            </div>

            {/* Copy to Clipboard Button */}
            <button
              type="button"
              onClick={handleCopy}
              className="h-7 px-3 rounded border border-[#333333] bg-[#1E1E1E] text-white hover:bg-[#282828] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#B3B3B3]" />
                  <span>Copy to Clipboard</span>
                </>
              )}
            </button>

            {/* Download Button */}
            <button
              type="button"
              onClick={handleDownload}
              className="h-7 px-2.5 rounded border border-[#333333] bg-[#1E1E1E] text-[#B3B3B3] hover:text-white text-xs font-mono flex items-center gap-1 transition-colors"
              title="Download Markdown file"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Main Content Viewport */}
      <div className="flex-1 p-6 sm:p-10 max-w-4xl w-full mx-auto space-y-6">
        
        {/* Empty State */}
        {!document && !isGenerating && (
          <div className="py-24 text-center space-y-3">
            <div className="w-10 h-10 rounded border border-[#2D2D2D] bg-[#1A1A1A] text-white flex items-center justify-center mx-auto">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-white">
              Document Blueprint Workspace Ready
            </h3>
            <p className="text-xs text-[#707070] max-w-md mx-auto leading-relaxed font-sans">
              Select your academic candidacy level, enter your project title and tech stack, then click "Build Document Blueprint" to generate the rubric-compliant specification.
            </p>
          </div>
        )}

        {/* Loading / Generating State */}
        {isGenerating && (
          <div className="py-20 text-center space-y-4">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="space-y-1">
              <p className="text-xs font-mono text-white">
                Architecting Academic Specification via Gemini Engine...
              </p>
              <p className="text-[11px] font-mono text-[#707070]">
                Formatting IEEE-830 constraints, baseline tables & SQL schemas
              </p>
            </div>
          </div>
        )}

        {/* Generated Document Display */}
        {document && !isGenerating && (
          <div className="relative">
            {viewMode === 'formatted' ? (
              <div className="space-y-4">
                <MarkdownRenderer content={document.markdown} isLocked={!document.isUnlocked} />

                {/* Minimalist Paywall & Visual Overlay on lower sections */}
                {!document.isUnlocked && (
                  <MinimalistPaywall 
                    onVerify={onVerifyPaywall}
                    isUnlocked={document.isUnlocked}
                  />
                )}
              </div>
            ) : (
              <div className="rounded border border-[#2D2D2D] bg-[#0E0E0E] p-4 text-xs font-mono text-[#D4D4D4] leading-relaxed overflow-x-auto max-h-[700px] overflow-y-auto">
                <pre>{document.markdown}</pre>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
