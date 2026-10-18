import React, { useState } from 'react';
import { Lock, Check, X, CreditCard, RefreshCw, Sparkles, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockSuccess: () => void;
  projectTitle: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onUnlockSuccess,
  projectTitle,
}) => {
  const [activeTab, setActiveTab] = useState<'local' | 'card'>('local');
  const [verifying, setVerifying] = useState(false);
  const [refCode, setRefCode] = useState('TRX-89241-TC');

  if (!isOpen) return null;

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {}
      onUnlockSuccess();
    }, 750);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl rounded border border-[#3A3A3A] bg-[#141414] shadow-2xl p-6 sm:p-8 space-y-5 text-left text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#2D2D2D]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded border border-white bg-white text-black flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Academic Export Premium License Required
              </h3>
              <p className="text-[11px] text-[#707070] font-mono">
                Single Blueprint Generation: 1,500 PKR ($5.50 USD)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-[#707070] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Title Reference */}
        <div className="p-2.5 rounded bg-[#1A1A1A] border border-[#2D2D2D] font-mono text-[11px] text-[#8C8C8C] truncate">
          <span className="text-white font-semibold">TARGET:</span> {projectTitle}
        </div>

        {/* Benefits Checklist */}
        <div className="space-y-1.5 p-3 rounded border border-[#262626] bg-[#161616] text-[11px] text-[#CCCCCC]">
          <div className="flex items-center gap-2 text-white">
            <Check className="w-3.5 h-3.5 text-white shrink-0" />
            <span>Complete 2-Page IEEE Standard PDF with Page 2 Unlocked</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Check className="w-3.5 h-3.5 text-white shrink-0" />
            <span>PostgreSQL 16 Schema DDL & Risk Prioritization Matrix</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Check className="w-3.5 h-3.5 text-white shrink-0" />
            <span>Full Editable Academic Markdown & LaTeX Thesis Source</span>
          </div>
        </div>

        {/* Payment Methods Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('local')}
              className={`flex-1 py-2 px-3 rounded text-xs font-mono border transition-colors ${
                activeTab === 'local'
                  ? 'border-white bg-[#222222] text-white font-semibold'
                  : 'border-[#2D2D2D] bg-[#161616] text-[#707070] hover:text-white'
              }`}
            >
              Local Bank / Wallet (1,500 PKR)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('card')}
              className={`flex-1 py-2 px-3 rounded text-xs font-mono border transition-colors ${
                activeTab === 'card'
                  ? 'border-white bg-[#222222] text-white font-semibold'
                  : 'border-[#2D2D2D] bg-[#161616] text-[#707070] hover:text-white'
              }`}
            >
              Credit / Debit Card ($5.50)
            </button>
          </div>

          {/* Local Transfer Details */}
          {activeTab === 'local' ? (
            <div className="p-4 rounded border border-[#2D2D2D] bg-[#1A1A1A] space-y-2.5 font-mono text-[11px]">
              <div className="flex justify-between items-center pb-1.5 border-b border-[#242424]">
                <span className="text-[#8C8C8C]">Account Name:</span>
                <span className="text-white font-bold">ThesisCraft Academic Systems</span>
              </div>
              <div className="flex justify-between items-center pb-1.5 border-b border-[#242424]">
                <span className="text-[#8C8C8C]">SadaPay / NayaPay / EasyPaisa:</span>
                <span className="text-white font-bold">0304-9821455</span>
              </div>
              <div className="flex justify-between items-center pb-1.5 border-b border-[#242424]">
                <span className="text-[#8C8C8C]">IBAN (Raast Transfer):</span>
                <span className="text-[#B3B3B3]">PK74SADA000003049821</span>
              </div>
              <div className="pt-1">
                <label className="text-[10px] text-[#707070] block mb-1">
                  Transaction Reference / Receipt ID:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={refCode}
                    onChange={(e) => setRefCode(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 rounded bg-[#121212] border border-[#2D2D2D] text-white focus:outline-none focus:border-white text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setRefCode(`TRX-${Math.floor(100000 + Math.random() * 900000)}`)}
                    className="px-2.5 py-1.5 rounded bg-[#242424] hover:bg-[#303030] border border-[#333333] text-[#CCCCCC]"
                    title="Generate New Reference ID"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded border border-[#2D2D2D] bg-[#1A1A1A] space-y-3 font-mono text-xs">
              <div>
                <label className="text-[10px] text-[#8C8C8C] block mb-1">Card Number</label>
                <input
                  type="text"
                  defaultValue="4242 •••• •••• 4242"
                  className="w-full px-2.5 py-1.5 rounded bg-[#121212] border border-[#2D2D2D] text-white focus:outline-none focus:border-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-[#8C8C8C] block mb-1">Expires (MM/YY)</label>
                  <input
                    type="text"
                    defaultValue="10/28"
                    className="w-full px-2.5 py-1.5 rounded bg-[#121212] border border-[#2D2D2D] text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#8C8C8C] block mb-1">CVC</label>
                  <input
                    type="text"
                    defaultValue="729"
                    className="w-full px-2.5 py-1.5 rounded bg-[#121212] border border-[#2D2D2D] text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Verification Action */}
        <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#2D2D2D]">
          <span className="text-[10px] font-mono text-[#707070]">
            Instant Sandbox Verification Available
          </span>
          <button
            type="button"
            onClick={handleVerify}
            disabled={verifying}
            className="px-5 py-2.5 rounded bg-white text-black font-bold text-xs hover:bg-[#E5E5E5] transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg"
          >
            {verifying ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Verifying Transfer...</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Verify Transfer & Unlock Blueprint</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
