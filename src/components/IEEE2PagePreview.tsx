import React, { useState } from 'react';
import { 
  FileText, Download, Lock, Check, Copy, 
  ZoomIn, ZoomOut, Sparkles, Shield, ArrowUpRight, HelpCircle, FileCode 
} from 'lucide-react';
import { IEEEDocumentObject } from '../types';
import { generateIEEEDocumentPDF } from '../utils/pdfGenerator';
import { convertIEEEDocumentToMarkdown } from '../utils/ieeeJsonGenerator';
import { downloadLatexDocument } from '../utils/latexGenerator';
import { MermaidRenderer } from './MermaidRenderer';
import { DefensePrepCard } from './DefensePrepCard';
import { RawLatexViewer } from './RawLatexViewer';

interface IEEE2PagePreviewProps {
  document: IEEEDocumentObject;
  onOpenPaymentModal: () => void;
  onOpenWizard: () => void;
}

export const IEEE2PagePreview: React.FC<IEEE2PagePreviewProps> = ({
  document,
  onOpenPaymentModal,
  onOpenWizard,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'latex'>('preview');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [copiedMd, setCopiedMd] = useState(false);

  const handleDownloadPage1 = () => {
    generateIEEEDocumentPDF(document, true);
  };

  const handleDownloadFullPDF = () => {
    if (!document.isUnlocked) {
      onOpenPaymentModal();
      return;
    }
    generateIEEEDocumentPDF(document, false);
  };

  const handleCopyOrExportMarkdown = () => {
    if (!document.isUnlocked) {
      onOpenPaymentModal();
      return;
    }
    const md = convertIEEEDocumentToMarkdown(document);
    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleDownloadMarkdownFile = () => {
    if (!document.isUnlocked) {
      onOpenPaymentModal();
      return;
    }
    const md = convertIEEEDocumentToMarkdown(document);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${document.documentTitle.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '_')}_IEEE.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#0E0E0E] overflow-y-auto">
      
      {/* Top Document Engine Controls */}
      <div className="sticky top-0 z-20 h-14 border-b border-[#2D2D2D] bg-[#141414] px-4 sm:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              IEEE Document Simulator
            </span>
          </div>

          {/* Output Pane Tabs: 2-Page Preview & Raw LaTeX (.tex) */}
          <div className="flex items-center rounded border border-[#333333] bg-[#181818] p-0.5" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'preview'}
              onClick={() => setActiveTab('preview')}
              className={`h-7 px-2.5 rounded text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-[#8C8C8C] hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>2-Page Preview</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'latex'}
              onClick={() => setActiveTab('latex')}
              className={`h-7 px-2.5 rounded text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'latex'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-[#8C8C8C] hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Raw LaTeX (.tex)</span>
            </button>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-mono text-[#8C8C8C] pl-2 border-l border-[#262626]">
            <span>Compliance:</span>
            <span className="text-white font-bold">{document.rubricScorecard.overallScore}%</span>
          </div>
        </div>

        {/* Toolbar buttons */}
        <div className="flex items-center gap-2">
          {activeTab === 'latex' ? (
            <>
              {/* Quick download .tex from toolbar */}
              <button
                type="button"
                onClick={() => downloadLatexDocument(document)}
                className="h-8 px-2.5 rounded border border-[#333333] bg-[#1E1E1E] hover:bg-[#262626] text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="Download Clean .tex File"
              >
                <Download className="w-3.5 h-3.5 text-[#B3B3B3]" />
                <span className="hidden sm:inline">Download .tex</span>
              </button>

              {/* Full PDF Export (Locked/Unlocked) */}
              <button
                type="button"
                onClick={handleDownloadFullPDF}
                className={`h-8 px-3 rounded text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors ${
                  document.isUnlocked
                    ? 'bg-white text-black hover:bg-[#E5E5E5]'
                    : 'border border-[#444444] bg-[#242424] text-white hover:border-white'
                }`}
              >
                {document.isUnlocked ? (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Full 2-Page PDF</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Unlock Full PDF</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              {/* Zoom controls */}
              <div className="hidden lg:flex items-center border border-[#2D2D2D] rounded bg-[#1A1A1A] p-0.5">
                <button
                  onClick={() => setZoomLevel(prev => Math.max(75, prev - 15))}
                  className="p-1 text-[#8C8C8C] hover:text-white"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 text-[10px] font-mono text-white">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel(prev => Math.min(125, prev + 15))}
                  className="p-1 text-[#8C8C8C] hover:text-white"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Download Page 1 Free */}
              <button
                type="button"
                onClick={handleDownloadPage1}
                className="h-8 px-2.5 rounded border border-[#333333] bg-[#1E1E1E] hover:bg-[#262626] text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="Download Free 1-Page PDF"
              >
                <Download className="w-3.5 h-3.5 text-[#B3B3B3]" />
                <span className="hidden sm:inline">Page 1 PDF (Free)</span>
              </button>

              {/* Jump to Diagram */}
              <button
                type="button"
                onClick={() => {
                  const el = window.document.getElementById('section-iv-architecture');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="h-8 px-2.5 rounded border border-[#333333] bg-[#1E1E1E] hover:bg-[#262626] text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="Jump to Visual Architecture Topology"
              >
                <Shield className="w-3.5 h-3.5 text-[#CCCCCC]" />
                <span className="hidden md:inline">Diagram</span>
              </button>

              {/* Jump to Defense Prep / Viva Simulator */}
              <button
                type="button"
                onClick={() => {
                  const el = window.document.getElementById('defense-prep-subcard');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="h-8 px-2.5 rounded border border-[#333333] bg-[#1E1E1E] hover:bg-[#262626] text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="Jump to Viva Interrogation Questions"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#CCCCCC]" />
                <span className="hidden lg:inline">Viva Simulator</span>
              </button>

              {/* Full PDF Export (Locked/Unlocked) */}
              <button
                type="button"
                onClick={handleDownloadFullPDF}
                className={`h-8 px-3 rounded text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors ${
                  document.isUnlocked
                    ? 'bg-white text-black hover:bg-[#E5E5E5]'
                    : 'border border-[#444444] bg-[#242424] text-white hover:border-white'
                }`}
              >
                {document.isUnlocked ? (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Full 2-Page PDF</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Unlock Full PDF</span>
                  </>
                )}
              </button>

              {/* Markdown Copy/Export */}
              <button
                type="button"
                onClick={handleCopyOrExportMarkdown}
                className="h-8 px-2.5 rounded border border-[#333333] bg-[#1E1E1E] hover:bg-[#262626] text-white text-xs font-mono flex items-center gap-1 transition-colors"
                title="Copy Raw Markdown"
              >
                {copiedMd ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-[#B3B3B3]" />}
                <span className="hidden md:inline">{copiedMd ? 'Copied' : 'Markdown'}</span>
              </button>
            </>
          )}

          {/* Relaunch Wizard */}
          <button
            type="button"
            onClick={onOpenWizard}
            className="h-8 px-2.5 rounded border border-[#333333] bg-[#1A1A1A] hover:bg-[#222222] text-[#8C8C8C] hover:text-white text-xs font-mono flex items-center gap-1 transition-colors"
            title="Edit Parameters"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Wizard</span>
          </button>
        </div>
      </div>

      {activeTab === 'latex' ? (
        <RawLatexViewer 
          document={document} 
          onOpenPaymentModal={onOpenPaymentModal} 
        />
      ) : (
        /* 2-PAGE DOCUMENT SIMULATOR VIEWPORT */
        <div className="flex-1 p-4 sm:p-8 flex flex-col items-center gap-8 overflow-x-auto">
        
        {/* ================= PAGE 1 (FREE 1-PAGE PREVIEW) ================= */}
        <div 
          className="w-full max-w-[780px] bg-white text-black shadow-2xl p-8 sm:p-12 font-serif text-[12px] leading-snug rounded-sm relative select-text border border-[#D1D5DB]"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {/* Running Header */}
          <div className="border-b border-black pb-1 mb-5 flex justify-between items-center text-[8.5px] font-sans uppercase tracking-widest text-slate-700">
            <span>IEEE Transactions on Software Engineering & Capstone Specifications</span>
            <span>Page 1 of 2</span>
          </div>

          {/* Title & Metadata */}
          <div className="text-center space-y-1 mb-6">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black font-serif">
              {document.documentTitle}
            </h1>
            <p className="text-[11px] italic text-slate-700">
              {document.subtitle}
            </p>
            <div className="text-[9.5px] text-slate-800 pt-1 font-sans">
              <strong>{document.authors.join(', ')}</strong> • Supervisor: {document.supervisor}
            </div>
            <div className="text-[9px] font-sans text-slate-600">
              Department of Computer Science & Software Engineering • Standard: {document.academicStandard}
            </div>
          </div>

          {/* Abstract & Keywords Box */}
          <div className="bg-slate-50 border border-slate-200 p-3.5 mb-5 text-[10px] text-slate-800 leading-normal font-sans">
            <p className="mb-1">
              <strong className="font-bold text-black">Abstract— </strong>
              {document.abstract}
            </p>
            <p className="text-[9px] text-slate-600 italic">
              <strong>Keywords— </strong>{document.keywords.join(', ')}
            </p>
          </div>

          {/* Dual-Column or Strict IEEE Sections */}
          <div className="space-y-4 text-justify font-serif">
            {/* SECTION I */}
            <div>
              <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-0.5 mb-1.5 font-sans">
                I. {document.page1.sectionI_Introduction.title}
              </h2>
              <p className="text-[10px] text-slate-800 leading-relaxed mb-1.5">
                {document.page1.sectionI_Introduction.problemHorizon}
              </p>
              <p className="text-[10px] text-slate-800 leading-relaxed">
                <strong>System Purpose & Boundaries: </strong>{document.page1.sectionI_Introduction.purpose}
              </p>
            </div>

            {/* SECTION II */}
            <div>
              <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-0.5 mb-1.5 font-sans">
                II. {document.page1.sectionII_BaselineComparison.title}
              </h2>
              <p className="text-[10px] text-slate-800 leading-relaxed mb-2 font-sans">
                {document.page1.sectionII_BaselineComparison.summary}
              </p>
              
              {/* SOTA Comparison Table */}
              <div className="overflow-x-auto border border-slate-300 my-2">
                <table className="w-full text-left text-[9px] font-sans border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-800">
                      <th className="p-1.5 border-r border-slate-300">Metric</th>
                      <th className="p-1.5 border-r border-slate-300">Commercial Baseline</th>
                      <th className="p-1.5 border-r border-slate-300">SOTA Open-Source</th>
                      <th className="p-1.5 bg-blue-50 font-bold text-blue-950">Proposed System</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {document.page1.sectionII_BaselineComparison.comparisonTable.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-1.5 border-r border-slate-200 font-medium">{row.metric}</td>
                        <td className="p-1.5 border-r border-slate-200">{row.commercialBaseline}</td>
                        <td className="p-1.5 border-r border-slate-200">{row.sotaOpenSource}</td>
                        <td className="p-1.5 font-bold text-blue-900 bg-blue-50/50">{row.proposedSystem}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION III */}
            <div>
              <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-0.5 mb-1.5 font-sans">
                III. {document.page1.sectionIII_SystemRequirements.title}
              </h2>
              <div className="space-y-1.5 font-sans text-[9.5px]">
                {document.page1.sectionIII_SystemRequirements.functionalRequirements.map((req) => (
                  <div key={req.id} className="flex items-start gap-1 text-slate-800">
                    <span className="font-mono font-bold text-black shrink-0">[{req.id}]</span>
                    <span>
                      <strong>{req.name}</strong> ({req.priority}): The system <strong className="underline text-black font-mono">{req.rfc2119}</strong> {req.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Page 1 Footer */}
          <div className="mt-8 pt-2 border-t border-slate-200 flex justify-between text-[8px] font-sans text-slate-500">
            <span>ThesisCraft OS • Free Academic Document Preview</span>
            <span>1 of 2</span>
          </div>

          {/* Badge */}
          <div className="absolute top-4 right-4 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono text-[9px] font-bold">
            PAGE 1: FREE PREVIEW
          </div>
        </div>

        {/* ================= PAGE 2 (LOCKED PREVIEW) ================= */}
        <div 
          className="w-full max-w-[780px] bg-white text-black shadow-2xl p-8 sm:p-12 font-serif text-[12px] leading-snug rounded-sm relative border border-[#D1D5DB]"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {/* Running Header */}
          <div className="border-b border-black pb-1 mb-5 flex justify-between items-center text-[8.5px] font-sans uppercase tracking-widest text-slate-700">
            <span>IEEE Transactions on Software Engineering & Capstone Specifications</span>
            <span>Page 2 of 2</span>
          </div>

          {/* Content Underneath (Blurred if locked) */}
          <div className={`space-y-4 text-justify font-serif ${!document.isUnlocked ? 'filter blur-[3.5px] select-none pointer-events-none' : ''}`}>
            
            {/* SECTION IV: ARCHITECTURE, VISUAL TOPOLOGY & DDL */}
            <div id="section-iv-architecture">
              <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-0.5 mb-1.5 font-sans">
                IV. {document.page2.sectionIV_ArchitectureAndDataFlow.title}
              </h2>
              <p className="text-[10px] text-slate-800 mb-1 font-sans">
                <strong>Architectural Pattern: </strong>{document.page2.sectionIV_ArchitectureAndDataFlow.architecturePattern}
              </p>
              <p className="text-[9.5px] text-slate-700 mb-2 font-sans">
                {document.page2.sectionIV_ArchitectureAndDataFlow.componentTopology}
              </p>

              {/* LIVE MERMAID.JS VISUAL ARCHITECTURE DIAGRAM */}
              <div className="my-2">
                <MermaidRenderer 
                  chart={document.page2.sectionIV_ArchitectureAndDataFlow.mermaidDiagram || 'graph TD\n  Client[Client Layer] --> Gateway[API Gateway]\n  Gateway --> Workers[Compute Workers]\n  Workers --> DB[(PostgreSQL)]'}
                />
              </div>

              {/* Production Database Schema */}
              <div className="bg-slate-900 text-slate-200 p-2.5 rounded font-mono text-[8px] overflow-x-auto leading-relaxed mb-2">
                <div className="text-[7.5px] font-sans text-slate-400 mb-1 font-bold uppercase tracking-wider">
                  PostgreSQL 16 Production DDL
                </div>
                <pre>{document.page2.sectionIV_ArchitectureAndDataFlow.databaseSchemaDDL}</pre>
              </div>
            </div>

            {/* SECTION V */}
            <div>
              <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-0.5 mb-1.5 font-sans">
                V. {document.page2.sectionV_RiskMitigationMatrix.title}
              </h2>
              <div className="border border-slate-300 font-sans text-[8.5px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-800">
                      <th className="p-1 border-r border-slate-300">Risk ID</th>
                      <th className="p-1 border-r border-slate-300">Description</th>
                      <th className="p-1 border-r border-slate-300">Likelihood</th>
                      <th className="p-1 border-r border-slate-300">Impact</th>
                      <th className="p-1">Mitigation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {document.page2.sectionV_RiskMitigationMatrix.risks.map((r) => (
                      <tr key={r.riskId}>
                        <td className="p-1 font-bold border-r border-slate-200">{r.riskId}</td>
                        <td className="p-1 border-r border-slate-200">{r.description}</td>
                        <td className="p-1 border-r border-slate-200">{r.likelihood}/5</td>
                        <td className="p-1 border-r border-slate-200">{r.impact}/5</td>
                        <td className="p-1">{r.mitigation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION VI */}
            <div>
              <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-0.5 mb-1.5 font-sans">
                VI. {document.page2.sectionVI_EthicalAndSDGAlignment.title}
              </h2>
              <p className="text-[10px] text-slate-800 font-sans">
                {document.page2.sectionVI_EthicalAndSDGAlignment.societalImpact}
              </p>
            </div>

            {/* SECTION VII & REFERENCES */}
            <div>
              <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-0.5 mb-1 font-sans">
                VII. {document.page2.sectionVII_ConclusionAndTimeline.title}
              </h2>
              <p className="text-[9.5px] text-slate-800 font-sans mb-3">
                {document.page2.sectionVII_ConclusionAndTimeline.defenseReadiness}
              </p>

              <h3 className="text-[10px] font-bold uppercase text-black font-sans mb-1">
                References
              </h3>
              <div className="space-y-0.5 text-[8.5px] text-slate-600 font-sans">
                {document.page2.references.map((ref, idx) => (
                  <div key={idx}>[{idx + 1}] {ref}</div>
                ))}
              </div>
            </div>

          </div>

          {/* LOCKED VISUAL OVERLAY ON PAGE 2 */}
          {!document.isUnlocked && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px] flex flex-col items-center justify-center p-6 text-center select-none z-10">
              <div className="p-6 rounded border border-[#3A3A3A] bg-[#161616] text-white max-w-sm w-full space-y-3.5 shadow-2xl">
                <div className="w-10 h-10 rounded-full border border-white bg-[#222222] flex items-center justify-center mx-auto text-white">
                  <Lock className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-[#999999] block font-bold">
                    PREMIUM ACADEMIC EXPORT
                  </span>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Page 2 & Full Export Locked
                  </h3>
                  <p className="text-[11px] text-[#A0A0A0] leading-relaxed font-sans">
                    Unlock complete 2-page IEEE PDF export, PostgreSQL DDL schemas, Risk Matrix, and editable Markdown source.
                  </p>
                </div>

                <div className="p-2.5 rounded bg-[#1C1C1C] border border-[#2D2D2D] text-xs font-mono flex justify-between items-center">
                  <span className="text-[#8C8C8C]">Single Blueprint Unlock:</span>
                  <span className="text-white font-bold">1,500 PKR / $5.50</span>
                </div>

                <button
                  type="button"
                  onClick={onOpenPaymentModal}
                  className="w-full py-2.5 px-4 rounded bg-white text-black font-bold text-xs hover:bg-[#E5E5E5] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Unlock Complete 2-Page PDF</span>
                </button>
              </div>
            </div>
          )}

          {/* Page 2 Footer */}
          <div className="mt-8 pt-2 border-t border-slate-200 flex justify-between text-[8px] font-sans text-slate-500">
            <span>ThesisCraft OS • Formal IEEE Outcome-Based Specification</span>
            <span>2 of 2</span>
          </div>
        </div>

        {/* DEFENSE PREP / VIVA SIMULATOR SUB-CARD IN LIVE OUTPUT PANEL */}
        <div id="defense-prep-subcard" className="w-full max-w-[780px]">
          <DefensePrepCard questions={document.defenseQuestions} />
        </div>

      </div>
      )}

    </div>
  );
};

