import { IEEEDocumentObject } from '../types';

/**
 * Escapes special LaTeX characters in ordinary text strings.
 * Leaves text safe for compilation with pdflatex / xelatex.
 */
export function escapeLatex(text: string | undefined | null): string {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/[{}]/g, (match) => `\\${match}`)
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
}

/**
 * Converts a structured IEEEDocumentObject into clean, production-grade
 * \documentclass{article} IEEE LaTeX markup.
 */
export function convertIEEEDocumentToLaTeX(doc: IEEEDocumentObject): string {
  const safeTitle = escapeLatex(doc.documentTitle);
  const safeSubtitle = escapeLatex(doc.subtitle);
  const safeAuthors = doc.authors.map(a => escapeLatex(a)).join(' \\quad ');
  const safeSupervisor = escapeLatex(doc.supervisor);
  const safeStandard = escapeLatex(doc.academicStandard);
  const safeDegree = escapeLatex(doc.degreeProgram);
  const safeMode = escapeLatex(doc.documentMode);
  const safeAbstract = escapeLatex(doc.abstract);
  const safeKeywords = doc.keywords.map(k => escapeLatex(k)).join(', ');

  const intro = doc.page1.sectionI_Introduction;
  const baseline = doc.page1.sectionII_BaselineComparison;
  const reqs = doc.page1.sectionIII_SystemRequirements;
  const arch = doc.page2.sectionIV_ArchitectureAndDataFlow;
  const risks = doc.page2.sectionV_RiskMitigationMatrix;
  const sdg = doc.page2.sectionVI_EthicalAndSDGAlignment;
  const conclusion = doc.page2.sectionVII_ConclusionAndTimeline;
  const defenseQuestions = doc.defenseQuestions || [];

  return `% ==============================================================================
% ThesisCraft OS - Automated IEEE-Compliant Specification
% Document Type: ${doc.documentMode} (IEEE-830 / IEEE-1016 / HEC-OBE Standard)
% Generated At: ${new Date().toISOString()}
% Standard Compilation: pdflatex <filename>.tex (2 passes for references & tables)
% ==============================================================================

\\documentclass[10pt,twocolumn,a4paper]{article}

% --- Essential IEEE Typesetting Packages ---
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{amsmath,amssymb,amsfonts}
\\usepackage{algorithmic}
\\usepackage{graphicx}
\\usepackage{textcomp}
\\usepackage{xcolor}
\\usepackage{booktabs}
\\usepackage{tabularx}
\\usepackage{listings}
\\usepackage{microtype}
\\usepackage{hyperref}

% --- Hyperlink & Metadata Configuration ---
\\hypersetup{
    colorlinks=true,
    linkcolor=black,
    anchorcolor=black,
    citecolor=black,
    filecolor=black,
    menucolor=black,
    runcolor=black,
    urlcolor=blue,
    pdftitle={${safeTitle}},
    pdfauthor={${safeAuthors}}
}

% --- Code Listing Setup for SQL DDL & Schemas ---
\\lstset{
    basicstyle=\\ttfamily\\scriptsize,
    breaklines=true,
    breakatwhitespace=true,
    frame=single,
    captionpos=b,
    backgroundcolor=\\color{gray!8},
    keywordstyle=\\color{blue!80!black}\\bfseries,
    commentstyle=\\color{gray!70!black}\\itshape,
    stringstyle=\\color{teal!80!black},
    numbers=left,
    numberstyle=\\tiny\\color{gray},
    stepnumber=1,
    numbersep=6pt,
    tabsize=2,
    showstringspaces=false
}

% --- Title and Metadata Configuration ---
\\title{\\Large\\textbf{${safeTitle}}\\\\[0.3em]\\large\\textit{${safeSubtitle}}}

\\author{
  \\textbf{${safeAuthors}} \\\\[0.2em]
  \\small Department of Computer Science \\& Software Engineering \\\\[0.1em]
  \\small \\textit{Academic Supervisor:} ${safeSupervisor} \\\\[0.1em]
  \\small Standard: ${safeStandard} \\quad \\textbar \\quad Track: ${safeDegree} (${safeMode})
}

\\date{\\today}

\\begin{document}

\\maketitle

% ==============================================================================
% ABSTRACT & KEYWORDS
% ==============================================================================
\\begin{abstract}
\\noindent ${safeAbstract}
\\end{abstract}

\\vspace{0.5em}
\\noindent\\textbf{\\textit{Keywords}}---${safeKeywords}

% ==============================================================================
% SECTION I: INTRODUCTION & PROBLEM HORIZON
% ==============================================================================
\\section{${escapeLatex(intro.title)}}
\\label{sec:introduction}

\\noindent ${escapeLatex(intro.problemHorizon)}

\\subsection{System Purpose and Boundaries}
\\noindent ${escapeLatex(intro.purpose)}

\\subsection{Operational Scope}
\\noindent ${escapeLatex(intro.scope)}

% ==============================================================================
% SECTION II: PRIOR ART & SOTA BASELINE COMPARISON
% ==============================================================================
\\section{${escapeLatex(baseline.title)}}
\\label{sec:baseline}

\\noindent ${escapeLatex(baseline.summary)}

\\begin{table*}[t]
\\centering
\\small
\\caption{Comparative State-of-the-Art (SOTA) Baseline \\& Benchmark Evaluation}
\\label{tab:sota_baseline}
\\begin{tabularx}{\\textwidth}{lXXX}
\\toprule
\\textbf{Evaluation Metric} & \\textbf{Commercial Baseline} & \\textbf{SOTA Open-Source} & \\textbf{Proposed System} \\\\
\\midrule
${baseline.comparisonTable.map(row => 
  `\\textbf{${escapeLatex(row.metric)}} & ${escapeLatex(row.commercialBaseline)} & ${escapeLatex(row.sotaOpenSource)} & \\textbf{${escapeLatex(row.proposedSystem)}} \\\\`
).join('\n')}
\\bottomrule
\\end{tabularx}
\\end{table*}

% ==============================================================================
% SECTION III: SYSTEM REQUIREMENTS (RFC 2119 COMPLIANT)
% ==============================================================================
\\section{${escapeLatex(reqs.title)}}
\\label{sec:requirements}

\\noindent The functional requirements adhere strictly to RFC 2119 normative constraints (\\textbf{SHALL}, \\textbf{SHOULD}, \\textbf{MUST}):

\\begin{itemize}
${reqs.functionalRequirements.map(f => 
  `  \\item \\textbf{[${escapeLatex(f.id)}]} \\textbf{${escapeLatex(f.name)}} (\\textit{Priority: ${escapeLatex(f.priority)}}): The system \\textbf{${f.rfc2119}} ${escapeLatex(f.description)}`
).join('\n')}
\\end{itemize}

\\subsection{System Boundary Specification}
\\noindent\\textbf{In-Scope Components:} ${escapeLatex(reqs.systemBoundaries.inScope.join(', '))}\\\\[0.3em]
\\noindent\\textbf{Out-of-Scope Constraints:} ${escapeLatex(reqs.systemBoundaries.outOfScope.join(', '))}

% ==============================================================================
% SECTION IV: ARCHITECTURE, TOPOLOGY & DDL SCHEMA
% ==============================================================================
\\section{${escapeLatex(arch.title)}}
\\label{sec:architecture}

\\subsection{Architectural Pattern}
\\noindent ${escapeLatex(arch.architecturePattern)}

\\subsection{Component Topology}
\\noindent ${escapeLatex(arch.componentTopology)}

% Visual Architecture Blueprint Notice
\\begin{figure}[h]
\\centering
\\fbox{\\parbox{0.9\\linewidth}{\\centering\\footnotesize
\\textbf{Visual Architecture Topology (Mermaid.js)}\\\\[0.2em]
\\textit{Rendered dynamically in ThesisCraft OS simulator. See attached blueprint diagram or online interactive preview.}
}}
\\caption{Visual Microservice \\& Compute Topology}
\\label{fig:architecture_topology}
\\end{figure}

\\subsection{Production Database DDL (PostgreSQL 16)}
\\label{subsec:ddl}
\\noindent The formal relational schema definition with transactional constraints and indices is specified below:

\\begin{lstlisting}[language=SQL, caption={Production PostgreSQL 16 DDL Schema}]
${arch.databaseSchemaDDL}
\\end{lstlisting}

% ==============================================================================
% SECTION V: RISK MITIGATION & FAULT TOLERANCE MATRIX
% ==============================================================================
\\section{${escapeLatex(risks.title)}}
\\label{sec:risks}

\\begin{table*}[t]
\\centering
\\small
\\caption{Comprehensive Project Risk Matrix \\& Proactive Mitigation Controls}
\\label{tab:risk_matrix}
\\begin{tabularx}{\\textwidth}{lXccX}
\\toprule
\\textbf{Risk ID} & \\textbf{Description} & \\textbf{Likelihood (1-5)} & \\textbf{Impact (1-5)} & \\textbf{Mitigation Strategy} \\\\
\\midrule
${risks.risks.map(r => 
  `\\textbf{${escapeLatex(r.riskId)}} & ${escapeLatex(r.description)} & ${r.likelihood} & ${r.impact} & ${escapeLatex(r.mitigation)} \\\\`
).join('\n')}
\\bottomrule
\\end{tabularx}
\\end{table*}

% ==============================================================================
% SECTION VI: ETHICAL & UN SUSTAINABLE DEVELOPMENT GOALS (SDG)
% ==============================================================================
\\section{${escapeLatex(sdg.title)}}
\\label{sec:sdg}

\\noindent\\textbf{Target UN SDGs:} ${escapeLatex(sdg.sdgGoals.join('; '))}\\\\[0.3em]
\\noindent\\textbf{Societal and Sustainability Impact:} ${escapeLatex(sdg.societalImpact)}

% ==============================================================================
% SECTION VII: CONCLUSION, DELIVERABLES & READINESS
% ==============================================================================
\\section{${escapeLatex(conclusion.title)}}
\\label{sec:conclusion}

\\subsection{Defense Readiness Assessment}
\\noindent ${escapeLatex(conclusion.defenseReadiness)}

\\subsection{Milestone Deliverables}
\\begin{itemize}
${conclusion.deliverables.map(d => `  \\item ${escapeLatex(d)}`).join('\n')}
\\end{itemize}

% ==============================================================================
% SECTION VIII: DEFENSE PREP & VIVA SIMULATOR (SUPERVISOR INTERROGATION)
% ==============================================================================
\\section*{Defense Prep \\& Viva Simulator (Supervisor Interrogation)}
\\addcontentsline{toc}{section}{Defense Prep \\& Viva Simulator}
\\label{sec:viva}

\\noindent This section models five rigorous supervisor interrogation scenarios targeting technology stack trade-offs, baseline benchmarking rigor, and edge-failure modes:

${defenseQuestions.map((q, idx) => `
\\paragraph{Viva Trap ${idx + 1} [${escapeLatex(q.focusArea)} --- ${escapeLatex(q.difficulty)} Level]}
\\noindent\\textbf{Supervisor Interrogation:} \\textit{\\textquotedblleft ${escapeLatex(q.question)}\\textquotedblright}\\\\[0.2em]
\\noindent\\textbf{Examiner Focus \\& Trap:} ${escapeLatex(q.defenseStrategy)}\\\\[0.2em]
\\noindent\\textbf{Model Defense Strategy:} ${escapeLatex(q.modelAnswerGuideline)}
`).join('\n')}



% ==============================================================================
% REFERENCES
% ==============================================================================
\\begin{thebibliography}{00}
${doc.page2.references.map((ref, idx) => `\\bibitem{ref${idx + 1}} ${escapeLatex(ref)}`).join('\n')}
\\end{thebibliography}

\\end{document}
`;
}

/**
 * Initiates browser download of the generated .tex document.
 */
export function downloadLatexDocument(doc: IEEEDocumentObject): void {
  const latexContent = convertIEEEDocumentToLaTeX(doc);
  const blob = new Blob([latexContent], { type: 'text/x-tex;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.href = url;
  const sanitizedTitle = doc.documentTitle.slice(0, 25).replace(/[^a-zA-Z0-9]/g, '_');
  a.download = `${sanitizedTitle}_IEEE.tex`;
  a.click();
  URL.revokeObjectURL(url);
}
