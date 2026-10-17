import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  isLocked?: boolean;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, isLocked = false }) => {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLanguage = '';
  let inTable = false;
  let tableHeader: string[] = [];
  let tableRows: string[][] = [];
  let blockId = 0;

  const flushTable = () => {
    if (inTable && tableHeader.length > 0) {
      const currentBlockId = `table-${blockId++}`;
      elements.push(
        <div key={currentBlockId} className="my-5 overflow-x-auto rounded border border-[#2D2D2D] bg-[#161616]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#2D2D2D] bg-[#1E1E1E] text-white font-mono uppercase tracking-wider text-[11px]">
                {tableHeader.map((header, idx) => (
                  <th key={idx} className="px-3.5 py-2.5 border-r border-[#2D2D2D] last:border-r-0 font-semibold">
                    {header.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {tableRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-[#1C1C1C] transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-3.5 py-2 text-[#CCCCCC] border-r border-[#262626] last:border-r-0 font-mono text-[11px]">
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      inTable = false;
      tableHeader = [];
      tableRows = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        const codeText = codeBuffer.join('\n');
        const codeBlockId = `code-${blockId++}`;
        elements.push(
          <div key={codeBlockId} className="my-5 rounded border border-[#2D2D2D] bg-[#0E0E0E] overflow-hidden">
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#181818] border-b border-[#2D2D2D] text-[11px] text-[#8C8C8C] font-mono">
              <span>{codeLanguage || 'CODE'}</span>
              <button
                onClick={() => handleCopyCode(codeText, codeBlockId)}
                className="flex items-center gap-1 px-2 py-0.5 rounded border border-[#333333] bg-[#222222] hover:bg-[#2C2C2C] text-[#B3B3B3] hover:text-white text-[10px] transition-colors"
              >
                {copiedCodeId === codeBlockId ? (
                  <>
                    <Check className="w-3 h-3 text-white" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3.5 text-xs font-mono text-[#CCCCCC] overflow-x-auto leading-relaxed">
              <code>{codeText}</code>
            </pre>
          </div>
        );
        codeBuffer = [];
        codeLanguage = '';
        inCodeBlock = false;
      } else {
        flushTable();
        inCodeBlock = true;
        codeLanguage = line.replace('```', '').trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Table rows
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const cells = line.trim().slice(1, -1).split('|');
      if (cells.every(c => c.trim().match(/^:?-+:?$/))) {
        continue;
      }
      if (!inTable) {
        inTable = true;
        tableHeader = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else {
      flushTable();
    }

    // Horizontal Rule
    if (line.trim() === '---' || line.trim() === '***') {
      elements.push(<hr key={`hr-${i}`} className="my-6 border-[#2D2D2D]" />);
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={`h1-${i}`} className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-8 mb-4 font-sans">
          {line.replace('# ', '')}
        </h1>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${i}`} className="text-base sm:text-lg font-semibold tracking-tight text-white mt-6 mb-2.5 pb-1 border-b border-[#2D2D2D] font-sans">
          {line.replace('## ', '')}
        </h2>
      );
      continue;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${i}`} className="text-sm font-semibold text-white mt-4 mb-1.5 font-sans">
          {line.replace('### ', '')}
        </h3>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      elements.push(
        <div key={`quote-${i}`} className="my-3 border-l-2 border-[#555555] bg-[#181818] px-3.5 py-2 text-xs text-[#B3B3B3]">
          {line.replace('> ', '')}
        </div>
      );
      continue;
    }

    // List items
    if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(
        <li key={`li-${i}`} className="ml-4 list-disc text-xs text-[#B3B3B3] my-1 leading-relaxed">
          <span dangerouslySetInnerHTML={{ __html: formatInline(line.substring(2)) }} />
        </li>
      );
      continue;
    }

    // Ordered list
    const orderedMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (orderedMatch) {
      elements.push(
        <div key={`ord-${i}`} className="flex items-start gap-2 text-xs text-[#B3B3B3] my-1 leading-relaxed font-sans">
          <span className="font-mono text-[11px] text-white shrink-0 mt-0.5">
            {orderedMatch[1]}.
          </span>
          <span dangerouslySetInnerHTML={{ __html: formatInline(orderedMatch[2]) }} />
        </div>
      );
      continue;
    }

    // Blank line
    if (line.trim() === '') {
      continue;
    }

    // Standard paragraph
    elements.push(
      <p key={`p-${i}`} className="my-2 text-xs text-[#B3B3B3] leading-relaxed font-sans">
        <span dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      </p>
    );
  }

  flushTable();

  return (
    <div className={`prose max-w-none ${isLocked ? 'select-none pointer-events-none' : ''}`}>
      {elements}
    </div>
  );
};

function formatInline(text: string): string {
  let formatted = text;
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
  formatted = formatted.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-[#222222] text-white font-mono text-[11px] border border-[#333333]">$1</code>');
  formatted = formatted.replace(/\*(.*?)\*/g, '<em class="text-[#8C8C8C] italic">$1</em>');
  return formatted;
}
