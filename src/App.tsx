import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, FileText, CheckCircle2, 
  ShieldCheck, Database, Award, Lock, BookOpen, 
  Terminal, Sun, Moon, Cpu 
} from 'lucide-react';
import { WizardModal } from './components/WizardModal';
import { IEEE2PagePreview } from './components/IEEE2PagePreview';
import { PaymentModal } from './components/PaymentModal';
import { IEEEDocumentObject, WizardFormData } from './types';
import { createDefaultIEEEDocumentObject } from './utils/ieeeJsonGenerator';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [document, setDocument] = useState<IEEEDocumentObject | null>(null);

  // Default sample for immediate exploration if user wants
  const defaultSampleData: WizardFormData = {
    title: 'EdgeVision-UAV: Autonomous Thermal & Visual Defect Detection for High-Voltage Lines',
    problemStatement: 'Insulator flashovers and structural conductor fatigue cause unpredicted grid blackouts; current manual inspection is hazardous and delayed.',
    domain: 'Artificial Intelligence & Machine Learning',
    coreLanguagesAndFrameworks: 'Python, PyTorch, TensorRT, FastAPI, React, Docker',
    databaseArchitecture: 'PostgreSQL 16 & TimescaleDB',
    targetDeployment: 'Docker Containers on NVIDIA Jetson Edge',
    documentMode: 'SRS',
    universityStandard: 'HEC National Standard (OBE / Washington Accord)',
    degreeProgram: 'BS Computer Science',
    authors: 'M. Abdullah, S. Ahmed',
    supervisor: 'Dr. Tariq Mahmood (Associate Professor)',
    includeSDG: true,
    includeSOTABaseline: true,
    includeRiskMatrix: true,
    includeSQLSchema: true,
  };

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        window.document.documentElement.classList.add('dark');
        window.document.documentElement.classList.remove('light');
      } else {
        window.document.documentElement.classList.remove('dark');
        window.document.documentElement.classList.add('light');
      }
      return next;
    });
  };

  useEffect(() => {
    window.document.documentElement.classList.add('dark');
  }, []);

  // Handler for completing the 5-step modal wizard
  const handleWizardSubmit = async (formData: WizardFormData) => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-ieee-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const ieeeDoc: IEEEDocumentObject = await response.json();
      setDocument(ieeeDoc);
      setIsWizardOpen(false);
    } catch (err) {
      console.warn('API call encountered an issue, generating deterministic IEEE document:', err);
      const fallbackDoc = createDefaultIEEEDocumentObject(formData);
      setDocument(fallbackDoc);
      setIsWizardOpen(false);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUnlockSuccess = () => {
    if (document) {
      setDocument({
        ...document,
        isUnlocked: true,
      });
    }
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-[#B3B3B3] font-sans">
      
      {/* HEADER NAVIGATION */}
      <header className="h-14 border-b border-[#2D2D2D] bg-[#141414] px-4 sm:px-6 flex items-center justify-between gap-4 select-none shrink-0 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded border border-white bg-white text-black flex items-center justify-center font-bold text-xs">
              TC
            </div>
            <span className="font-bold text-white tracking-tight text-sm font-sans">
              ThesisCraft OS
            </span>
            <span className="text-[10px] font-mono text-[#707070] border border-[#2D2D2D] px-1.5 py-0.5 rounded">
              v2.4-IEEE
            </span>
          </div>

          <div className="h-4 w-[1px] bg-[#2D2D2D] hidden sm:block" />

          {/* Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#8C8C8C]">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>IEEE-830 Engine: Ready</span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          {document ? (
            <button
              type="button"
              onClick={() => setIsWizardOpen(true)}
              className="px-3 py-1.5 rounded border border-[#333333] bg-[#1E1E1E] hover:bg-[#282828] text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>New Specification</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsWizardOpen(true)}
              className="px-4 py-1.5 rounded bg-white text-black text-xs font-bold hover:bg-[#E5E5E5] transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>Try Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Theme toggle */}
          <button
            type="button"
            onClick={handleToggleTheme}
            className="h-8 w-8 rounded border border-[#2D2D2D] bg-[#1E1E1E] text-[#B3B3B3] hover:text-white flex items-center justify-center transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* MAIN VIEWPORT: Landing Hero vs 2-Page Document Preview */}
      {!document ? (
        <main className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full px-6 py-12 sm:py-20 text-center space-y-12">
          
          {/* Hero Section */}
          <div className="space-y-5 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#333333] bg-[#1A1A1A] text-xs font-mono text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>IEEE-830 / IEEE-1016 / HEC-OBE Document Architect</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Flawless Capstone & Thesis Specifications in Minutes.
            </h1>

            <p className="text-sm sm:text-base text-[#8C8C8C] leading-relaxed">
              Designed specifically for Computer Science, Software Engineering, and Data Science university students. Click <strong>'Try Now'</strong> to launch the 5-step modal wizard, generate an IEEE-compliant document object via Gemini, and inspect a real-time 2-page PDF preview.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsWizardOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded bg-white text-black font-bold text-sm hover:bg-[#E5E5E5] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>Try Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const sampleDoc = createDefaultIEEEDocumentObject(defaultSampleData);
                  setDocument(sampleDoc);
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded border border-[#333333] bg-[#1E1E1E] text-white hover:bg-[#282828] text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#8C8C8C]" />
                <span>Explore Live Sample Preview</span>
              </button>
            </div>
          </div>

          {/* 3 Core Workflow Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-6 border-t border-[#262626]">
            <div className="p-5 rounded border border-[#262626] bg-[#161616] space-y-2">
              <span className="text-xs font-mono font-bold text-white uppercase block">
                01. 5-Step Guided Wizard
              </span>
              <p className="text-xs text-[#8C8C8C] leading-relaxed">
                Captures your project title, technical problem horizon, frameworks, target deployment, and university standard.
              </p>
            </div>

            <div className="p-5 rounded border border-[#262626] bg-[#161616] space-y-2">
              <span className="text-xs font-mono font-bold text-white uppercase block">
                02. Structured Gemini Output
              </span>
              <p className="text-xs text-[#8C8C8C] leading-relaxed">
                Generates a structured JSON object containing RFC 2119 keywords [SHALL/SHOULD/MUST], SOTA baselines, and PostgreSQL schemas.
              </p>
            </div>

            <div className="p-5 rounded border border-[#262626] bg-[#161616] space-y-2">
              <span className="text-xs font-mono font-bold text-white uppercase block">
                03. Real-Time 2-Page PDF
              </span>
              <p className="text-xs text-[#8C8C8C] leading-relaxed">
                Interactive dual-page A4 simulator with a free 1-page preview and instant PDF export via pdfMake.
              </p>
            </div>
          </div>

        </main>
      ) : (
        /* 2-PAGE REAL-TIME DOCUMENT PREVIEW (FREE PAGE 1 + LOCKED PAGE 2) */
        <IEEE2PagePreview
          document={document}
          onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
          onOpenWizard={() => setIsWizardOpen(true)}
        />
      )}

      {/* 5-STEP MODAL WIZARD */}
      <WizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSubmit={handleWizardSubmit}
        isGenerating={isGenerating}
      />

      {/* PAYMENT MODAL (THE MONETIZATION ENGINE) */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onUnlockSuccess={handleUnlockSuccess}
        projectTitle={document?.documentTitle || 'Academic Specification'}
      />

    </div>
  );
}
