import React, { useState } from 'react';
import { 
  Lock, CheckCircle2, QrCode, CreditCard, ShieldCheck, 
  Sparkles, ArrowRight, Loader2, AlertCircle, RefreshCw 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockSuccess: () => void;
  projectTitle: string;
}

type PaymentGateway = 'easypaisa' | 'sadapay' | 'nayapay' | 'stripe_card';

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  onUnlockSuccess,
  projectTitle,
}) => {
  const [gateway, setGateway] = useState<PaymentGateway>('easypaisa');
  const [verifying, setVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState<string>('');
  const [txReference, setTxReference] = useState('TX-89241-TC');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('921');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06B6D4', '#8B5CF6', '#10B981', '#F59E0B'],
    });
  };

  const handleSimulatedVerify = () => {
    setVerifying(true);
    setErrorMsg('');
    setVerifyStep('Pinging banking gateway clearance...');

    setTimeout(() => {
      setVerifyStep('Validating transaction reference against clearinghouse...');
      setTimeout(() => {
        setVerifyStep('Digital cryptographic certificate issued! Unlocking...');
        setTimeout(() => {
          setVerifying(false);
          triggerCelebration();
          onUnlockSuccess();
        }, 800);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-2xl glass-panel border border-cyan-500/40 p-6 sm:p-8 shadow-2xl shadow-cyan-950/50 bg-[#0E1526]/95 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-tr from-violet-600/20 to-cyan-500/10 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-start justify-between pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-cyan-500/40 text-cyan-400">
              <Lock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">
                  Academic Gatekeeper
                </span>
                <span className="text-xs text-slate-400 font-mono">v2.4-VERIFIED</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                Unlock Production-Grade Academic Export
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
            title="Minimize"
          >
            ✕
          </button>
        </div>

        {/* Document Title Reference */}
        <div className="my-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
          <div className="truncate pr-4 text-slate-300 font-mono">
            <span className="text-slate-500">TARGET:</span> {projectTitle}
          </div>
          <span className="shrink-0 px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold">
            Locked Export
          </span>
        </div>

        {/* Tier Pricing Box */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 my-5 p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/30 border border-cyan-500/30">
          <div className="md:col-span-3 space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">1,500 PKR</span>
              <span className="text-sm font-medium text-slate-400">/ $5.50 USD</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Single Blueprint License
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provides lifetime unlimited edits, pristine LaTeX/Markdown exports, full PostgreSQL schemas, and evaluation defense certification for your Final Year Thesis committee.
            </p>
          </div>
          
          <div className="md:col-span-2 flex flex-col justify-center space-y-1.5 text-xs text-slate-300 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
            <div className="flex items-center gap-1.5 text-cyan-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Copy Complete Academic Markdown</span>
            </div>
            <div className="flex items-center gap-1.5 text-cyan-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Download PDF & LaTeX Template</span>
            </div>
            <div className="flex items-center gap-1.5 text-cyan-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Full Database Schema DDL & DFD</span>
            </div>
            <div className="flex items-center gap-1.5 text-cyan-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Signed HEC-OBE Rubric Audit</span>
            </div>
          </div>
        </div>

        {/* Dynamic Payment Gateways Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Select Payment Gateway
            </label>
            <span className="text-xs text-cyan-400 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
            </span>
          </div>

          {/* Gateway Tabs */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'easypaisa', label: 'EasyPaisa', badge: 'Instant QR' },
              { id: 'sadapay', label: 'SadaPay', badge: 'IBAN / App' },
              { id: 'nayapay', label: 'NayaPay', badge: 'Instant' },
              { id: 'stripe_card', label: 'Card / Visa', badge: 'Global USD' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setGateway(item.id as PaymentGateway)}
                className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-xs font-medium border transition-all ${
                  gateway === item.id
                    ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 shadow-sm shadow-cyan-500/20'
                    : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span className="font-semibold">{item.label}</span>
                <span className="text-[10px] text-slate-500 mt-0.5">{item.badge}</span>
              </button>
            ))}
          </div>

          {/* Payment Method Content */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            {gateway === 'stripe_card' ? (
              /* Credit Card UI */
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800/80">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-cyan-400" />
                    International Debit or Credit Card
                  </span>
                  <span className="font-mono">$5.50 USD</span>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
                    placeholder="4242 4242 4242 4242"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Expiration (MM/YY)</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">CVC / CVV</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Localized Mobile Wallet / QR UI (EasyPaisa / SadaPay / NayaPay) */
              <div className="flex flex-col sm:flex-row items-center gap-5">
                {/* Simulated QR Code Box */}
                <div className="shrink-0 p-3 rounded-xl bg-white border border-slate-300 shadow-md flex flex-col items-center">
                  <div className="w-28 h-28 bg-slate-900 rounded-lg p-2 flex flex-col items-center justify-between text-cyan-400">
                    <QrCode className="w-20 h-20 text-white" />
                    <span className="text-[9px] font-mono tracking-tighter text-slate-300 uppercase">
                      Scan via {gateway}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-600 font-semibold mt-1.5 font-mono">
                    1,500.00 PKR
                  </span>
                </div>

                {/* Transfer Details */}
                <div className="space-y-2 text-xs flex-1 w-full">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Account Title:</span>
                    <span className="text-white font-semibold font-mono">ThesisCraft Systems Ltd</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                    <span className="text-slate-400">{gateway.toUpperCase()} Number:</span>
                    <span className="text-cyan-400 font-bold font-mono">0304-9821455</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                    <span className="text-slate-400">IBAN / Clearing Code:</span>
                    <span className="text-slate-300 font-mono text-[11px]">PK74SADA000003049821</span>
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">
                      Transaction Reference ID (from receipt):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={txReference}
                        onChange={(e) => setTxReference(e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. TX-9841284"
                      />
                      <button
                        type="button"
                        onClick={() => setTxReference(`TX-${Math.floor(10000 + Math.random() * 90000)}-TC`)}
                        className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono flex items-center gap-1"
                        title="Generate fresh test reference"
                      >
                        <RefreshCw className="w-3 h-3" />
                        New ID
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Verification Status Telemetry */}
        {verifying && (
          <div className="mt-4 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 flex items-center gap-3 text-xs text-cyan-200 animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400 shrink-0" />
            <span>{verifyStep}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-center gap-2 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Instant Sandbox Clearance enabled for academic demo testing</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              disabled={verifying}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-medium hover:bg-slate-800 transition-colors"
            >
              Close Preview
            </button>
            <button
              type="button"
              onClick={handleSimulatedVerify}
              disabled={verifying}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              {verifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Transfer & Unlock Blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
