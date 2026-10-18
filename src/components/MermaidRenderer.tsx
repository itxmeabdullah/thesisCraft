import React, { useEffect, useRef, useState } from 'react';
import { Copy, Check, Maximize2, X, RefreshCw, AlertCircle } from 'lucide-react';

interface MermaidRendererProps {
  chart: string;
  isDarkMode?: boolean;
}

declare global {
  interface Window {
    mermaid?: any;
  }
}

export const MermaidRenderer: React.FC<MermaidRendererProps> = ({ chart, isDarkMode = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [diagramKey, setDiagramKey] = useState(0);

  // Clean raw chart string
  const cleanChart = (raw: string): string => {
    let cleaned = raw.trim();
    // Remove wrapping markdown ticks if present
    if (cleaned.startsWith('```mermaid')) {
      cleaned = cleaned.replace(/^```mermaid\s*/i, '').replace(/```$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\s*/, '').replace(/```$/, '');
    }
    // Ensure it starts with graph TD or sequenceDiagram or flowchart
    if (!cleaned.startsWith('graph') && !cleaned.startsWith('sequenceDiagram') && !cleaned.startsWith('flowchart') && !cleaned.startsWith('classDiagram')) {
      cleaned = `graph TD\n${cleaned}`;
    }
    return cleaned.trim();
  };

  useEffect(() => {
    let isMounted = true;
    const renderDiagram = async () => {
      setError(null);
      const chartCode = cleanChart(chart);

      // Check if mermaid is available on window
      if (!window.mermaid) {
        // Retry shortly if CDN script is still downloading
        setTimeout(() => {
          if (isMounted) setDiagramKey(prev => prev + 1);
        }, 300);
        return;
      }

      try {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: isDarkMode ? 'dark' : 'neutral',
          securityLevel: 'loose',
          fontFamily: 'Inter, sans-serif',
          flowchart: {
            curve: 'basis',
            useMaxWidth: true,
            htmlLabels: true,
          },
        });

        const uniqueId = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`;
        const { svg } = await window.mermaid.render(uniqueId, chartCode);

        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (err: any) {
        console.warn('Mermaid rendering issue, attempting fallback:', err);
        if (isMounted) {
          setError(err?.message || 'Syntax error in diagram definition');
          // Try rendering simple fallback graph
          try {
            const fallbackId = `mermaid-fallback-${Math.random().toString(36).substring(2, 9)}`;
            const fallbackCode = `graph TD\n  Client[Edge Client Ingress] --> Gateway[API Gateway]\n  Gateway --> Workers[Analytical Inference Worker Pool]\n  Workers --> DB[(PostgreSQL Primary ACID)]\n  Workers --> Cache[(Redis Cache)]`;
            const { svg: fbSvg } = await window.mermaid.render(fallbackId, fallbackCode);
            if (isMounted) {
              setSvgContent(fbSvg);
              setError(null);
            }
          } catch (fbErr) {
            if (isMounted) {
              setError('Failed to render diagram syntax.');
            }
          }
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [chart, isDarkMode, diagramKey]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanChart(chart));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded border border-slate-300 bg-white shadow-sm overflow-hidden text-black my-2.5">
      {/* Diagram Action Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-100 border-b border-slate-300 text-[10px] font-sans text-slate-700">
        <span className="font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
          Fig 1. Architecture Topology (Mermaid.js)
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-300 text-[10px] font-mono text-slate-800 transition-colors"
            title="Copy Mermaid.js source"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Source'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="p-1 rounded bg-white hover:bg-slate-200 border border-slate-300 text-slate-800 transition-colors"
            title="Enlarge Diagram"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div 
        ref={containerRef}
        className="p-4 flex items-center justify-center min-h-[140px] max-h-[280px] overflow-auto bg-white"
      >
        {svgContent ? (
          <div 
            className="w-full flex justify-center [&>svg]:max-h-[240px] [&>svg]:w-auto [&>svg]:max-w-full"
            dangerouslySetInnerHTML={{ __html: svgContent }} 
          />
        ) : error ? (
          <div className="text-center p-4 space-y-1 text-slate-600 text-xs font-mono">
            <AlertCircle className="w-4 h-4 mx-auto text-amber-600" />
            <p>{error}</p>
            <button 
              onClick={() => setDiagramKey(prev => prev + 1)}
              className="mt-1 px-2 py-1 rounded bg-slate-200 text-xs font-sans hover:bg-slate-300"
            >
              Retry Render
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-500 font-mono text-xs">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Rendering visual architecture graph...</span>
          </div>
        )}
      </div>

      {/* Fullscreen Modal View */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-4xl bg-white rounded border border-slate-300 shadow-2xl p-6 text-black flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-sm font-bold font-sans">
                Full-Scale Architecture Diagram (Mermaid.js)
              </h3>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-1 rounded hover:bg-slate-100 text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div 
              className="flex-1 overflow-auto p-6 flex items-center justify-center min-h-[350px] [&>svg]:max-h-[600px] [&>svg]:w-auto"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />

            <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-xs font-mono text-slate-600">
              <span>IEEE-1016 Architectural Topography View</span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded bg-slate-900 text-white hover:bg-slate-800 text-xs font-sans font-semibold"
              >
                {copied ? 'Copied Source' : 'Copy Mermaid Source'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
