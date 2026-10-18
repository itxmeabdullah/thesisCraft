import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { IEEEDocumentObject } from '../types';

// Initialize pdfMake virtual file system for fonts
try {
  const vfs = 
    (pdfFonts as any)?.pdfMake?.vfs || 
    (pdfFonts as any)?.vfs || 
    (pdfFonts as any)?.default?.pdfMake?.vfs || 
    (pdfFonts as any)?.default?.vfs || 
    (pdfFonts as any)?.default || 
    (pdfFonts as any);
  if (vfs) {
    (pdfMake as any).vfs = vfs;
  }
} catch (e) {
  console.warn('PDFMake vfs font initialization warning:', e);
}

export function generateIEEEDocumentPDF(doc: IEEEDocumentObject, onlyPage1: boolean = false): void {
  try {
    const docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [36, 40, 36, 40], // 0.5 inch margins for IEEE style
      header: (currentPage: number, pageCount: number) => {
        return {
          text: `IEEE TRANSACTIONS ON SOFTWARE ENGINEERING & CAPSTONE SPECIFICATIONS • ${doc.documentMode.toUpperCase()}`,
          alignment: 'center',
          fontSize: 7,
          color: '#555555',
          margin: [0, 15, 0, 0]
        };
      },
      footer: (currentPage: number, pageCount: number) => {
        return {
          columns: [
            { text: `ThesisCraft OS v2.4 • ${doc.academicStandard}`, fontSize: 7, color: '#777777', margin: [36, 0, 0, 0] },
            { text: `Page ${currentPage} of ${onlyPage1 ? 1 : pageCount}`, alignment: 'right', fontSize: 7, color: '#777777', margin: [0, 0, 36, 0] }
          ]
        };
      },
      content: [
        // Title
        { text: doc.documentTitle, fontSize: 16, bold: true, alignment: 'center', margin: [0, 0, 0, 4] },
        { text: doc.subtitle || `A Formally Ratified ${doc.documentMode} Specification`, fontSize: 10, italics: true, alignment: 'center', margin: [0, 0, 0, 8], color: '#333333' },
        
        // Authors & Meta
        {
          text: `${doc.authors.join(', ')} • Supervisor: ${doc.supervisor}`,
          alignment: 'center',
          fontSize: 8.5,
          color: '#444444',
          margin: [0, 0, 0, 4]
        },
        {
          text: `${doc.degreeProgram} • Standard: ${doc.academicStandard}`,
          alignment: 'center',
          fontSize: 8,
          bold: true,
          color: '#222222',
          margin: [0, 0, 0, 12]
        },

        // Abstract & Keywords Box
        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  fillColor: '#F8F9FA',
                  margin: [8, 6, 8, 6],
                  stack: [
                    {
                      text: [
                        { text: 'Abstract— ', bold: true, fontSize: 8.5 },
                        { text: doc.abstract, fontSize: 8.5, italics: false }
                      ],
                      lineHeight: 1.15
                    },
                    {
                      text: [
                        { text: '\nKeywords— ', bold: true, fontSize: 8 },
                        { text: doc.keywords.join(', '), fontSize: 8, italics: true, color: '#444444' }
                      ]
                    }
                  ]
                }
              ]
            ]
          },
          layout: 'noBorders',
          margin: [0, 0, 0, 12]
        },

        // SECTION I: INTRODUCTION & PROBLEM HORIZON
        { text: `I. ${doc.page1.sectionI_Introduction.title.toUpperCase()}`, fontSize: 10, bold: true, margin: [0, 4, 0, 4] },
        { text: doc.page1.sectionI_Introduction.problemHorizon, fontSize: 8.5, margin: [0, 0, 0, 6], lineHeight: 1.15 },
        { text: `System Purpose: ${doc.page1.sectionI_Introduction.purpose}`, fontSize: 8.5, margin: [0, 0, 0, 8], lineHeight: 1.15 },

        // SECTION II: SOTA BASELINE COMPARISON TABLE
        { text: `II. ${doc.page1.sectionII_BaselineComparison.title.toUpperCase()}`, fontSize: 10, bold: true, margin: [0, 6, 0, 4] },
        { text: doc.page1.sectionII_BaselineComparison.summary, fontSize: 8.5, margin: [0, 0, 0, 6] },
        {
          table: {
            headerRows: 1,
            widths: ['25%', '25%', '25%', '25%'],
            body: [
              [
                { text: 'Metric', bold: true, fontSize: 7.5, fillColor: '#EEEEEE' },
                { text: 'Commercial Baseline', bold: true, fontSize: 7.5, fillColor: '#EEEEEE' },
                { text: 'SOTA Open-Source', bold: true, fontSize: 7.5, fillColor: '#EEEEEE' },
                { text: 'Proposed System', bold: true, fontSize: 7.5, fillColor: '#E0F2FE' }
              ],
              ...doc.page1.sectionII_BaselineComparison.comparisonTable.map(row => [
                { text: row.metric, fontSize: 7 },
                { text: row.commercialBaseline, fontSize: 7 },
                { text: row.sotaOpenSource, fontSize: 7 },
                { text: row.proposedSystem, fontSize: 7, bold: true }
              ])
            ]
          },
          margin: [0, 0, 0, 10]
        },

        // SECTION III: SYSTEM REQUIREMENTS & BOUNDARIES
        { text: `III. ${doc.page1.sectionIII_SystemRequirements.title.toUpperCase()}`, fontSize: 10, bold: true, margin: [0, 4, 0, 4] },
        { text: 'Functional Requirements conforming to RFC 2119 keyword semantics:', fontSize: 8, italics: true, margin: [0, 0, 0, 4] },
        ...doc.page1.sectionIII_SystemRequirements.functionalRequirements.map(req => ({
          text: [
            { text: `[${req.id}] `, bold: true, fontSize: 7.5 },
            { text: `${req.name} (${req.priority}) — `, bold: true, fontSize: 7.5 },
            { text: `The system `, fontSize: 7.5 },
            { text: `${req.rfc2119} `, bold: true, fontSize: 7.5 },
            { text: `${req.description}`, fontSize: 7.5 }
          ],
          margin: [0, 1, 0, 2]
        })),

        // If Page 2 is included
        ...(onlyPage1 ? [] : [
          { text: '', pageBreak: 'after' },

          // SECTION IV: ARCHITECTURE & SQL DDL
          { text: `IV. ${doc.page2.sectionIV_ArchitectureAndDataFlow.title.toUpperCase()}`, fontSize: 10, bold: true, margin: [0, 4, 0, 4] },
          { text: `Architectural Pattern: ${doc.page2.sectionIV_ArchitectureAndDataFlow.architecturePattern}`, fontSize: 8.5, bold: true, margin: [0, 0, 0, 4] },
          { text: doc.page2.sectionIV_ArchitectureAndDataFlow.componentTopology, fontSize: 8, margin: [0, 0, 0, 6] },
          {
            table: {
              widths: ['*'],
              body: [
                [
                  {
                    fillColor: '#1E1E1E',
                    margin: [6, 6, 6, 6],
                    stack: [
                      { text: '-- PRODUCTION SQL DDL SPECIFICATION (PostgreSQL 16)', fontSize: 7, color: '#A5B4FC', bold: true },
                      { text: doc.page2.sectionIV_ArchitectureAndDataFlow.databaseSchemaDDL, fontSize: 6.5, color: '#E0E7FF' }
                    ]
                  }
                ]
              ]
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 8]
          },

          // SECTION V: RISK PRIORITIZATION MATRIX
          { text: `V. ${doc.page2.sectionV_RiskMitigationMatrix.title.toUpperCase()}`, fontSize: 10, bold: true, margin: [0, 6, 0, 4] },
          {
            table: {
              headerRows: 1,
              widths: ['15%', '35%', '15%', '15%', '20%'],
              body: [
                [
                  { text: 'Risk ID', bold: true, fontSize: 7, fillColor: '#EEEEEE' },
                  { text: 'Description', bold: true, fontSize: 7, fillColor: '#EEEEEE' },
                  { text: 'Likelihood', bold: true, fontSize: 7, fillColor: '#EEEEEE' },
                  { text: 'Impact', bold: true, fontSize: 7, fillColor: '#EEEEEE' },
                  { text: 'Mitigation Plan', bold: true, fontSize: 7, fillColor: '#EEEEEE' }
                ],
                ...doc.page2.sectionV_RiskMitigationMatrix.risks.map(r => [
                  { text: r.riskId, fontSize: 6.5, bold: true },
                  { text: r.description, fontSize: 6.5 },
                  { text: `${r.likelihood}/5`, fontSize: 6.5 },
                  { text: `${r.impact}/5`, fontSize: 6.5 },
                  { text: r.mitigation, fontSize: 6.5 }
                ])
              ]
            },
            margin: [0, 0, 0, 8]
          },

          // SECTION VI: ETHICAL & SDG ALIGNMENT
          { text: `VI. ${doc.page2.sectionVI_EthicalAndSDGAlignment.title.toUpperCase()}`, fontSize: 10, bold: true, margin: [0, 6, 0, 4] },
          { text: `Target UN SDGs: ${doc.page2.sectionVI_EthicalAndSDGAlignment.sdgGoals.join(' • ')}`, fontSize: 8, bold: true, color: '#166534', margin: [0, 0, 0, 3] },
          { text: doc.page2.sectionVI_EthicalAndSDGAlignment.societalImpact, fontSize: 8, margin: [0, 0, 0, 8] },

          // SECTION VII: CONCLUSION & TIMELINE
          { text: `VII. ${doc.page2.sectionVII_ConclusionAndTimeline.title.toUpperCase()}`, fontSize: 10, bold: true, margin: [0, 4, 0, 4] },
          { text: `Defense Readiness Assessment: ${doc.page2.sectionVII_ConclusionAndTimeline.defenseReadiness}`, fontSize: 8, italics: true, margin: [0, 0, 0, 4] },
          { text: `Key Milestone Deliverables: ${doc.page2.sectionVII_ConclusionAndTimeline.deliverables.join(' • ')}`, fontSize: 7.5, margin: [0, 0, 0, 8] },

          // REFERENCES
          { text: 'REFERENCES', fontSize: 9, bold: true, margin: [0, 4, 0, 3] },
          ...doc.page2.references.map((ref, i) => ({
            text: `[${i + 1}] ${ref}`,
            fontSize: 6.5,
            color: '#444444',
            margin: [0, 1, 0, 1]
          }))
        ])
      ]
    };

    const fileName = `${doc.documentTitle.slice(0, 25).replace(/[^a-zA-Z0-9]/g, '_')}_${onlyPage1 ? 'Preview_Page1' : 'Complete_IEEE'}.pdf`;
    pdfMake.createPdf(docDefinition).download(fileName);
  } catch (err) {
    console.error('PDF generation error, triggering browser print fallback:', err);
    window.print();
  }
}
